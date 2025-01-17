import requests
from bs4 import BeautifulSoup
import json

# needs fixing:
#   public health and psychology bs are in one tag
#   currently only takes the first

# to do:
#   add list of courses for optional


# bachelor degree 1
# concentrations 2
# minors 3

def handle_crosslisted(courseId, content):
      # handle crosslisted courses
        if '/' in courseId:
            link = 'https://catalog.calpoly.edu' + content['href']
            res = requests.get(link)
            s = BeautifulSoup(res.content, "html.parser")
            courseId = s.find('div', {'class': 'searchresult search-courseresult'}).find(
                'h2').text.split('.')[0].replace(u'\u00a0', ' ')
        return courseId

def handle_optional():
    print("optional")

def get_links(soup, url):

    info = soup.find('div', {'class': 'page_content tab_content'}).find_all(
        'p', {'class': 'plist'})

    bachelor = []
    concentration = []
    minor = []

    count = 0
    for i in info:
        check_tag = i.find('strong')

        if check_tag is None:
            content = i.find('a')

            if content is not None:
                name = content.text

                # case Japanese minor
                if name == '':
                    content = i.find_all('a')[1]

                link = 'https://catalog.calpoly.edu/' + content['href']

                if count == 1:
                    bachelor.append({'name': name[:-4], 'link': link})
                if count == 2:
                    concentration.append({'name': name, 'link': link})
                if count == 3:
                    minor.append({'name': name, 'link': link})
        else:
            if check_tag.text == 'A':
                count += 1

    programs = {'bachelor': bachelor,
                'concentration': concentration,
                'minor': minor}

    file = open('../../src/degrees.json', 'w')
    file.write(json.dumps(programs, indent=4, sort_keys=True))

    return programs


def process_bachelor(program, major):
    response = requests.get(program['link'])
    soup = BeautifulSoup(response.content, "html.parser")

    main_table = soup.find('table', {'class': 'sc_courselist'}).find('tbody')
    rows = main_table.find_all('tr')

    requirements = []
    header = ''

    isOr = False

    for r in rows:
        check_header = r.find(
            'span', {'class': 'courselistcomment areaheader'})

        if check_header is not None:  # header
            header = check_header.text

            # ignore
            if header in ['GENERAL EDUCATION (GE)', 'FREE ELECTIVES']:
                continue

        else:
            check_column = r.find('td')

            data = check_column.find_all('a')

            # handle unneccessary rows
            if data == [] and check_column.text != 'or':
                continue

            # print(data)

            if check_column.text != 'or':
                data_string = ""
                # & scenerio
                if len(data) > 1:

                    for d in data:
                        #handle crosslisted
                        courseId = handle_crosslisted(d.text, d) 
                        data_string += courseId.replace(u'\xa0', u' ') + ' & '
                    data_string = '(' + data_string.rstrip('& ') + ')'

                else:
                    courseId = handle_crosslisted(data[0].text, data[0]) 
                    data_string = courseId.replace(u'\xa0', u' ')

                # print(requirements)

                # or scenerio
                if 'or' == check_column.text[:2] or isOr > 0:
                    last = requirements.pop()
                    requirements.append(
                        {'major': major, 'requirement_group': header, 'course': last["course"] + ' or ' + data_string, 'type': 'optional'})

                    if isOr > 0:
                        isOr -= 1

                else:
                    # & in the same row
                    if '&' in data_string:
                        requirements.append(
                            {'major': major, 'requirement_group': header, 'course': data_string, 'type': 'optional'})
                    else:
                        requirements.append(
                            {'major': major, 'requirement_group': header, 'course': data_string, 'type': 'required'})

                if 'or' == check_column.text[-2:]:
                    isOr = 1
            else:
                # 'or' is a separate row
                isOr = 1

    return requirements


def programs(url):
    response = requests.get(url)

    soup = BeautifulSoup(response.content, "html.parser")

    programs = get_links(soup, url)

    bachelor = []

    for p in programs['bachelor']:

        test = ['Aerospace Engineering', 'Business Administration',
                'Computer Science', 'English']
        # test = ["Computer Science"]

        # test
        if p["name"] not in test:
            continue

        print('------- Processing requirements for', p['name'], '---------')
        requirements = process_bachelor(p, p['name'])

        # requirements = {k: v for k, v in requirements.items() if v}
        bachelor.extend(requirements)

        # bachelor[p["name"]] = requirements

    optional = []
    for b in bachelor:
        if b["type"] == "optional":
            if '&' in b['course'] and 'or' not in b['course']:
                course = b['course'].replace('(', '').replace(')', '')
                b['course'] = course
            else:
                course = b['course']

            data_string = course.replace('(', '').replace(')', '').replace(' & ', '#').replace(' or ', '#')
            course_list = data_string.split('#')
            for c in course_list:
                modified = {"course": course,
                        "option": c}
                optional.append(modified)

    file = open('./data/bachelor.json', 'w')
    file.write(json.dumps(bachelor, indent=4, sort_keys=True))
        
    file = open('./data/optional.json', 'w')
    file.write(json.dumps(optional, indent=4, sort_keys=True))

    '''
    required = []
    optional = []
    for b in bachelor:
        if b["type"] == "required":
            modified = {"course": b["course"],
                        "major": b["major"],
                        "requirement_group": b["requirement_group"]}
            required.append(modified)

        if b["type"] == "optional":
            if '&' in b['course'] and 'or' not in b['course']:
                course = b['course'].replace('(', '').replace(')', '')
            else:
                course = b['course']

            data_string = course.replace('(', '').replace(')', '').replace(' & ', '#').replace(' or ', '#')

            course_list = data_string.split('#')
            modified = {"course": course,
                        "major": b["major"],
                        "requirement_group": b["requirement_group"],
                        "course_list": course_list
                        }
            optional.append(modified)
        
    file = open('./data/bachelor-required.json', 'w')
    file.write(json.dumps(required, indent=4, sort_keys=True))

    file2 = open('./data/bachelor-optional.json', 'w')
    file2.write(json.dumps(optional, indent=4, sort_keys=True))

    '''