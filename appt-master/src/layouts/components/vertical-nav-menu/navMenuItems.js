/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
  {
    url: '/',
    name: 'GLOBALS.HOME',
    slug: 'home',
    icon: 'home',
    roles: ['loggedIn']
  },
  {
    url: '/users',
    name: 'USERS.TITLE',
    slug: 'users',
    roles: ['admin', 'schoolAdmin', 'schoolOrganizer', 'student'],
    icon: 'people',
    submenu: [
      {
        url: '/users',
        name: 'GLOBALS.LIST',
        slug: 'users',
        roles: ['admin']
      },
      {
        url: '/users-in-organization',
        name: 'GLOBALS.LIST',
        slug: 'users',
        roles: ['loggedIn']
      },
      {
        url: '/users/create',
        name: 'USERS.ADD',
        slug: 'users-create',
        roles: ['admin']
      },
      {
        url: '/users/create-school-admin',
        name: 'USERS.ADD_SCHOOL_ADMIN',
        slug: 'users-create-school-admin',
        roles: ['admin', 'schoolAdmin']
      },
      {
        url: '/users/create-school-organizer',
        name: 'USERS.ADD_SCHOOL_ORGANIZER',
        slug: 'users-create-school-organizer',
        roles: ['admin', 'schoolAdmin']
      },
      {
        url: '/users/create-organization-admin',
        name: 'USERS.ADD_ORGANIZATION_ADMIN',
        slug: 'users-create-organization-admin',
        roles: ['admin', 'organizationAdminOrSchoolAdminOrSchoolOrganizer']
      },
      {
        url: '/users/create-mentor',
        name: 'USERS.ADD_MENTOR',
        slug: 'users-create-mentor',
        roles: ['admin', 'organizationAdminOrSchoolAdminOrSchoolOrganizer']
      },
      {
        url: '/users/create-student',
        name: 'USERS.ADD_STUDENT',
        slug: 'users-create-student',
        roles: ['admin', 'schoolAdminOrSchoolOrganizer']
      }
    ]
  },
  {
    url: '/school-keys',
    name: 'SCHOOL_KEYS.TITLE',
    slug: 'school-keys',
    roles: ['admin'],
    icon: 'vpn_key',
    submenu: [
      {
        url: '/school-keys',
        name: 'GLOBALS.LIST',
        slug: 'school-keys',
        roles: ['admin']
      },
      {
        url: '/school-keys/create',
        name: 'GLOBALS.ADD',
        slug: 'school-keys-create',
        roles: ['admin']
      }
    ]
  },
  {
    url: '/enterprises',
    name: 'ENTERPRISES.TITLE',
    slug: 'enterprises',
    icon: 'business',
    roles: ['admin', 'schoolAdmin', 'schoolOrganizer', 'student'],
    submenu: [
      {
        url: '/enterprises',
        name: 'GLOBALS.LIST',
        slug: 'enterprises',
        roles: ['admin', 'schoolAdmin', 'schoolOrganizer', 'student']
      },
      {
        url: '/enterprises/create',
        name: 'ENTERPRISES.ADD',
        slug: 'enterprises-create',
        roles: ['admin', 'schoolAdmin', 'schoolOrganizer']
      },
      {
        url: '/enterprises/propose',
        name: 'ENTERPRISES.PROPOSE',
        slug: 'enterprises-propose',
        roles: ['student']
      }
    ]
  },
  {
    url: '/schools',
    name: 'SCHOOLS.TITLE',
    slug: 'schools',
    icon: 'school',
    roles: ['admin'],
    submenu: [
      {
        url: '/schools',
        name: 'GLOBALS.LIST',
        slug: 'schools',
        roles: ['admin']
      },
      {
        url: '/schools/create',
        name: 'GLOBALS.ADD',
        slug: 'schools-create',
        roles: ['admin']
      }
    ]
  },
  {
    url: '/study-programs',
    name: 'STUDY_PROGRAMS.TITLE',
    slug: 'study-programs',
    icon: 'menu_book',
    roles: ['admin', 'schoolAdmin', 'schoolOrganizer'],
    submenu: [
      {
        url: '/study-programs',
        name: 'GLOBALS.LIST',
        slug: 'study-programs',
        roles: ['admin', 'schoolAdmin', 'schoolOrganizer']
      },
      {
        url: '/study-programs/create',
        name: 'GLOBALS.ADD',
        slug: 'study-programs-create',
        roles: ['admin', 'schoolAdmin']
      }
    ]
  },
  {
    url: '/template-articles',
    name: 'TEMPLATE_ARTICLES.TITLE',
    slug: 'template-articles',
    icon: 'insert_drive_file',
    roles: ['admin', 'schoolAdmin', 'schoolOrganizer'],
    submenu: [
      {
        url: '/template-articles',
        name: 'GLOBALS.LIST',
        slug: 'template-articles',
        roles: ['admin', 'schoolAdmin', 'schoolOrganizer']
      },
      {
        url: '/template-articles/create',
        name: 'GLOBALS.ADD',
        slug: 'template-articles-create',
        roles: ['admin', 'schoolAdmin', 'schoolOrganizer']
      }
    ]
  },

  {
    url: '/evaluation-templates',
    name: 'EVALUATION_TEMPLATES.TITLE',
    slug: 'evaluation-templates',
    icon: 'grade',
    roles: ['admin', 'schoolAdmin', 'schoolOrganizer'],
    submenu: [
      {
        url: '/evaluation-templates/update-student-questions',
        name: 'EVALUATION_TEMPLATES.ADD_FOR_STUDENT',
        slug: 'update-student-questions',
        roles: ['admin', 'schoolAdmin', 'schoolOrganizer']
      },
      {
        url: '/evaluation-templates/update-mentor-questions',
        name: 'EVALUATION_TEMPLATES.ADD_FOR_MENTOR',
        slug: 'update-mentor-questions',
        roles: ['admin', 'schoolAdmin', 'schoolOrganizer']
      },
      {
        url: '/evaluation-templates/update-school-organizer-questions',
        name: 'EVALUATION_TEMPLATES.ADD_FOR_SCHOOL_ORGANIZER',
        slug: 'update-school-organizer-questions',
        roles: ['admin', 'schoolAdmin', 'schoolOrganizer']
      }
    ]
  },
  {
    url: '/internships',
    name: 'INTERNSHIPS.TITLE',
    slug: 'internships',
    icon: 'work',
    roles: [
      'admin',
      'organizationAdmin',
      'schoolAdmin',
      'student',
      'schoolOrganizer'
    ],
    submenu: [
      {
        url: '/internships',
        name: 'GLOBALS.LIST',
        slug: 'internships',
        roles: [
          'student',
          'organizationAdmin',
          'admin',
          'schoolAdmin',
          'schoolOrganizer'
        ]
      },
      {
        url: '/internships/create',
        name: 'GLOBALS.ADD',
        slug: 'internships-create',
        roles: ['admin', 'organizationAdmin', 'schoolOrganizer']
      }
    ]
  },
  {
    url: '/internship-agreements',
    name: 'INTERNSHIP_AGREEMENTS.TITLE',
    slug: 'internship-agreements',
    icon: 'question_answer',
    roles: [
      'admin',
      'mentor',
      'schoolAdmin',
      'student',
      'schoolOrganizer',
      'organizationAdmin'
    ],
    submenu: [
      {
        url: '/internship-agreements',
        name: 'GLOBALS.LIST',
        slug: 'internship-agreements',
        roles: [
          'admin',
          'mentor',
          'schoolAdmin',
          'schoolOrganizer',
          'organizationAdmin'
        ]
      },
      {
        url: '/internship-agreements-student',
        name: 'GLOBALS.LIST',
        slug: 'internship-agreements-student',
        roles: ['student']
      },
      {
        url: '/internship-agreements/create',
        name: 'GLOBALS.ADD',
        slug: 'internship-agreements-create',
        roles: ['admin', 'schoolOrganizer']
      }
    ]
  }
]
