import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { UserCollection } from './User'
import { required } from 'vue-mc/validation'
import axios from 'axios'
import BaseModelJagerApi from './BaseModelJagerApi'
import BaseCollectionJagerApi from './BaseCollectionJagerApi'

export class Comment extends BaseModelJagerApi {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      username: null,
      commenter_id: null,
      commenter_type: null,
      guest_name: null,
      guest_email: null,
      commentable_type: 'internship_agreements',
      commentable_id: null,
      comment: null,
      created_at: null,
      updated_at: null
    }
  }

  options() {
    return {
      identifier: 'id',
      useFirstErrorOnly: true
    }
  }

  displayField() {
    return 'comment'
  }

  // Attribute mutations.
  mutations() {
    return {}
  }

  //
  fieldsSettings() {
    return {
      username: {
        label: 'GLOBALS.USERNAME',
        type: 'select',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new UserCollection()
      },

      commentable_type: {
        label: 'GLOBALS.COMMENTABLE',
        type: 'text',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      commentable_id: {
        label: 'GLOBALS.COMMENTABLE_ID',
        type: 'number',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      comment: {
        label: 'GLOBALS.COMMENTABLE',
        type: 'text',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      }
    }
  }

  // Attribute validation
  validation() {
    return {
      comment: required
    }
  }

  // Route configuration
  routes() {
    return {
      save: '/comments/create',
      patch: '/comments/{id}',
      delete: '/comments/{id}'
    }
  }
}

export class CommentCollection extends BaseCollectionJagerApi {
  // Model that is contained in this collection.
  model() {
    return Comment
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
      fetch1: '/comments/{commentable_type}/{commentable_id}'
    }
  }

  fetch1(commentableType, commentableId) {
    let config = {
      url: '/comments/' + commentableType + '/' + commentableId,
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
