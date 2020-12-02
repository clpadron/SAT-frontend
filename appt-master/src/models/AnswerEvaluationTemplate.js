import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { Role } from './Role'
import { EvaluationTemplate } from './EvaluationTemplate'
import store from '../store/store'

let role = new Role()

export class AnswerEvaluationTemplate extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      question: new EvaluationTemplate(),
      optionsArray: [], // for select boxes. I will just send you string of encoded object. You just save this to database as string.
      options: '', // for select boxes. I will just send you string of encoded object. You just save this to database as string.
      show_if: null, // other question_id
      show_if_value: null, // other question value. If null and show_if is not null, I will check if answer to question is “true"
      school_id: store.state.AppActiveUser.school, // I dont know to which entity will be linked for “default” evaluation questions.
      question_for: 'student', // for which user this question is
      ordnum: null // order of questions
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
      save: '/createAnswerEvaluationTemplate'
    }
  }
}

export class AnswerEvaluationTemplateCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return AnswerEvaluationTemplate
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
      listQuestionsForStudent: 'listQuestionsForStudent',
      listQuestionsForMentor: 'listQuestionsForMentor',
      listQuestionsForSchool: 'listQuestionsForSchool',

      storeQuestionsForSchool: '/storeQuestionsForSchool',
      storeQuestionsForStudent: '/storeQuestionsForStudent',
      storeQuestionsForMentor: '/storeQuestionsForMentor',

      storeAnswersForSchool: '/storeAnswersForSchool',
      storeAnswersForStudent: '/storeAnswersForStudent',
      storeAnswersForMentor: '/storeAnswersForMentor'
    }
  }
  listQuestionsForStudent() {
    let config = {
      url: '/listQuestionsForStudent',
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
  listQuestionsForMentor() {
    let config = {
      url: '/listQuestionsForMentor',
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
  listQuestionsForSchool() {
    let config = {
      url: '/listQuestionsForSchool',
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
  listAnswersForStudent(id) {
    let config = {
      url: '/listAnswersForStudent' + '/' + id,
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
  listAnswersForMentor(id) {
    let config = {
      url: '/listAnswersForMentor' + '/' + id,
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
  listAnswersForSchool(id) {
    let config = {
      url: '/listAnswersForSchool' + '/' + id,
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

  storeQuestionsForStudent() {
    let method = 'POST'
    let route = this.getRoute('storeQuestionsForStudent')
    let url = this.getURL(route)
    let params = this.models

    return this.createRequest({ method, url, data: params }).send()
  }
  storeQuestionsForMentor() {
    let method = 'POST'
    let route = this.getRoute('storeQuestionsForMentor')
    let url = this.getURL(route)
    let params = this.models

    return this.createRequest({ method, url, data: params }).send()
  }
  storeQuestionsForSchool() {
    let method = 'POST'
    let route = this.getRoute('storeQuestionsForSchool')
    let url = this.getURL(route)
    let params = this.models
    return this.createRequest({ method, url, data: params }).send()
  }
  storeAnswersForStudent(id) {
    let method = 'POST'
    let route = this.getRoute('storeAnswersForStudent')
    let url = this.getURL(route) + '/' + id
    let params = this.models

    return this.createRequest({ method, url, data: params }).send()
  }
  storeAnswersForMentor(id) {
    let method = 'POST'
    let route = this.getRoute('storeAnswersForMentor')
    let url = this.getURL(route) + '/' + id
    let params = this.models

    return this.createRequest({ method, url, data: params }).send()
  }
  storeAnswersForSchool(id) {
    let method = 'POST'
    let route = this.getRoute('storeAnswersForSchool')
    let url = this.getURL(route) + '/' + id
    let params = this.models
    return this.createRequest({ method, url, data: params }).send()
  }
}
