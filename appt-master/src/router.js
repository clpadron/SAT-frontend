/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  Object Strucutre:
                    path => router path
                    name => router name
                    component(lazy loading) => component to load
                    meta : {
                      rule => which user can have access (ACL)
                      breadcrumb => Add breadcrumb to specific page
                      pageTitle => Display title besides breadcrumb
                    }
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/',
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            rule: 'public'
          }
        },

        // =============================================================================
        // PROFILE
        // =============================================================================
        {
          path: '/profile',
          name: 'profile',
          component: () => import('./views/users/Profile.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'USERS.PROFILE',
                url: '/profile',
                active: true
              }
            ],
            pageTitle: 'USERS.PROFILE',
            rule: 'loggedIn'
          }
        },
        {
          path: '/users-edit-profile',
          name: 'users-edit-profile',
          component: () => import('./views/users/ProfileForm.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'USERS.EDIT_PROFILE',
                url: '/users-edit-profile',
                active: true
              }
            ],
            pageTitle: 'USERS.EDIT_PROFILE',
            rule: 'loggedIn'
          }
        },

        // =============================================================================
        // USERS
        // =============================================================================
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/users/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'USERS.TITLE',
                url: '/users',
                active: true
              }
            ],
            pageTitle: 'USERS.TITLE',
            rule: 'schoolAdmin'
          }
        },
        {
          path: '/users-in-organization',
          name: 'users-in-organization',
          component: () => import('./views/users/Index.vue'),
          props: {
            inOrganization: true
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'USERS.TITLE',
                url: '/users',
                active: true
              }
            ],
            pageTitle: 'USERS.TITLE',
            rule: 'loggedIn'
          }
        },
        {
          path: 'users/create',
          name: 'users-create',
          component: () => import('./views/users/Form.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'USERS.TITLE', url: '/users' },
              { title: 'USERS.ADD', url: '/users/create', active: true }
            ],
            pageTitle: 'USERS.ADD',
            rule: 'admin'
          }
        },
        {
          path: 'users/create-school-admin',
          name: 'users-create-school-admin',
          component: () => import('./views/users/Form.vue'),
          props: {
            saveMethod: 'saveSchoolAdmin',
            role: 'ROLE_SCHOOLADMIN'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'USERS.TITLE', url: '/users' },
              {
                title: 'USERS.ADD_SCHOOL_ADMIN',
                url: '/users/create-school-admin',
                active: true
              }
            ],
            pageTitle: 'USERS.ADD_SCHOOL_ADMIN',
            rule: 'schoolAdmin'
          }
        },
        {
          path: 'users/create-school-organizer',
          name: 'users-create-school-organizer',
          component: () => import('./views/users/Form.vue'),
          props: {
            saveMethod: 'saveSchoolOrganizer',
            role: 'ROLE_SCHOOLORG'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'USERS.TITLE', url: '/users' },
              {
                title: 'USERS.ADD_SCHOOL_ORGANIZER',
                url: '/users/create-school-organizer',
                active: true
              }
            ],
            pageTitle: 'USERS.ADD_SCHOOL_ORGANIZER',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },

        {
          path: 'users/create-organization-admin',
          name: 'users-create-organization-admin',
          component: () => import('./views/users/Form.vue'),
          props: {
            saveMethod: 'saveOrganizationAdmin',
            role: 'ROLE_ORGADMIN'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'USERS.TITLE', url: '/users' },
              {
                title: 'USERS.ADD_ORGANIZATION_ADMIN',
                url: '/users/create-organization-admin',
                active: true
              }
            ],
            pageTitle: 'USERS.ADD_ORGANIZATION_ADMIN',
            rule: 'organizationAdminOrSchoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'users/create-mentor',
          name: 'users-create-mentor',
          component: () => import('./views/users/Form.vue'),
          props: {
            saveMethod: 'saveMentor',
            role: 'ROLE_MENTOR'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'USERS.TITLE', url: '/users' },
              {
                title: 'USERS.ADD_MENTOR',
                url: '/users/create-mentor',
                active: true
              }
            ],
            pageTitle: 'USERS.ADD_MENTOR',
            rule: 'organizationAdminOrSchoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'users/create-student',
          name: 'users-create-student',
          component: () => import('./views/users/Form.vue'),
          props: {
            saveMethod: 'saveStudent',
            role: 'ROLE_STUDENT'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'USERS.TITLE', url: '/users' },
              {
                title: 'USERS.ADD_STUDENT',
                url: '/users/create-student',
                active: true
              }
            ],
            pageTitle: 'USERS.ADD_STUDENT',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },

        {
          path: 'users/:id',
          name: 'users-view',
          component: () => import('./views/users/View.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'USERS.TITLE',
                url: '/users'
              },
              { title: 'USERS.VIEW', url: '/users/:id', active: true }
            ],
            pageTitle: 'USERS.VIEW',
            rule: 'loggedIn'
          }
        },
        {
          path: 'users/:id/edit',
          name: 'users-edit',
          component: () => import('./views/users/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'USERS.TITLE', url: '/users' },
              { title: 'USERS.EDIT', url: '/users/:id/edit', active: true }
            ],
            pageTitle: 'USERS.EDIT',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },

        {
          path: 'users/change-password',
          name: 'users-change-password',
          component: () => import('./views/users/PasswordForm.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'USERS.TITLE',
                url: '/users'
              },
              {
                title: 'USERS.CHANGE_PASSWORD',
                url: '/users/change-password',
                active: true
              }
            ],
            pageTitle: 'USERS.CHANGE_PASSWORD',
            rule: 'loggedIn'
          }
        },

        // =============================================================================
        // SCHOOL KEYS
        // =============================================================================
        {
          path: '/school-keys',
          name: 'school-keys',
          component: () => import('./views/school-keys/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'SCHOOL_KEYS.TITLE', url: '/school-keys', active: true }
            ],
            pageTitle: 'SCHOOL_KEYS.TITLE',
            rule: 'admin'
          }
        },
        {
          path: 'school-keys/create',
          name: 'school-keys-create',
          component: () => import('./views/school-keys/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'SCHOOL_KEYS.TITLE', url: '/school-keys' },
              {
                title: 'SCHOOL_KEYS.ADD',
                url: '/school-keys/create',
                active: true
              }
            ],
            pageTitle: 'SCHOOL_KEYS.ADD',
            rule: 'admin'
          }
        },
        {
          path: 'school-keys/:id/edit',
          name: 'school-keys-edit',
          component: () => import('./views/school-keys/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'SCHOOL_KEYS.TITLE',
                url: '/school-keys'
              },
              {
                title: 'SCHOOL_KEYS.EDIT',
                url: '/school-keys/:id/edit',
                active: true
              }
            ],
            pageTitle: 'SCHOOL_KEYS.EDIT',
            rule: 'admin'
          }
        },

        // =============================================================================
        // ENTERPRISE
        // =============================================================================
        {
          path: '/enterprises',
          name: 'enterprises',
          component: () => import('./views/enterprises/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'ENTERPRISES.TITLE', url: '/enterprises', active: true }
            ],
            pageTitle: 'ENTERPRISES.TITLE',
            rule: 'studentOrSchoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'enterprises/create',
          name: 'enterprises-create',
          component: () => import('./views/enterprises/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'ENTERPRISES.TITLE', url: '/enterprises' },
              {
                title: 'ENTERPRISES.ADD',
                url: '/enterprises/create',
                active: true
              }
            ],
            pageTitle: 'ENTERPRISES.ADD',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'enterprises/propose',
          name: 'enterprises-propose',
          component: () => import('./views/enterprises/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'ENTERPRISES.TITLE', url: '/enterprises' },
              {
                title: 'ENTERPRISES.PROPOSE',
                url: '/enterprises/propose',
                active: true
              }
            ],
            pageTitle: 'ENTERPRISES.PROPOSE',
            rule: 'student'
          }
        },
        {
          path: 'enterprises/:id',
          name: 'enterprises-view',
          component: () => import('./views/enterprises/View.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'ENTERPRISES.TITLE',
                url: '/enterprises'
              },
              {
                title: 'ENTERPRISES.VIEW',
                url: '/enterprises/:id',
                active: true
              }
            ],
            pageTitle: 'ENTERPRISES.VIEW',
            rule: 'studentOrSchoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'enterprises/:id/edit',
          name: 'enterprises-edit',
          component: () => import('./views/enterprises/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'ENTERPRISES.TITLE',
                url: '/enterprises'
              },
              {
                title: 'ENTERPRISES.EDIT',
                url: '/enterprises/:id/edit',
                active: true
              }
            ],
            pageTitle: 'ENTERPRISES.EDIT',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },

        // =============================================================================
        // EVALUATION TEMPLATES
        // =============================================================================
        {
          path: 'evaluation-templates/update-student-questions',
          name: 'evaluation-templates-update-student-questions',
          component: () => import('./views/evaluation-templates/Form.vue'),
          props: {
            saveMethod: 'storeQuestionsForStudent',
            listMethod: 'listQuestionsForStudent'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'EVALUATION_TEMPLATES.TITLE',
                url: '/evaluation-templates'
              },
              {
                title: 'EVALUATION_TEMPLATES.UPDATE_STUDENT_QUESTIONS',
                url: '/evaluation-templates/update-student-questions',
                active: true
              }
            ],
            pageTitle: 'EVALUATION_TEMPLATES.UPDATE_STUDENT_QUESTIONS',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'evaluation-templates/update-mentor-questions',
          name: 'evaluation-templates-update-mentor-questions',
          component: () => import('./views/evaluation-templates/Form.vue'),
          props: {
            saveMethod: 'storeQuestionsForMentor',
            listMethod: 'listQuestionsForMentor'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'EVALUATION_TEMPLATES.TITLE',
                url: '/evaluation-templates'
              },
              {
                title: 'EVALUATION_TEMPLATES.UPDATE_MENTOR_QUESTIONS',
                url: '/evaluation-templates/update-mentor-questions',
                active: true
              }
            ],
            pageTitle: 'EVALUATION_TEMPLATES.UPDATE_MENTOR_QUESTIONS',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'evaluation-templates/update-school-organizer-questions',
          name: 'evaluation-templates-update-school-organizer-questions',
          component: () => import('./views/evaluation-templates/Form.vue'),
          props: {
            saveMethod: 'storeQuestionsForSchool',
            listMethod: 'listQuestionsForSchool'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'EVALUATION_TEMPLATES.TITLE',
                url: '/evaluation-templates'
              },
              {
                title: 'EVALUATION_TEMPLATES.UPDATE_SCHOOL_ORGANIZER_QUESTIONS',
                url: '/evaluation-templates/update-school-organizer-questions',
                active: true
              }
            ],
            pageTitle: 'EVALUATION_TEMPLATES.UPDATE_SCHOOL_ORGANIZER_QUESTIONS',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },

        // =============================================================================
        // SCHOOLS
        // =============================================================================
        {
          path: '/schools',
          name: 'schools',
          component: () => import('./views/schools/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'SCHOOLS.TITLE', url: '/schools', active: true }
            ],
            pageTitle: 'SCHOOLS.TITLE',
            rule: 'admin'
          }
        },
        {
          path: 'schools/create',
          name: 'schools-create',
          component: () => import('./views/schools/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'SCHOOLS.TITLE', url: '/schools' },
              { title: 'SCHOOLS.ADD', url: '/schools/create', active: true }
            ],
            pageTitle: 'SCHOOLS.ADD',
            rule: 'admin'
          }
        },
        {
          path: 'schools/:id/edit',
          name: 'schools-edit',
          component: () => import('./views/schools/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'SCHOOLS.TITLE',
                url: '/schools'
              },
              { title: 'SCHOOLS.EDIT', url: '/schools/:id/edit', active: true }
            ],
            pageTitle: 'SCHOOLS.EDIT',
            rule: 'admin'
          }
        },

        // =============================================================================
        // STUDY PROGRAMS
        // =============================================================================
        {
          path: '/study-programs',
          name: 'study-programs',
          component: () => import('./views/study-programs/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'STUDY_PROGRAMS.TITLE',
                url: '/study-programs',
                active: true
              }
            ],
            pageTitle: 'STUDY_PROGRAMS.TITLE',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'study-programs/create',
          name: 'study-programs-create',
          component: () => import('./views/study-programs/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'STUDY_PROGRAMS.TITLE', url: '/study-programs' },
              {
                title: 'STUDY_PROGRAMS.ADD',
                url: '/study-programs/create',
                active: true
              }
            ],
            pageTitle: 'STUDY_PROGRAMS.ADD',
            rule: 'schoolAdmin'
          }
        },

        {
          path: 'study-programs/:id',
          name: 'study-programs-view',
          component: () => import('./views/study-programs/View.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'STUDY_PROGRAMS.TITLE',
                url: '/study-programs'
              },
              {
                title: 'STUDY_PROGRAMS.VIEW',
                url: '/study-programs/:id',
                active: true
              }
            ],
            pageTitle: 'STUDY_PROGRAMS.VIEW',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'study-programs/:id/edit',
          name: 'study-programs-edit',
          component: () => import('./views/study-programs/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'STUDY_PROGRAMS.TITLE',
                url: '/study-programs'
              },
              {
                title: 'STUDY_PROGRAMS.EDIT',
                url: '/study-programs/:id/edit',
                active: true
              }
            ],
            pageTitle: 'STUDY_PROGRAMS.EDIT',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        // =============================================================================
        // TEMPLATE ARTICLE
        // =============================================================================
        {
          path: '/template-articles',
          name: 'template-articles',
          component: () => import('./views/template-articles/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'TEMPLATE_ARTICLES.TITLE',
                url: '/template-articles',
                active: true
              }
            ],
            pageTitle: 'TEMPLATE_ARTICLES.TITLE',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'template-articles/create',
          name: 'template-articles-create',
          component: () => import('./views/template-articles/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'TEMPLATE_ARTICLES.TITLE', url: '/template-articles' },
              {
                title: 'TEMPLATE_ARTICLES.ADD',
                url: '/template-articles/create',
                active: true
              }
            ],
            pageTitle: 'TEMPLATE_ARTICLES.ADD',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'template-articles/:id',
          name: 'template-articles-view',
          component: () => import('./views/template-articles/View.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'TEMPLATE_ARTICLES.TITLE',
                url: '/template-articles'
              },
              {
                title: 'TEMPLATE_ARTICLES.VIEW',
                url: '/template-articles/:id',
                active: true
              }
            ],
            pageTitle: 'TEMPLATE_ARTICLES.VIEW',
            rule: 'mentorOrSchoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'template-articles/:id/edit',
          name: 'template-articles-edit',
          component: () => import('./views/template-articles/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'TEMPLATE_ARTICLES.TITLE',
                url: '/template-articles'
              },
              {
                title: 'TEMPLATE_ARTICLES.EDIT',
                url: '/template-articles/:id/edit',
                active: true
              }
            ],
            pageTitle: 'TEMPLATE_ARTICLES.EDIT',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },

        // =============================================================================
        // INTERNSHIPS
        // =============================================================================
        {
          path: '/internships',
          name: 'internships',
          component: () => import('./views/internships/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'INTERNSHIPS.TITLE', url: '/internships', active: true }
            ],
            pageTitle: 'INTERNSHIPS.TITLE',
            rule: 'loggedIn'
          }
        },
        {
          path: 'internships/create',
          name: 'internships-create',
          component: () => import('./views/internships/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              { title: 'INTERNSHIPS.TITLE', url: '/internships' },
              {
                title: 'INTERNSHIPS.ADD',
                url: '/internships/create',
                active: true
              }
            ],
            pageTitle: 'INTERNSHIPS.ADD',
            rule: 'organizationAdminOrSchoolOrganizer'
          }
        },

        {
          path: 'internships/:id',
          name: 'internships-view',
          component: () => import('./views/internships/View.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIPS.TITLE',
                url: '/internships'
              },
              {
                title: 'INTERNSHIPS.VIEW',
                url: '/internships/:id',
                active: true
              }
            ],
            pageTitle: 'INTERNSHIPS.VIEW',
            rule: 'studentOrSchoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'internships/:id/edit',
          name: 'internships-edit',
          component: () => import('./views/internships/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIPS.TITLE',
                url: '/internships'
              },
              {
                title: 'INTERNSHIPS.EDIT',
                url: '/internships/:id/edit',
                active: true
              }
            ],
            pageTitle: 'INTERNSHIPS.EDIT',
            rule: 'organizationAdminOrSchoolOrganizer'
          }
        },

        // =============================================================================
        // INTERNSHIP AGREEMENT
        // =============================================================================
        {
          path: '/internship-agreements',
          name: 'internship-agreements',
          component: () => import('./views/internship-agreements/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements',
                active: true
              }
            ],
            pageTitle: 'INTERNSHIP_AGREEMENTS.TITLE',
            rule: 'mentorOrOrganizationAdminOrSchoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: '/internship-agreements-student',
          name: 'internship-agreements-student',
          component: () => import('./views/internship-agreements/Index.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements-student',
                active: true
              }
            ],
            pageTitle: 'INTERNSHIP_AGREEMENTS.TITLE',
            rule: 'student'
          }
        },
        {
          path: 'internship-agreements/update-student-questions/:id',
          name: 'internship-agreements-update-student-questions',
          component: () => import('./views/evaluation-templates/Form.vue'),
          props: {
            saveMethod: 'storeAnswersForStudent',
            listMethod: 'listAnswersForStudent'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements'
              },
              {
                title: 'EVALUATION_TEMPLATES.UPDATE_STUDENT_QUESTIONS',
                url: '/internship-agreements/update-student-questions/:id',
                active: true
              }
            ],
            pageTitle: 'EVALUATION_TEMPLATES.UPDATE_STUDENT_QUESTIONS',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'internship-agreements/update-mentor-questions/:id',
          name: 'internship-agreements-update-mentor-questions',
          component: () => import('./views/evaluation-templates/Form.vue'),
          props: {
            saveMethod: 'storeAnswersForMentor',
            listMethod: 'listAnswersForMentor'
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements'
              },
              {
                title: 'EVALUATION_TEMPLATES.UPDATE_MENTOR_QUESTIONS',
                url: '/internship-agreements/update-mentor-questions/:id',
                active: true
              }
            ],
            pageTitle: 'EVALUATION_TEMPLATES.UPDATE_MENTOR_QUESTIONS',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'internship-agreements/update-school-organizer-questions/:id',
          name: 'internship-agreements-update-school-organizer-questions',
          component: () => import('./views/evaluation-templates/Form.vue'),
          props: {
            saveMethod: 'storeAnswersForSchool',
            listMethod: 'listAnswersForSchool',
            id: null
          },
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements'
              },
              {
                title: 'EVALUATION_TEMPLATES.UPDATE_SCHOOL_ORGANIZER_QUESTIONS',
                url:
                  '/internship-agreements/update-school-organizer-questions/:id',
                active: true
              }
            ],
            pageTitle: 'EVALUATION_TEMPLATES.UPDATE_SCHOOL_ORGANIZER_QUESTIONS',
            rule: 'schoolAdminOrSchoolOrganizer'
          }
        },
        {
          path: 'internship-agreements/create',
          name: 'internship-agreements-create',
          component: () => import('./views/internship-agreements/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements'
              },
              {
                title: 'INTERNSHIP_AGREEMENTS.ADD',
                url: '/internship-agreements/create',
                active: true
              }
            ],
            pageTitle: 'INTERNSHIP_AGREEMENTS.ADD',
            rule: 'schoolOrganizer'
          }
        },

        {
          path: 'internship-agreements/:id',
          name: 'internship-agreements-view',
          component: () => import('./views/internship-agreements/View.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements'
              },
              {
                title: 'INTERNSHIP_AGREEMENTS.VIEW',
                url: '/internship-agreements/:id',
                active: true
              }
            ],
            pageTitle: 'INTERNSHIP_AGREEMENTS.VIEW',
            rule: 'loggedIn'
          }
        },
        {
          path: 'internship-agreements/:id/print',
          name: 'internship-agreements-print',
          component: () => import('./views/internship-agreements/Print.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements'
              },
              {
                title: 'INTERNSHIP_AGREEMENTS.VIEW',
                url: '/internship-agreements/:id',
                active: true
              }
            ],
            pageTitle: 'INTERNSHIP_AGREEMENTS.VIEW',
            rule: 'loggedIn'
          }
        },
        {
          path: 'internship-agreements/:id/edit',
          name: 'internship-agreements-edit',
          component: () => import('./views/internship-agreements/Form.vue'),
          props: true,
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'INTERNSHIP_AGREEMENTS.TITLE',
                url: '/internship-agreements'
              },
              {
                title: 'GLOBALS.EDIT',
                url: '/internship-agreements/:id/edit',
                active: true
              }
            ],
            pageTitle: 'GLOBALS.EDIT',
            rule: 'schoolOrganizer'
          }
        },
        // =============================================================================
        // NOTIFICATIONS
        // =============================================================================
        {
          path: '/notifications/',
          name: 'notifications',
          component: () => import('./views/notifications/Notifications.vue'),
          meta: {
            breadcrumb: [
              { title: 'GLOBALS.HOME', url: '/' },
              {
                title: 'NOTIFICATIONS.TITLE',
                url: '/notifications',
                active: true
              }
            ],
            pageTitle: 'NOTIFICATIONS.TITLE',
            rule: 'loggedIn'
          }
        }
      ]
    },

    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/login-jwt',
          name: 'page-login-jwt',
          component: () => import('@/views/pages/LoginJWT.vue'),
          meta: {
            rule: 'public'
          }
        },

        {
          path: '/pages/register',
          name: 'page-register',
          component: () => import('@/views/pages/Register.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/pages/forgot-password',
          name: 'page-forgot-password',
          component: () => import('@/views/pages/ForgotPassword.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/pages/reset-password',
          name: 'page-reset-password',
          component: () => import('@/views/pages/ResetPassword.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue'),
          meta: {
            rule: 'public'
          }
        },
        {
          path: '/pages/error-500',
          name: 'page-error-500',
          component: () => import('@/views/pages/Error500.vue'),

          meta: {
            rule: 'public'
          }
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue')
        },
        {
          path: '/pages/maintenance',
          name: 'page-maintenance',
          component: () => import('@/views/pages/Maintenance.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
