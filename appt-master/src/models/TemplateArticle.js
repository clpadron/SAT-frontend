import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { required } from 'vue-mc/validation'
import { SchoolKeyCollection } from './SchoolKey'

export class TemplateArticle extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      school_id: null,
      ordnum: null,
      content: null
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
        showInView: false,
        showOnCreate: false,
        showOnUpdate: false,
        pinned: 'left',
        width: 100
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
      ordnum: {
        label: 'GLOBALS.ORDER_NUMBER',
        type: 'text',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true
      },
      content: {
        label: 'GLOBALS.CONTENT',
        type: 'textarea',
        showInList: true,
        showInView: true,
        showOnCreate: true,
        showOnUpdate: true,
        width: 500
      }
    }
  }
  // Attribute validation
  validation() {
    return {
      // school_id: required
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/editTemplateArticle/{id}',
      save: '/createTemplateArticle',
      patch: '/editTemplateArticle',
      delete: '/deleteTemplateArticle/{id}'
    }
  }
}

export class TemplateArticleCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return TemplateArticle
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
      fetch: '/listTemplateArticles'
    }
  }
}
