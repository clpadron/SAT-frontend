import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { required } from 'vue-mc/validation'
import { StudyCompetenceCollection } from './StudyCompetence'
import { StudyProgramCollection } from './StudyProgram'
import { SchoolCollection } from './School'
import { EnterpriseCollection } from './Enterprise'

export class Internship extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      organization: null,
      studyProgram: null,
      studyCompetence: new StudyCompetenceCollection()
    }
  }

  options() {
    return {
      identifier: 'id',
      useFirstErrorOnly: true
    }
  }

  displayField() {
    return 'id'
  }

  // Attribute mutations.
  mutations() {
    return {
      // organization: (id) => { return { "id": id }},
      // studyProgram: (id) => { return { "id": id }},
    }
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
      organization: {
        label: 'ORGANIZATIONS.TITLE_SINGLE',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new EnterpriseCollection()
      },
      studyProgram: {
        label: 'STUDY_PROGRAMS.TITLE',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new StudyProgramCollection()
      },
      studyCompetence: {
        label: 'COMPETENCES.TITLE',
        type: 'select',
        showInList: false,
        showInView: true,
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
      organization: required,
      studyProgram: required
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/editInternship/{id}',
      save: '/createInternship',
      patch: '/editInternship',
      delete: '/deleteInternship/{id}',
      apply: '/applyForInternship'
    }
  }

  apply() {
    let config = {
      url: '/applyForInternship/' + this.id,
      method: 'GET'
      // data
      // params
      // headers
    }

    return this.createRequest(config).send()
  }
}

export class InternshipCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return Internship
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
      fetch: '/listInternships',
      fetchForStudyProgram: '/listInternships/{study_program_id}'
    }
  }

  fetchForStudyProgram(studyProgramId) {
    let config = {
      url: '/listInternships/' + studyProgramId,
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
}
