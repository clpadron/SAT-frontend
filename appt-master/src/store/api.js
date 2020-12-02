export const moduleApi = {
  actions: {
    async get({ commit }, payload) {
      try {
        let response = await this.$http.get(payload.url, payload.data)
        return response.data
      } catch (e) {
        commit(
          'notifications/PUSH_ALERT',
          {
            alert: e.response.data.message,
            type: 'error'
          },
          { root: true }
        )
        throw new Error(e)
      }
    },

    async delete({ commit }, payload) {
      try {
        await this.$http.delete(payload.url, payload.data)
        commit(
          'notifications/PUSH_ALERT',
          {
            alert: this.$t('GLOBALS.MSG_DELETE'),
            type: 'success'
          },
          { root: true }
        )
      } catch (e) {
        commit(
          'notifications/PUSH_ALERT',
          {
            alert: this.$t('GLOBALS.ERR_DELETE'),
            type: 'error'
          },
          { root: true }
        )
      }
    },

    async patch({ commit }, payload) {
      try {
        await this.$http.patch(payload.url, payload.data)
        commit(
          'notifications/PUSH_ALERT',
          {
            alert: this.$t('GLOBALS.MSG_UPDATE'),
            type: 'success'
          },
          { root: true }
        )
      } catch (e) {
        commit(
          'notifications/PUSH_ALERT',
          {
            alert: this.$t('GLOBALS.ERR_UPDATE'),
            type: 'error'
          },
          { root: true }
        )
      }
    },

    async post({ commit }, payload) {
      try {
        let response = await this._vm.$http.post(payload.url, payload.data)
        // commit(
        //   'notifications/PUSH_ALERT',
        //   {
        //     alert: this.$t('GLOBALS.MSG_CREATE'),
        //     type: 'success'
        //   },
        //   {root: true}
        // )
        return response.data
      } catch (e) {
        // commit(
        //   'notifications/PUSH_ALERT',
        //   {
        //     alert: this.$t('GLOBALS.ERR_CREATE'),
        //     type: 'error'
        //   },
        //   {root: true}
        // )
      }
    },

    async updateField({ commit }, payload) {
      try {
        await this.$http.patch('/update-field', payload)
        commit(
          'notifications/PUSH_ALERT',
          {
            alert: this.$t('GLOBALS.MSG_FIELD_UPDATE'),
            type: 'success'
          },
          { root: true }
        )
      } catch (e) {
        commit(
          'notifications/PUSH_ALERT',
          {
            alert: this.$t('GLOBALS.ERR_FIELD_UPATE'),
            type: 'error'
          },
          { root: true }
        )
      }
    }
  }
}
