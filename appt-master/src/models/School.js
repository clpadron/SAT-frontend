import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { SchoolKeyCollection } from './SchoolKey'
import { UserCollection } from './User'
import { StudyProgramCollection } from './StudyProgram'

import { required } from 'vue-mc/validation'

export class School extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      orgtype: 'SCHOOL',
      name: null,
      streetname: null,
      cityname: null,
      cityzipcode: null,
      contact_username: null,
      school_id: null,
      studyPrograms: []
    }
  }

  options() {
    return {
      identifier: 'id',
      useFirstErrorOnly: true
    }
  }

  displayField() {
    return 'name'
  }

  // Attribute mutations.
  mutations() {
    return {}
  }

  //
  fieldsSettings() {
    return {
      id: {
        label: 'GLOBALS.ID',
        type: 'text',
        showInList: true,
        showOnCreate: false,
        showOnUpdate: false,
        width: 100
      },
      name: {
        label: 'GLOBALS.NAME',
        type: 'text',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      streetname: {
        label: 'GLOBALS.ADDRESS',
        type: 'text',
        showInList: false,
        showOnCreate: true,
        showOnUpdate: true
      },

      cityname: {
        label: 'GLOBALS.CITY',
        type: 'text',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      cityzipcode: {
        label: 'GLOBALS.ZIP_CODE',
        type: 'text',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      contact_username: {
        label: 'GLOBALS.CONTACT_USER',
        type: 'select',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true,
        sendOnlyIds: true,
        values: new UserCollection(),
        filterRole: 'ROLE_SCHOOLADMIN'
      },
      school_id: {
        label: 'SCHOOL_KEYS.TITLE_SINGLE',
        type: 'select',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true,
        sendOnlyIds: true,
        values: new SchoolKeyCollection()
      },
      studyPrograms: {
        label: 'STUDY_PROGRAMS.TITLE',
        type: 'select',
        multiple: true,
        showInList: false,
        showOnCreate: true,
        showOnUpdate: true,
        values: new StudyProgramCollection()
      }
    }
  }
  // Attribute validation
  validation() {
    return {
      orgtype: required,
      name: required,
      streetname: required,
      cityname: required,
      cityzipcode: required,
      school_id: required
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/editOrganization/{id}',
      save: '/createOrganization',
      patch: '/editOrganization',
      delete: '/deleteOrganization/{id}'
    }
  }
}

export class SchoolCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return School
  }

  // Default attributes
  defaults() {
    return {
      orderBy: 'id'
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/listOrganizationsByType/SCHOOL'
    }
  }
}
