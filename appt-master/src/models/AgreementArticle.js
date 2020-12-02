import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { required } from 'vue-mc/validation'
import { SchoolKeyCollection } from './SchoolKey'
import store from '../store/store.js'

export class AgreementArticle extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      school_id: store.state.AppActiveUser.school,
      ordnum: null,
      content: null,
      version_num: null
    }
  }

  options() {
    return {
      identifier: 'id',
      useFirstErrorOnly: true
    }
  }

  displayField() {
    return 'ordnum'
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
        showOnCreate: false,
        showOnUpdate: false,
        pinned: 'left',
        width: 100
      },
      school_id: {
        label: 'SCHOOL_KEY.TITLE_SINGLE',
        type: 'select',
        showInList: true,
        showOnCreate: false,
        showOnUpdate: false,
        values: new SchoolKeyCollection()
      },
      ordnum: {
        label: 'GLOBALS.ORDER_NUMBER',
        type: 'text',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      version_num: {
        label: 'GLOBALS.VERSION_NUMBER',
        type: 'text',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      content: {
        label: 'GLOBALS.CONTENT',
        type: 'textarea',
        showInList: false,
        showOnCreate: true,
        showOnUpdate: true
      }
    }
  }
  // Attribute validation
  validation() {
    return {
      school_id: required
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/editAgreementArticle/{id}',
      save: '/createAgreementArticle',
      patch: '/editAgreementArticle',
      delete: '/deleteAgreementArticle/{id}'
    }
  }
}

export class AgreementArticleCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return AgreementArticle
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
      fetch: '/listAgreementArticles'
    }
  }
}
