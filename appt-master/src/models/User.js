import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { SchoolKeyCollection } from './SchoolKey'
import { Role } from './Role'
import { SchoolCollection } from './School'
import { required } from 'vue-mc/validation'
import { StudyProgramCollection } from './StudyProgram'
import store from '../store/store'

let role = new Role()

export class User extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      username: null,
      password: null,
      first_name: null,
      last_name: null,
      email: null,
      organization: null,
      school: store.state.AppActiveUser.school,
      roles: [],
      phone: null,
      cityname: null,
      cityzipcode: null,
      streetname: null,
      studyprogram: null
    }
  }

  options() {
    return {
      identifier: 'username',
      useFirstErrorOnly: true
    }
  }

  displayField() {
    return ['first_name', 'last_name']
  }

  // Attribute mutations.
  mutations() {
    return {
      id: id => Number(id) || null,
      name: String,
      done: Boolean
    }
  }

  fieldsSettings() {
    return {
      username: {
        label: 'GLOBALS.USERNAME',
        type: 'text',
        showInList: true,
        showInView: true,
        showInViewStudent: true,
        showOnCreate: true,
        showOnUpdate: false,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: false,
        showOnSelfUpdate: false,
        search: true,
        suppressSizeToFit: false,
        pinned: 'left'
      },
      password: {
        label: 'GLOBALS.PASSWORD',
        type: 'password',
        showInList: false,
        showInView: false,
        showInViewStudent: false,
        showOnCreate: true,
        showOnUpdate: false,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: false,
        showOnSelfUpdate: false,
        suppressSizeToFit: false
      },
      first_name: {
        label: 'GLOBALS.FIRST_NAME',
        type: 'text',
        showInList: true,
        showInView: true,
        showInViewStudent: true,
        showOnCreate: true,
        showOnUpdate: true,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: true,
        showOnSelfUpdate: true,
        search: true
      },
      last_name: {
        label: 'GLOBALS.LAST_NAME',
        type: 'text',
        showInList: true,
        showInView: true,
        showInViewStudent: true,
        showOnCreate: true,
        showOnUpdate: true,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: true,
        showOnSelfUpdate: true,
        search: true
      },
      email: {
        label: 'GLOBALS.EMAIL',
        type: 'email',
        showInList: true,
        showInView: true,
        showInViewStudent: true,
        showOnCreate: true,
        showOnUpdate: true,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: true,
        showOnSelfUpdate: true,
        suppressSizeToFit: false
      },
      phone: {
        label: 'GLOBALS.PHONE',
        type: 'text',
        showInList: false,
        showInView: true,
        showInViewStudent: false,
        showOnCreate: true,
        showOnUpdate: true,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: true,
        showOnSelfUpdate: true,
        suppressSizeToFit: false
      },
      streetname: {
        label: 'GLOBALS.ADDRESS',
        type: 'text',
        showInList: false,
        showInView: true,
        showInViewStudent: false,
        showOnCreate: true,
        showOnUpdate: true,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: true,
        showOnSelfUpdate: true,
        suppressSizeToFit: false
      },
      cityzipcode: {
        label: 'GLOBALS.ZIP_CODE',
        type: 'text',
        showInList: false,
        showInView: true,
        showInViewStudent: false,
        showOnCreate: true,
        showOnUpdate: true,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: true,
        showOnSelfUpdate: true
      },
      cityname: {
        label: 'GLOBALS.CITY',
        type: 'text',
        showInList: false,
        showInView: true,
        showInViewStudent: false,
        showOnCreate: true,
        showOnUpdate: true,
        showOnRegister: true,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: true,
        showOnSelfUpdate: true
      },
      roles: {
        label: 'GLOBALS.ROLES',
        type: 'select',
        showInList: true,
        showInView: true,
        showInViewStudent: false,
        showOnCreate: false,
        showOnUpdate: false,
        showOnRegister: false,
        showOnCreateForNonAdmin: false,
        showOnUpdateForNonAdmin: false,
        sendOnlyIds: true,
        multiple: true,
        values: role.getRoles(),
        showOnSelfUpdate: false
      },
      organization: {
        label: 'GLOBALS.ORGANIZATION_OR_SCHOOL',
        type: 'select',
        showInList: true,
        showInView: true,
        showInViewStudent: true,
        showOnCreate: false,
        showOnUpdate: false,
        showOnRegister: false,
        showOnCreateForNonAdmin: false,
        showOnUpdateForNonAdmin: false,
        sendOnlyIds: true,
        values: new SchoolCollection(),
        showOnSelfUpdate: false
      },
      school: {
        label: 'GLOBALS.SCHOOL',
        type: 'select',
        showInList: false,
        showInView: false,
        showInViewStudent: false,
        showOnCreate: false,
        showOnUpdate: false,
        showOnRegister: false,
        showOnCreateForNonAdmin: false,
        showOnUpdateForNonAdmin: false,
        sendOnlyIds: true,
        values: new SchoolKeyCollection(),
        showOnSelfUpdate: false
      },
      studyprogram: {
        label: 'STUDY_PROGRAMS.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showInView: true,
        showInViewStudent: true,
        showOnCreate: true,
        showOnUpdate: true,
        showOnRegister: false,
        showOnCreateForNonAdmin: true,
        showOnUpdateForNonAdmin: true,
        values: new StudyProgramCollection(),
        showOnSelfUpdate: false
      }
    }
  }

  // Attribute validation
  validation() {
    return {
      username: required,
      password: required,
      organization: required,
      school: required,
      roles: value => {
        if (!value || !value.length) {
          return 'required'
        }
        return
      }
    }
  }

  // Route configuration
  routes() {
    return {
      getCurrentUser: '/currentUser',
      fetch: '/listUsers/{id}',
      save: '/createUser',
      saveSchoolAdmin: '/createSchooladminUser',
      saveSchoolOrganizer: '/createSchoolorganizerUser',
      saveOrganizationAdmin: '/createOrgadminUser',
      saveMentor: '/createMentorUser',
      saveStudent: '/createStudentUser',
      register: '/selfRegister',
      modifyUserPermission: '/modifyUserPermission',
      modifyUserPassword: '/modifyUserPassword',
      modifyUser: '/modifyUser',
      delete: '/deleteUser'
    }
  }

  modifyUser() {
    let method = 'POST'
    let route = this.getRoute('modifyUser')
    let url = this.getURL(route)
    let params = this.attributes
    return this.createRequest({ method, url, data: params }).send()
  }
  saveSchoolAdmin() {
    let method = 'POST'
    let route = this.getRoute('saveSchoolAdmin')
    let url = this.getURL(route)
    let params = this.attributes
    return this.createRequest({ method, url, data: params }).send()
  }
  saveSchoolOrganizer() {
    let method = 'POST'
    let route = this.getRoute('saveSchoolOrganizer')
    let url = this.getURL(route)
    let params = this.attributes
    return this.createRequest({ method, url, data: params }).send()
  }
  saveOrganizationAdmin() {
    let method = 'POST'
    let route = this.getRoute('saveOrganizationAdmin')
    let url = this.getURL(route)
    let params = this.attributes
    return this.createRequest({ method, url, data: params }).send()
  }
  saveMentor() {
    let method = 'POST'
    let route = this.getRoute('saveMentor')
    let url = this.getURL(route)
    let params = this.attributes
    return this.createRequest({ method, url, data: params }).send()
  }
  saveStudent() {
    let method = 'POST'
    let route = this.getRoute('saveStudent')
    let url = this.getURL(route)
    let params = this.attributes
    return this.createRequest({ method, url, data: params }).send()
  }
  register() {
    let method = 'POST'
    let route = this.getRoute('register')
    let url = this.getURL(route)
    let params = this.attributes
    return this.createRequest({ method, url, data: params }).send()
  }
  delete() {
    let method = this.getOption('methods.delete')
    let route = this.getRoute('delete')
    let url = this.getURL(route)
    let params = this.attributes

    return this.createRequest({ method, url, data: params }).send()
  }
  modifyUserPassword() {
    let method = 'POST'
    let route = this.getRoute('modifyUserPassword')
    let url = this.getURL(route)
    return this.createRequest({ method, url, data: this }).send()
  }
}

export class UserCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return User
  }

  // Default attributes
  defaults() {
    return {
      orderBy: 'username'
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: 'listUsers',
      fetchInOrganization: 'listUsersWithinOrganization',
      fetchInSchool: 'listUsersWithinSchool'
    }
  }
  fetchInOrganization() {
    let config = {
      url: '/listUsersWithinOrganization',
      method: 'GET'
      // data
      // params
      // headers
    }

    return this.createRequest(config)
      .send()
      .then(response => {
        this.replace(response.response.data)
      })
      .catch(error => {
        // Handle failure here
      })
  }
  fetchInSchool() {
    let config = {
      url: '/listUsersWithinSchool',
      method: 'GET'
      // data
      // params
      // headers
    }

    return this.createRequest(config)
      .send()
      .then(response => {
        this.replace(response.response.data)
      })
      .catch(error => {
        // Handle failure here
      })
  }

  hasRole(role) {
    return !!this.roles.includes(role)
  }
}
