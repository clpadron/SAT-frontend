import BaseModel from './BaseModel'
import BaseCollection from './BaseCollection'
import { UserCollection } from './User'
import { required } from 'vue-mc/validation'

export class File extends BaseModel {
  // Default attributes that define the "empty" state.
  defaults() {
    return {
      id: null,
      owner_username: null,
      table_name: null,
      table_id: null,
      bytes: null,
      mime: null,
      filename: null,
      vrijeme: null
    }
  }

  options() {
    return {
      identifier: 'id',
      useFirstErrorOnly: true
    }
  }

  displayField() {
    return 'filename'
  }

  // Attribute mutations.
  mutations() {
    return {}
  }

  //
  fieldsSettings() {
    return {
      owner_username: {
        label: 'GLOBALS.OWNER_USERNAME',
        type: 'select',
        showInList: true,
        showOnCreate: true,
        showOnUpdate: true,
        values: new UserCollection()
      },

      filename: {
        label: 'GLOBALS.FILENAME',
        type: 'text',
        showInList: true,
        showOnCreate: false,
        showOnUpdate: false
      },
      table_name: {
        label: 'GLOBALS.TABLE_NAME',
        type: 'text',
        showInList: true,
        showOnCreate: false,
        showOnUpdate: false
      },

      table_id: {
        label: 'GLOBALS.TABLE_ID',
        type: 'integer',
        showInList: true,
        showOnCreate: false,
        showOnUpdate: false
      },
      mime: {
        label: 'GLOBALS.MIME',
        type: 'text',
        showInList: false,
        showOnCreate: false,
        showOnUpdate: false
      },
      vrijeme: {
        label: 'GLOBALS.FILE_TIME',
        type: 'text',
        showInList: true,
        showOnCreate: false,
        showOnUpdate: false
      },
      bytes: {
        label: 'GLOBALS.FILE',
        type: 'File',
        showInList: false,
        showOnCreate: true,
        showOnUpdate: true,
        values: new UserCollection()
      }
    }
  }

  // Attribute validation
  validation() {
    return {
      bytes: required,
      owner_username: required
    }
  }

  // Route configuration
  routes() {
    return {
      fetch: '/editFile/{id}',
      upload: '/uploadFile/{table_name}/{table_id}',
      download: '/download/{id}',
      save: '/createFile',
      patch: '/editFile',
      delete: '/deleteFile/{id}'
    }
  }

  download() {
    let config = {
      url: '/download/' + this.id,
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

export class FileCollection extends BaseCollection {
  // Model that is contained in this collection.
  model() {
    return File
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
      fetch: '/listFiles',
      fetchUser: '/getUserFiles/{username}'
    }
  }

  fetchInternshipAgreementFiles(internshipAgreementId) {
    let config = {
      url: '/getInternshipAgreementFiles/' + internshipAgreementId,
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

  fetchUser(username = null) {
    let url = '/getUserFiles'

    if (username) {
      url += '/' + username
    }
    let config = {
      url: url,
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
