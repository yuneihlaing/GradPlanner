import requests
from bs4 import BeautifulSoup
import json


def get_links(soup):
    depart = []
    majors = soup.find('div', {'id': 'tbl-coursesaz'}
                       ).find_all('a', {'class': 'sitemaplink'})

    # test = ['Aerospace Engineering (AERO)', 'Biology (BIO)', 'Chemistry (CHEM)']

    for m in majors:
        # if m.text in test:
        depart.append(
            {'name': m.text,
             'link': 'https://catalog.calpoly.edu/' + m['href']})
    return depart


def get_courses(url):
    title = []

    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    title = get_links(soup)
    courses = []
    prereq_courses = []
    for t in title:
        print('------- Processing courses for', t['name'], '---------')

        response = requests.get(t['link'])
        soup2 = BeautifulSoup(response.content, "html.parser")

        info = soup2.find('div', {'class', 'sc_sccoursedescs'}).find_all(
            'div', {'class': 'courseblock'})
        for i in info:
            content = i.find('p', {'class': 'courseblocktitle'}
                             ).getText().replace('\n', '').split('.')

            courseID = content[0].replace(
                '\xa0;', ' ').replace('\u00a0', ' ').strip()
            name = content[1].strip()
            units = content[2].replace(' units', '').strip()

            content = i.find(
                'div', {'class': 'noindent courseextendedwrap'}).find_all('p')

            prereq = []
            if len(content) == 2:
                list = content[1].find_all('a')
                for l in list:
                    prereq.append(l.text.replace('\u00a0', ' '))

            description = i.find(
                'div', {'class': 'courseblockdesc'}).find('p').text

            courses.append({'courseId': courseID,
                            'name': name,
                            'units': units,
                            'department': t['name'],
                            'description': description.replace('"', '\\"')})

            for p in prereq:
                prereq_courses.append({'courseId': courseID, 'prereqId': p})

        print('------- Writing to file ---------\n')

        file = open('./data/courses.json', 'w')
        file.write(json.dumps(courses, indent=4, sort_keys=True))

        file2 = open('./data/prereq.json', 'w')
        file2.write(json.dumps(prereq_courses, indent=4, sort_keys=True))

    print('------- Finished collecting all data ---------\n')
