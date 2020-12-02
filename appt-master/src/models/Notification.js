import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { UserCollection } from './User'
import { required } from 'vue-mc/validation'
import axios from 'axios'
import BaseModelJagerApi from './BaseModelJagerApi'
import BaseCollectionJagerApi from './BaseCollectionJagerApi'

export class Notification extends BaseModelJagerApi {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      usernames: null,
      notifiable_id: null,
      notifiable_type: null,
      type: null,
      info: null,
      read_at: null,
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
      usernames: {
        label: 'GLOBALS.USERNAME',
        type: 'select',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true,
        multiple: true,
        values: new UserCollection()
      },

      notifiable_type: {
        label: 'GLOBALS.COMMENTABLE',
        type: 'text',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      notifiable_id: {
        label: 'GLOBALS.COMMENTABLE_ID',
        type: 'number',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      type: {
        label: 'GLOBALS.COMMENTABLE',
        type: 'text',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      info: {
        label: 'GLOBALS.INFO',
        type: 'text',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      read_at: {
        label: 'GLOBALS.COMMENTABLE',
        type: 'date',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      created_at: {
        label: 'GLOBALS.CREATED_AT',
        type: 'date',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      updated_at: {
        label: 'GLOBALS.UPDATED_AT',
        type: 'date',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      }
    }
  }

  // Attribute validation
  validation() {
    return {
      // comment: required
    }
  }

  // Route configuration
  routes() {
    return {
      save: '/notifications/file-uploaded',
      delete: 'notifications/{id}',
      markAsRead: 'notifications/{id}'
    }
  }

  markAsRead(username) {
    let config = {
      url: '/notifications/mark-as-read/' + username + '/' + this.id,
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

  delete(username) {
    let config = {
      url: '/notifications/' + username + '/' + this.id,
      method: 'DELETE'
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

export class NotificationCollection extends BaseCollectionJagerApi {
  // Model that is contained in this collection.
  model() {
    return Notification
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
      fetch1: '/notifications',
      fetchUnread: '/notifications/unread',
      fetchRead: '/notifications/read',
      fetchAll: '/notifications/all'
    }
  }

  fetchUnread(username) {
    let config = {
      url: '/notifications/unread/' + username,
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

  fetchRead(username) {
    let config = {
      url: '/notifications/read/' + username,
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

  fetchAll(username) {
    let config = {
      url: '/notifications/all/' + username,
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
