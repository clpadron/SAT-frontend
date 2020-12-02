import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '../router'
import axios from '../axios'

Vue.use(AclInstaller)

let initialRole = 'public'

let userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (userInfo && userInfo.userRole) initialRole = userInfo.userRole

export default new AclCreate({
  initial: initialRole,
  notfound: '/pages/not-authorized',
  router,
  acceptLocalRules: true,
  globalRules: {
    admin: new AclRule('admin').generate(),
    schoolAdmin: new AclRule('schoolAdmin').or('admin').generate(),
    schoolOrganizer: new AclRule('schoolOrganizer').or('admin').generate(),
    organizationAdmin: new AclRule('organizationAdmin').or('admin').generate(),
    student: new AclRule('student').or('admin').generate(),
    mentor: new AclRule('mentor').or('admin').generate(),
    studentOrSchoolAdminOrSchoolOrganizer: new AclRule('admin')
      .or('schoolAdmin')
      .or('schoolOrganizer')
      .or('student')
      .generate(),
    mentorOrOrganizationAdminOrSchoolAdminOrSchoolOrganizer: new AclRule(
      'admin'
    )
      .or('schoolAdmin')
      .or('schoolOrganizer')
      .or('organizationAdmin')
      .or('mentor')
      .generate(),
    organizationAdminOrSchoolAdminOrSchoolOrganizer: new AclRule('admin')
      .or('schoolAdmin')
      .or('schoolOrganizer')
      .or('organizationAdmin')
      .generate(),
    organizationAdminOrSchoolAdmin: new AclRule('admin')
      .or('schoolAdmin')
      .or('organizationAdmin')
      .generate(),
    organizationAdminOrSchoolOrganizer: new AclRule('admin')
      .or('schoolAdmin')
      .or('schoolOrganizer')
      .generate(),
    mentorOrSchoolAdminOrSchoolOrganizer: new AclRule('admin')
      .or('schoolAdmin')
      .or('schoolOrganizer')
      .or('mentor')
      .generate(),
    schoolAdminOrSchoolOrganizer: new AclRule('admin')
      .or('schoolAdmin')
      .or('schoolOrganizer')
      .generate(),
    studentOrMentorOrSchoolOrganizer: new AclRule('admin')
      .or('schoolOrganizer')
      .or('student')
      .or('mentor')
      .generate(),
    studentOrMentor: new AclRule('admin')
      .or('student')
      .or('mentor')
      .generate(),
    loggedIn: new AclRule('admin')
      .or('schoolAdmin')
      .or('schoolOrganizer')
      .or('organizationAdmin')
      .or('mentor')
      .or('student')
      .generate(),
    public: new AclRule('public')
      .or('schoolAdmin')
      .or('schoolOrganizer')
      .or('organizationAdmin')
      .or('mentor')
      .or('student')
      .or('admin')
      .or('admin')
      .generate()
  },
  middleware: async () => {
    let meta = router.currentRoute.meta
    if (meta.rule === 'public') {
      return
    }

    axios
      .get('/currentUser')
      .then(response => {
        if (typeof response.data !== 'object') {
          router.push({ name: 'page-login' })
        }
        if (typeof response.data === 'string') {
          router.push({ name: 'page-login' })
        }
      })
      .catch(() => {
        router.push({ name: 'page-login' })
      })
  }
})
