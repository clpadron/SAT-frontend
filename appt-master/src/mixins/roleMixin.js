import { Role } from '../models/Role'

export default {
  computed: {
    isAdmin() {
      let activeUser = this.$store.state.AppActiveUser
      return activeUser.roles.includes('ROLE_ADMIN')
    },
    isOrganizationUser() {
      let activeUser = this.$store.state.AppActiveUser
      return (
        activeUser.roles.includes('ROLE_ORGADMIN') ||
        activeUser.roles.includes('ROLE_MENTOR')
      )
    },
    isOrganizationAdmin() {
      let activeUser = this.$store.state.AppActiveUser
      return activeUser.roles.includes('ROLE_ORGADMIN')
    },
    isMentor() {
      let activeUser = this.$store.state.AppActiveUser
      return activeUser.roles.includes('ROLE_MENTOR')
    },
    isSchoolUser() {
      let activeUser = this.$store.state.AppActiveUser
      return (
        activeUser.roles.includes('ROLE_SCHOOLADMIN') ||
        activeUser.roles.includes('ROLE_SCHOOLORG') ||
        activeUser.roles.includes('ROLE_STUDENT')
      )
    },
    isSchoolAdmin() {
      let activeUser = this.$store.state.AppActiveUser
      return activeUser.roles.includes('ROLE_SCHOOLADMIN')
    },
    isSchoolOrganizer() {
      let activeUser = this.$store.state.AppActiveUser
      return activeUser.roles.includes('ROLE_SCHOOLORG')
    },
    isStudent() {
      let activeUser = this.$store.state.AppActiveUser
      return activeUser.roles.includes('ROLE_STUDENT')
    }
  },
  methods: {
    getRoleName(roleId) {
      let role = this.getRole(roleId)
      if (!role) {
        return ''
      }
      return role.name
    },
    getRole(roleId) {
      let roles = this.getRoles()
      return roles.find(role => role.id === roleId)
    },
    getRoles() {
      let role = new Role()
      return role.getRoles()
    }
  }
}
