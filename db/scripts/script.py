from courses import get_courses
from degree import programs
from other import get_ge, get_gwr, get_uscp


general_url = 'https://catalog.calpoly.edu/coursesaz'
# get_courses(general_url)

# programs_url = 'https://catalog.calpoly.edu/programsaz/'
# programs(programs_url)

# get_ge(general_url)
get_gwr(general_url)
get_uscp(general_url)
