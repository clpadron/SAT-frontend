import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { required } from 'vue-mc/validation'
import { StudyCompetenceCollection } from './StudyCompetence'
import { InternshipAgreementCollection } from './InternshipAgreement'
import { StudentWorklogCollection } from './StudentWorklog'

export class Assignment extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      description: null,
      internship_agreement: null,
      study_competences: [],
      deadline: null,
      student_worklog: null
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
      description: {
        label: 'GLOBALS.DESCRIPTION',
        type: 'textarea',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        pinned: 'left'
      },
      internship_agreement: {
        label: 'INTERNSHIP_AGREEMENTS.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        values: new InternshipAgreementCollection()
      },
      study_competences: {
        label: 'STUDY_COMPETENCES.TITLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: true,
        showOnUpdate: true,
        multiple: true,
        values: new StudyCompetenceCollection()
      },
      deadline: {
        label: 'GLOBALS.DEADLINE',
        type: 'date',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      student_worklog: {
        label: 'STUDENT_WORKLOGS.TITLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        multiple: true,
        values: new StudentWorklogCollection()
      }
    }
  }
  // Attribute validation
  validation() {
    return {
      description: required,
      internship_agreement: required,
      deadline: required
    }
  }

  // Route configuration
  routes() {
    return {
      save: '/createAssignment',
      patch: '/updateAssignment',
      delete: '/deleteAssignment/{id}'
    }
  }
}

export class AssignmentCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return Assignment
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
      fetch: '/listAssignments/{internship_agreement_id}'
    }
  }

  fetch(internshipAgreementId) {
    let config = {
      url: '/listAssignments/' + internshipAgreementId,
      method: 'GET'
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
