import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { required } from 'vue-mc/validation'

export class SchoolKey extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      school_id: null,
      public_key: null
    }
  }

  options() {
    return {
      identifier: 'school_id',
      useFirstErrorOnly: true
    }
  }

  displayField() {
    return 'school_id'
  }

  // Attribute mutations.
  mutations() {
    return {}
  }

  //
  fieldsSettings() {
    return {
      school_id: {
        label: 'GLOBALS.ID',
        type: 'text',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: false
      },
      public_key: {
        label: 'GLOBALS.PUBLIC_KEY',
        type: 'textarea',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      }
    }
  }
  // Attribute validation
  validation() {
    return {
      school_id: required
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/listSchools/{school_id}',
      save: '/createSchool',
      patch: '/editSchool/',
      delete: '/deleteSchool/{school_id}'
    }
  }

  patch() {
    let method = 'POST'
    let route = this.getRoute('patch')
    let url = this.getURL(route) + this.school_id
    let params = this.attributes
    return this.createRequest({ method, url, data: params }).send()
  }
}

export class SchoolKeyCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return SchoolKey
  }

  // Default attributes
  defaults() {
    return {
      orderBy: 'school_id'
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/listSchools'
    }
  }
}
