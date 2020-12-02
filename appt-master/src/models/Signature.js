import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { UserCollection } from './User'
import { SchoolKeyCollection } from './SchoolKey'
import { StudyProgramCollection } from './StudyProgram'
import { AgreementArticleCollection } from './AgreementArticle'
import { StudyCompetenceCollection } from './StudyCompetence'
import { SchoolCollection } from './School'
import { EnterpriseCollection } from './Enterprise'
import { required } from 'vue-mc/validation'
import { InternshipAgreementCollection } from './InternshipAgreement'

export class Signature extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      internship_agreement_id: null,
      signed_student_username: null,
      signed_student_date: null,
      signed_school_username: null,
      signed_school_date: null,
      signed_organization_username: null,
      signed_organization_date: null
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
      internship_agreement_id: {
        label: 'INTERNSHIP_AGREEMENTS.TITLE_SINGLE',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new InternshipAgreementCollection()
      },

      signed_student_username: {
        label: 'GLOBALS.SIGNED_STUDENT',
        type: 'text',
        showInList: false,
        showInView: false,
        showInSignature: true,
        showOnCreate: false,
        showOnUpdate: false
      },

      signed_student_date: {
        label: 'GLOBALS.SIGNED_STUDENT_DATE',
        type: 'date',
        showInList: false,
        showInView: false,
        showInSignature: true,
        showOnCreate: false,
        showOnUpdate: false
      },
      signed_school_username: {
        label: 'GLOBALS.SIGNED_SCHOOL',
        type: 'text',
        showInList: false,
        showInView: false,
        showInSignature: true,
        showOnCreate: false,
        showOnUpdate: false
      },

      signed_school_date: {
        label: 'GLOBALS.SIGNED_SCHOOL_DATE',
        type: 'date',
        showInList: false,
        showInView: false,
        showInSignature: true,
        showOnCreate: false,
        showOnUpdate: false
      },
      signed_organization_username: {
        label: 'GLOBALS.SIGNED_ORGANIZATION',
        type: 'text',
        showInList: false,
        showInView: false,
        showInSignature: true,
        showOnCreate: false,
        showOnUpdate: false
      },

      signed_organization_date: {
        label: 'GLOBALS.SIGNED_ORGANIZATION_DATE',
        type: 'date',
        showInList: false,
        showInView: false,
        showInSignature: true,
        showOnCreate: false,
        showOnUpdate: false
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
      save: '/createSignature'
    }
  }
}

export class SignatureCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return Signature
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
