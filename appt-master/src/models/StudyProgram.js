import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { required, length } from 'vue-mc/validation'
import { StudyModuleCollection } from './StudyModule'
import { StudyCompetenceCollection } from './StudyCompetence'

export class StudyProgram extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      idnumber: null,
      name: null,
      description: null,
      studyModules: [],
      studyCompetences: []
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
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        pinned: 'left',
        width: 100
      },
      idnumber: {
        label: 'GLOBALS.ID_NUMBER',
        type: 'text',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      name: {
        label: 'GLOBALS.NAME',
        type: 'text',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        pinned: 'left'
      },
      description: {
        label: 'GLOBALS.DESCRIPTION',
        type: 'textarea',
        showInList: false,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      studyModules: {
        label: 'STUDY_MODULES.TITLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        multiple: true,
        values: new StudyModuleCollection()
      },
      studyCompetences: {
        label: 'COMPETENCES.TITLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
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
      fetch: '/viewStudyProgram/{id}',
      save: '/createStudyProgram',
      patch: '/editStudyProgram',
      delete: '/deleteStudyProgram/{id}'
    }
  }
}

export class StudyProgramCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return StudyProgram
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
      fetch: '/listStudyPrograms'
    }
  }
}
