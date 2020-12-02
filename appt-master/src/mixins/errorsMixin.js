export default {
  methods: {
    hasErrors(object, field) {
      let errors = object.getErrors()
      if (!errors[field]) {
        return false
      }
      return !!errors[field].length
    },
    errorText(object, field) {
      if (!this.hasErrors(object, field)) {
        return ''
      }
      let errors = object.getErrors()
      if (typeof errors[field] === 'string') {
        return errors[field]
      }

      return errors[field][0]
    },
    errorMessageApi(error) {
      let title = this.$t('GLOBALS.ERROR_ON_SAVE')
      let message = error.message
      if (error.response.status === 403) {
        message = this.$t('GLOBALS.PERMISSION_ISSUE')
      }
      this.$vs.notify({
        color: 'danger',
        title: title,
        text: message
      })
    },
    errorMessage(title = null, content = null) {
      if (!title) {
        title = this.$t('GLOBALS.OPERATION_FAILED')
      }
      this.$vs.notify({
        color: 'danger',
        title: title,
        text: content
      })
    },
    showValidationErrors(object) {
      for (const [key, value] of Object.entries(object.getErrors())) {
        if (typeof value === 'string') {
          this.$vs.notify({
            color: 'danger',
            title: `${key} is ${value}`
          })
        }
        if (typeof value === 'object') {
          for (const [key1, value1] of Object.entries(value)) {
            if (key1 === 'organization') {
              this.$vs.notify({
                color: 'danger',
                title: `User does not have organization`
              })
            } else {
              this.$vs.notify({
                color: 'danger',
                title: `${key1} in one of the relation is ${value1}`
              })
            }
          }
        }
      }
    },
    successMessage(title = null, content = null) {
      if (!title) {
        title = this.$t('GLOBALS.OPERATION_SUCCESSFUL')
      }
      this.$vs.notify({
        color: 'success',
        title: title,
        text: content
      })
    },
    infoMessage(title, content = null) {
      this.$vs.notify({
        color: 'info',
        title: title,
        text: content
      })
    }
  }
}
