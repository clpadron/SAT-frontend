import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { length, required } from 'vue-mc/validation'
import { StudyCompetenceCollection } from './StudyCompetence'

export class StudyModule extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      name: null,
      description: null,
      studyCompetences: new StudyCompetenceCollection()
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
      },
      studyCompetences: {
        label: 'COMPETENCES.TITLE',
        type: 'subForm',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: false,
        multiple: true,
        values: new StudyCompetenceCollection()
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
      fetch: '/editStudyModule/{id}',
      save: '/createStudyModule',
      patch: '/editStudyModule',
      delete: '/deleteStudyModule/{id}'
    }
  }
}

export class StudyModuleCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return StudyModule
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
      fetch: '/listStudyModules'
    }
  }
}
