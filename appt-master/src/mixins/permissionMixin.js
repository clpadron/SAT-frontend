export default {
  methods: {
    canEditUser(user) {
      let userRole = user.roles[0]

      if (userRole === 'ROLE_STUDENT') {
        return this.can('updateStudent', 'User')
      }
      if (userRole === 'ROLE_MENTOR') {
        return this.can('updateMentor', 'User')
      }
      if (userRole === 'ROLE_SCHOOLADMIN') {
        return this.can('updateSchoolAdmin', 'User')
      }
      if (userRole === 'ROLE_SCHOOLORG') {
        return this.can('updateSchoolOrganizer', 'User')
      }
      if (userRole === 'ROLE_ORGADMIN') {
        return this.can('updateOrganizationAdmin', 'User')
      }

      return false
    },
    canDeleteUser(user) {
      if (user.jwt) {
        return false
      }
      let userRole = user.roles[0]

      if (userRole === 'ROLE_STUDENT') {
        return this.can('deleteStudent', 'User')
      }
      if (userRole === 'ROLE_MENTOR') {
        return this.can('deleteMentor', 'User')
      }
      if (userRole === 'ROLE_SCHOOLADMIN') {
        return this.can('deleteSchoolAdmin', 'User')
      }
      if (userRole === 'ROLE_SCHOOLORG') {
        return this.can('deleteSchoolOrganizer', 'User')
      }
      if (userRole === 'ROLE_ORGADMIN') {
        return this.can('deleteOrganizationAdmin', 'User')
      }

      return false
    },
    can(action, model = '') {
      if (model === 'Internship' || model === 'TemplateArticle') {
        if (action === 'create') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'update') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'delete') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'view') {
          return this.$acl.check('loggedIn')
        }
        if (action === 'apply') {
          return this.$acl.check('student')
        }
      }
      if (model === 'StudyProgram') {
        if (action === 'create') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'update') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'delete') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'view') {
          return this.$acl.check('studentOrSchoolAdminOrSchoolOrganizer')
        }
      }
      if (model === 'Assignment') {
        if (action === 'create') {
          return this.$acl.check('mentor')
        }
        if (action === 'update') {
          return this.$acl.check('mentor')
        }
        if (action === 'delete') {
          return this.$acl.check('mentor')
        }
        if (action === 'view') {
          return this.$acl.check('loggedIn')
        }
      }
      if (model === 'Worklog') {
        if (action === 'create') {
          return this.$acl.check('student')
        }
        if (action === 'update') {
          return this.$acl.check('student')
        }
        if (action === 'delete') {
          return this.$acl.check('student')
        }
        if (action === 'view') {
          return this.$acl.check('loggedIn')
        }
        if (action === 'addComment') {
          return this.$acl.check('mentor')
        }
      }
      if (model === 'Enterprise') {
        if (action === 'create') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'update') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'delete') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'view') {
          return this.$acl.check('studentOrSchoolAdminOrSchoolOrganizer')
        }
        if (action === 'propose') {
          return this.$acl.check('student')
        }
      }
      if (model === 'EvaluationTemplate') {
        if (action === 'create') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'update') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'delete') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'view') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
      }
      if (model === 'Evaluation') {
        if (action === 'create') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'update') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'delete') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'view') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
      }
      if (model === 'User') {
        if (action === 'create') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'createAny') {
          return this.$acl.check('admin')
        }
        if (action === 'update') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'updateSchoolAdmin') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'updateSchoolOrganizer') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'updateOrganizationAdmin') {
          return this.$acl.check('organizationAdminOrSchoolAdmin')
        }
        if (action === 'updateMentor') {
          return this.$acl.check(
            'organizationAdminOrSchoolAdminOrSchoolOrganizer'
          )
        }
        if (action === 'updateStudent') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'delete') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'deleteSchoolAdmin') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'deleteSchoolOrganizer') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'deleteOrganizationAdmin') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'deleteMentor') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'deleteStudent') {
          return this.$acl.check('schoolAdmin')
        }
        if (action === 'view') {
          return this.$acl.check('studentOrSchoolAdminOrSchoolOrganizer')
        }
        if (action === 'viewAll') {
          return this.$acl.check('admin')
        }
      }
      if (model === 'InternshipAgreement') {
        if (action === 'create') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'update') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'delete') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'view') {
          return this.$acl.check('loggedIn')
        }
        if (action === 'viewAll') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }

        if (action === 'viewStudentUnsigned') {
          return this.$acl.check('studentOrSchoolAdminOrSchoolOrganizer')
        }
        if (action === 'viewAllUnsigned') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'ViewSchoolUnsigned') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'viewOrganizationUnsigned') {
          return this.$acl.check('mentorOrSchoolAdminOrSchoolOrganizer')
        }
        if (action === 'evaluate') {
          return this.$acl.check('studentOrMentorOrSchoolOrganizer')
        }
        if (action === 'comment') {
          return this.$acl.check('loggedIn')
        }
        if (action === 'viewArticles') {
          return this.$acl.check('loggedIn')
        }
        if (action === 'grade') {
          return this.$acl.check('mentor')
        }
        if (action === 'upload') {
          return this.$acl.check('loggedIn')
        }
        if (action === 'sign') {
          return this.$acl.check('loggedIn')
        }
        if (action === 'viewSchoolOrganizerAnswers') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'viewStudentAnswers') {
          return this.$acl.check('studentOrSchoolAdminOrSchoolOrganizer')
        }
        if (action === 'viewMentorAnswers') {
          return this.$acl.check(
            'mentorOrOrganizationAdminOrSchoolAdminOrSchoolOrganizer'
          )
        }
        if (action === 'viewAnswers') {
          return this.$acl.check('schoolAdminOrSchoolOrganizer')
        }
        if (action === 'storeAnswersForMentor') {
          return this.$acl.check('mentor')
        }
        if (action === 'storeAnswersForStudent') {
          return this.$acl.check('student')
        }
      }

      console.log('Missing permission: ' + action, model)

      return true
    }
  }
}
