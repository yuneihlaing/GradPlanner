import requests
from bs4 import BeautifulSoup
import json


def get_courses(container):
    data = []
    info = container.find('table', {'class': 'sc_courselist'}).find(
        'tbody').find_all('tr')

    for i in info:
        content = i.find('a', {'class': 'bubblelink code'})
        courseId = content.text.replace('\u00a0', ' ')

        # handle crosslisted courses
        if '/' in courseId:
            link = 'https://catalog.calpoly.edu' + content['href']
            res = requests.get(link)
            s = BeautifulSoup(res.content, "html.parser")
            courseId = s.find('div', {'class': 'searchresult search-courseresult'}).find(
                'h2').text.split('.')[0].replace(u'\u00a0', ' ')

        data.append(courseId)
    return data


def get_gwr(url):
    gwr = []
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    container = soup.find('div', {'id': 'gwrcoursestextcontainer'})

    gwr = get_courses(container)

    file = open('./data/other/gwr.json', 'w')
    file.write(json.dumps(gwr, indent=4, sort_keys=True))

    file = open('../../src/gwr.json', 'w')
    file.write(json.dumps(gwr, indent=4, sort_keys=True))


def get_uscp(url):
    gwr = []
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    container = soup.find('div', {'id': 'uscpcoursestextcontainer'})

    gwr = get_courses(container)

    file = open('./data/other/uscp.json', 'w')
    file.write(json.dumps(gwr, indent=4, sort_keys=True))

    file = open('../../src/uscp.json', 'w')
    file.write(json.dumps(gwr, indent=4, sort_keys=True))


def get_ge(url):
    ge_areas = {
        'A': 'English Language Communication and Critical Thinking',
        'B': 'Scientific Inquiry and Quantitative Reasoning',
        'C': 'Arts and Humantities',
        'D': 'Social Sciences',
        'E': 'Lifelong Learning and Self-development',
        'F': 'Ethnic Studies'
    }

    menu = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'B4', 'Upper-Division B', 'C1', 'C2',
            'Lower-Division C Elective', 'Upper-Division C', 'D1', 'D2', 'Upper-Division D', 'Lower-Division E', 'F']

    ge_subareas = {'A1': {
        'name': 'Oral Communication',
        'area': 'A',
    }, 'A2': {
        'name': 'Written Communication',
        'area': 'A'
    }, 'A3': {
        'name': 'Critical Thinking',
        'area': 'A'
    }, 'B1': {
        'name': 'Physical Science',
        'area': 'B'
    }, 'B2': {
        'name': 'Life Sciene',
        'area': 'B'
    }, 'B3': {
        'name': 'Laboratory Activity',
        'area': 'B',
        'note': 'To be taken with a course in B1 or B2'
    }, 'B4': {
        'name': 'Mathematics/Quantitative Reasoning',
        'area': 'B'
    }, 'Upper-Division B': {
        'name': 'Upper-Division B',
        'area': 'B'
    }, 'C1': {
        'name': 'Arts',
        'area': 'C'
    }, 'C2': {
        'name': 'Humanities',
        'area': 'C'
    }, 'Lower-Division C Elective': {
        'name': 'Lower-Division C Elective',
        'area': 'C',
        'note': 'Select a course from either C1 or C2'
    }, 'Upper-Division C': {
        'name': 'Upper-Division C',
        'area': 'C'
    }, 'D1': {
        'name': 'American Institutions',
        'area': 'D'
    }, 'D2': {
        'name': 'Lower-Division',
        'area': 'D'
    }, 'Upper-Division D': {
        'name': 'Upper-Division D',
        'area': 'D'
    }, 'Lower-Division E': {
        'name': 'Lower-Division E',
        'area': 'E'
    }, 'F': {
        'name': 'Ethnic Studies',
        'area': 'F'
    }}

    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    info = soup.find('div', {'id': 'generaleducationcoursestextcontainer'}).find_all(
        'table', {'class': 'sc_courselist'})

    length = len(menu)

    j = 0
    for i in range(0, length):
        if menu[i] == 'B3' or menu[i] == 'Lower-Division C Elective':
            continue
        courses = []
        data = info[j].find_all('a')

        # ignore study abroad C2 courses
        if data[0].text.replace(u'\u00a0', ' ') == 'CHIN 141':
            j += 1
            data = info[j].find_all('a')

        for d in data:
            courseId = d.text.replace(u'\u00a0', ' ')

            # handle crosslisted courses
            if '/' in courseId:
                link = 'https://catalog.calpoly.edu' + d['href']
                res = requests.get(link)
                s = BeautifulSoup(res.content, "html.parser")
                courseId = s.find('div', {'class': 'searchresult search-courseresult'}).find(
                    'h2').text.split('.')[0].replace(u'\u00a0', ' ')

            courses.append(courseId)

        ge_subareas[menu[i]]['courses'] = courses
        j += 1

    file = open('./data/other/ge_areas.json', 'w')
    file.write(json.dumps(ge_areas, indent=4, sort_keys=True))

    file2 = open('./data/other/ge_subareas.json', 'w')
    file2.write(json.dumps(ge_subareas, indent=4, sort_keys=True))
