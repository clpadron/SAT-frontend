import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'

import { Role } from './Role'
import { EnterpriseCollection } from './Enterprise'
import { InternshipAgreementCollection } from './InternshipAgreement'
import { EvaluationCollection } from './Evaluation'
import { UserCollection } from './User'

let role = new Role()

export class Answer extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      question: null,
      internship_agreement: null,
      answer: null,
      userid: null
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
        label: 'EVALUATIONS.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        values: new EvaluationCollection()
      },
      internship_agreement: {
        label: 'INTERNSHIP_AGREEMENT.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        values: new InternshipAgreementCollection()
      },

      answer: {
        label: 'GLOBALS.ANSWER',
        type: 'text',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      userid: {
        label: 'USERS.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        values: new UserCollection()
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
      storeAnswersForStudent: '/storeAnswersForStudent',
      storeAnswersForMentor: '/storeAnswersForMentor'
    }
  }

  storeAnswersForStudent(internshipAgreementId) {
    let method = 'POST'
    let url = '/storeAnswersForStudent/' + internshipAgreementId
    let params = this.attributes
    params = [params]
    return this.createRequest({ method, url, data: params }).send()
  }
  storeAnswersForMentor(internshipAgreementId) {
    let method = 'POST'
    let url = '/storeAnswersForMentor/' + internshipAgreementId
    let params = this.attributes
    params = [params]
    return this.createRequest({ method, url, data: params }).send()
  }
}

export class AnswerCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return Answer
  }

  // Default attributes
  defaults() {
    return {
      orderBy: 'id'
    }
  }

  // Route configuration
  // Route configuration
  routes() {
    return {
      listAnswersForStudent: 'listAnswersForStudent',
      listAnswersForMentor: 'listAnswersForMentor',
      listAnswersForSchool: 'listAnswersForSchool',

      storeAnswersForSchool: '/storeAnswersForSchool',
      storeAnswersForMentor: '/storeAnswersForMentor',
      storeAnswersForStudent: '/storeAnswersForStudent'
    }
  }
  listAnswersForStudent(internshipAgreementId) {
    let config = {
      url: '/listAnswersForStudent/' + internshipAgreementId,
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
  listAnswersForMentor(internshipAgreementId) {
    let config = {
      url: '/listAnswersForMentor/' + internshipAgreementId,
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
  listAnswersForSchool(internshipAgreementId) {
    let config = {
      url: '/listAnswersForSchool/' + internshipAgreementId,
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

  storeAnswersForSchool(internshipAgreementId) {
    let method = 'POST'
    let url = '/storeAnswersForSchool/' + internshipAgreementId
    let params = this.models
    return this.createRequest({ method, url, data: params }).send()
  }

  storeAnswersForMentor(internshipAgreementId) {
    let method = 'POST'
    let url = '/storeAnswersForMentor/' + internshipAgreementId
    let params = this.models
    return this.createRequest({ method, url, data: params }).send()
  }

  storeAnswersForStudent(internshipAgreementId) {
    let method = 'POST'
    let url = '/storeAnswersForStudent/' + internshipAgreementId
    let params = this.models
    return this.createRequest({ method, url, data: params }).send()
  }
}
