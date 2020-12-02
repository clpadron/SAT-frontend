import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { SchoolKeyCollection } from './SchoolKey'
import { UserCollection } from './User'
import { StudyProgramCollection } from './StudyProgram'

import { required } from 'vue-mc/validation'
import store from '../store/store'

export class Enterprise extends BaseModel {
  displayField1 = 'name'
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      orgtype: 'ORGANIZATION',
      name: null,
      streetname: null,
      cityname: null,
      cityzipcode: null,
      contact_username: null,
      school_id: store.state.AppActiveUser.school,
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
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        pinned: 'left',
        width: 100
      },
      name: {
        label: 'GLOBALS.NAME_ORGANIZATION',
        type: 'text',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        pinned: 'left'
      },
      streetname: {
        label: 'GLOBALS.ADDRESS',
        type: 'text',
        showInList: false,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },

      cityname: {
        label: 'GLOBALS.CITY',
        type: 'text',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      cityzipcode: {
        label: 'GLOBALS.ZIP_CODE',
        type: 'text',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      contact_username: {
        label: 'GLOBALS.CONTACT_USER',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        sendOnlyIds: true,
        values: new UserCollection(),
        filterRole: 'ROLE_ORGADMIN'
      },
      studyPrograms: {
        label: 'STUDY_PROGRAMS.TITLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: true,
        showOnUpdate: true,
        multiple: true,
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
      propose: '/studentProposal/{study_program_id}',
      patch: '/editOrganization',
      delete: '/deleteOrganization/{id}'
    }
  }

  propose(studyProgramId) {
    let config = {
      url: '/studentProposal/' + studyProgramId,
      method: 'POST',
      data: this
    }

    return this.createRequest(config).send()
  }
}

export class EnterpriseCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return Enterprise
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
      fetch: '/listOrganizationsByType/ORGANIZATION'
    }
  }
}
