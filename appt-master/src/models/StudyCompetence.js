import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { required, length } from 'vue-mc/validation'

export class StudyCompetence extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      name: null,
      description: null
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
      description: {
        label: 'GLOBALS.DESCRIPTION',
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
      name: required.and(length(1, 100)),
      description: required
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/editStudyCompetence/{id}',
      save: '/createStudyCompetence',
      patch: '/editStudyCompetence',
      delete: '/deleteStudyCompetence/{id}'
    }
  }
}

export class StudyCompetenceCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return StudyCompetence
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
      fetch: '/listStudyCompetences'
    }
  }
}
