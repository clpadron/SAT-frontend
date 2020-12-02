import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { Role } from './Role'
import store from '../store/store'

let role = new Role()

export class Evaluation extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      question: null,
      options: null, // for select boxes. I will just send you string of encoded object. You just save this to database as string.
      show_if: null, // other question_id
      show_if_value: null, // other question value. If null and show_if is not null, I will check if answer to question is “true"
      school_id: store.state.AppActiveUser.school, // I dont know to which entity will be linked for “default” evaluation questions.
      for: 'student', // for which user this question is
      order: null // order of questions
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
        width: 100
      },
      question: {
        label: 'GLOBALS.QUESTION',
        type: 'text',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      options: {
        label: 'GLOBALS.OPTIONS',
        type: 'text',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },

      show_if: {
        label: 'GLOBALS.OTHER_QUESTION_DEPENDENCY',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new Evaluation()
      },
      show_if_value: {
        label: 'GLOBALS.OTHER_QUESTION_VALUE_DEPENDENCY',
        type: 'text',
        showInList: false,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },

      for: {
        label: 'GLOBALS.SHOW_FOR_ROLE',
        type: 'select',
        showInList: false,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        sendOnlyIds: true,
        values: role.getRoles()
      },
      order: {
        label: 'GLOBALS.ORDER',
        type: 'numeric',
        showInList: false,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      }
    }
  }

  // Attribute validation
  validation() {
    return {}
  }

  // Route configuration
  routes() {
    return {
      save: '/createEvaluation'
    }
  }
}

export class EvaluationCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return Evaluation
  }

  // Default attributes
  defaults() {
    return {
      orderBy: 'id'
    }
  }

  // Route configuration
  routes() {
    return {}
  }
}
