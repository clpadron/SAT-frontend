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
import store from '../store/store'

export class InternshipAgreement extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      document_number: null,
      organization: null,
      student: null,
      mentor: null,
      school_organizer: null,
      periodBegin: null,
      periodEnd: null,
      studyProgram: null,
      school_id: store.state.AppActiveUser.school,
      version_num: null,
      grade_final: null,
      grade_exam: null,
      ects_points: null,
      sum_of_hours: null,
      articles: [],
      competences: [],
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
        width: 100,
        pinned: 'left'
      },

      document_number: {
        label: 'GLOBALS.DOCUMENT_NUMBER',
        type: 'text',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        pinned: 'left'
      },
      organization: {
        label: 'ENTERPRISES.TITLE_SINGLE',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new EnterpriseCollection(),
        filter: true
      },
      student: {
        label: 'USERS.STUDENT',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new UserCollection(),
        filterRole: 'ROLE_STUDENT'
      },
      mentor: {
        label: 'USERS.MENTOR',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new UserCollection(),
        filterRole: 'ROLE_MENTOR'
      },
      school_organizer: {
        label: 'USERS.SCHOOL_ORGANIZER',
        type: 'select',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new UserCollection(),
        filterRole: 'ROLE_SCHOOLORG'
      },

      periodBegin: {
        label: 'GLOBALS.BEGIN',
        type: 'date',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      periodEnd: {
        label: 'GLOBALS.END',
        type: 'date',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },

      studyProgram: {
        label: 'STUDY_PROGRAMS.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: true,
        showOnUpdate: true,
        values: new StudyProgramCollection()
      },
      school_id: {
        label: 'SCHOOL_KEYS.TITLE_SINGLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        values: new SchoolKeyCollection()
      },
      grade_exam: {
        label: 'GLOBALS.GRADE_EXAM',
        type: 'integer',
        showInList: false,
        showInView: true,
        showOnCreate: false,
        showOnUpdate: true
      },
      grade_final: {
        label: 'GLOBALS.GRADE_FINAL',
        type: 'integer',
        showInList: false,
        showInView: true,
        showOnCreate: false,
        showOnUpdate: true
      },
      sum_of_hours: {
        label: 'GLOBALS.SUM_OF_HOURS',
        type: 'integer',
        showInList: false,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      ects_points: {
        label: 'GLOBALS.ECTS_POINTS',
        type: 'integer',
        showInList: false,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      version_num: {
        label: 'GLOBALS.VERSION_NUMBER',
        type: 'integer',
        showInList: true,
        showInView: true,
        showOnCreate: false,
        showOnUpdate: false
      },

      articles: {
        label: 'ARTICLES.TITLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        values: new AgreementArticleCollection()
      },

      competences: {
        label: 'COMPETENCES.TITLE',
        type: 'select',
        showInList: false,
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        values: new StudyCompetenceCollection()
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
    return {
      organization: required,
      student: required,
      studyProgram: required,
      competences: value => {
        if (!value || !value.length) {
          return 'required.'
        }
        return
      },
      articles: value => {
        if (!value || !value.length) {
          return 'This field is required.'
        }
        return
      }
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/editInternshipAgreement/{id}',
      save: '/createInternshipAgreement',
      patch: '/editInternshipAgreement',
      delete: '/deleteInternshipAgreement/{id}',
      getFiles: '/getFiles',
      signStudent: '/signStudent',
      signSchool: '/signSchool',
      signOrganization: '/signOrganization',
      signInternshipAgreement: '/signInternshipAgreement'
    }
  }

  getFiles() {
    let config = {
      url: '/getInternshipAgreementFiles/' + this.id,
      method: 'GET'
      // data
      // params
      // headers
    }

    return this.createRequest(config).send()
  }

  signStudent() {
    let config = {
      url: '/signStudentInternshipAgreements/' + this.id,
      method: 'GET'
    }

    return this.createRequest(config).send()
  }

  signSchool() {
    let config = {
      url: '/signSchoolInternshipAgreements/' + this.id,
      method: 'GET'
    }

    return this.createRequest(config).send()
  }

  signOrganization() {
    let config = {
      url: '/signOrganizationInternshipAgreements/' + this.id,
      method: 'GET'
    }

    return this.createRequest(config).send()
  }
  signInternshipAgreement(student, organizationUser, schoolUser) {
    let config = {
      url: '/signInternshipAgreement/',
      method: 'POST',
      data: {
        internship_agreement: {
          id: this.id
        },
        signed_student_username: student.username,
        signed_school_username: schoolUser.username,
        signed_organization_username: organizationUser.username
      }
    }

    return this.createRequest(config).send()
  }
}

export class InternshipAgreementCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return InternshipAgreement
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
      fetch: '/listInternshipAgreements',
      fetchUnsigned: '/listUnsignedInternshipAgreements',
      fetchUnsignedStudent: '/listUnsignedStudentInternshipAgreements',
      fetchStudent: '/listStudentInternshipAgreements',
      fetchUnsignedOrganization:
        '/listUnsignedOrganizationInternshipAgreements',
      fetchOrganization: '/listOrganizationInternshipAgreements',
      fetchSchool: '/listSchoolInternshipAgreements'
    }
  }

  fetchStudent() {
    let config = {
      url: '/listStudentInternshipAgreements',
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

  fetchOrganization() {
    let config = {
      url: '/listOrganizationInternshipAgreements',
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

  fetchUnsignedStudent() {
    let config = {
      url: '/listUnsignedStudentInternshipAgreements',
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

  fetchUnsignedOrganization() {
    let config = {
      url: '/listUnsignedOrganizationInternshipAgreements',
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

  fetchUnsigned() {
    let config = {
      url: '/listUnsignedInternshipAgreements',
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
