import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { required } from 'vue-mc/validation'
import { InternshipAgreementCollection } from './InternshipAgreement'
import { Assignment, AssignmentCollection } from './Assignment'

export class StudentWorklog extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      assignment_id: null,
      log: null,
      student_log: null,
      date_log: null,
      date_studentlog: null,
      mentor_log: null,
      date_mentorlog: null
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
      internship_agreement: {
        label: 'ASSIGNMENTS.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        values: new AssignmentCollection()
      },
      student_log: {
        label: 'GLOBALS.LOG',
        type: 'textarea',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        pinned: 'left'
      },
      date_studentlog: {
        label: 'GLOBALS.DATE',
        type: 'date',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      mentor_log: {
        label: 'GLOBALS.LOG',
        type: 'textarea',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        pinned: 'left'
      },
      date_mentorlog: {
        label: 'GLOBALS.DATE',
        type: 'date',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false
      }
    }
  }
  // Attribute validation
  validation() {
    return {
      log: required,
      date_log: required
    }
  }

  // Route configuration
  routes() {
    return {
      save: '/addWorklog/{assignment_id}',
      patch: '/commentWorklog/{id}'
    }
  }
  save(assignmentId) {
    let config = {
      url: '/addWorklog/' + assignmentId,
      method: 'POST',
      data: this.attributes
    }

    return this.createRequest(config).send()
  }
  comment(workLogId) {
    let config = {
      url: '/commentWorklog/' + workLogId,
      method: 'POST',
      data: this.attributes
    }

    return this.createRequest(config).send()
  }
}

export class StudentWorklogCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return StudentWorklog
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
      fetch: '/listWorklog/{assignment_id}'
    }
  }
}
