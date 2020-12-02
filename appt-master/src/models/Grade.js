import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { EnterpriseCollection } from './Enterprise'
import { InternshipAgreementCollection } from './InternshipAgreement'
import { StudyCompetenceCollection } from './StudyCompetence'
import { UserCollection } from './User'

export class Grade extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      internshipAgreement: null,
      studyCompetence: null,
      grade: null,
      grate_text: null,
      mentor: null
    }
  }

  options() {
    return {
      identifier: 'id',
      useFirstErrorOnly: true
    }
  }

  displayField() {
    return 'grade'
  }

  // Attribute mutations.
  mutations() {
    return {}
  }

  //
  fieldsSettings() {
    return {
      internshipAgreement: {
        label: 'INTERNSHIP_AGREEMENTS.TITLE_SINGLE',
        type: 'select',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new InternshipAgreementCollection()
      },
      studyCompetence: {
        label: 'COMPETENCES.TITLE_SINGLE',
        type: 'select',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new StudyCompetenceCollection()
      },

      grade: {
        label: 'GRADES.TITLE_SINGLE',
        type: 'integer',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },

      grate_text: {
        label: 'GLOBALS.GRADE_DESCRIPTION',
        type: 'textarea',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },

      mentor: {
        label: 'USERS.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showOnCreate: true,
        showOnUpdate: true,
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
      fetch: '/editGrade/{id}',
      save: '/createGrade',
      patch: '/editGrade',
      delete: '/deleteGrade/{id}'
    }
  }
}

export class GradeCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return Grade
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
      fetch: '/getGrades/',
      save: '/storeGrades/'
    }
  }

  save() {
    let models = []
    for (let model of this.models) {
      model.grate_text = 'ocenjeno'
      models.push(model)
    }
    let config = {
      url: '/storeGrades/',
      method: 'POST',
      data: models
      // params
      // headers
    }

    return this.createRequest(config).send()
  }
  fetch(internshipAgreementId) {
    let config = {
      url: '/getGrades/' + internshipAgreementId,
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
