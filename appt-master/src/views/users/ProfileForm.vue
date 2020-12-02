<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card>
        <template v-for="(settings, key) in fieldSettings">
          <template v-if="isVisible(settings)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :object="userObject"
              :settings="settings"
              :field="key"
            />
            <v-text-box v-else :key="key" :object="userObject" :field="key" />
          </template>
        </template>
      </vx-card>
    </div>

    <div class="vx-col sm:w-3/3 w-full ml-auto">
      <vs-button class="mr-3 mb-2 float-right" @click="changePassword">{{
        $t('USERS.CHANGE_PASSWORD')
      }}</vs-button>
      <vs-button class="mr-3 mb-2" @click="submit">{{
        $t('GLOBALS.SUBMIT')
      }}</vs-button>
    </div>
  </div>
</template>

<script>
import { User } from '../../models/User'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },
  data() {
    return {
      userObject: null
    }
  },
  computed: {
    fieldSettings() {
      if (!this.userObject) {
        return []
      }
      return this.userObject.fieldsSettings()
    },
    redirect() {
      return { name: 'profile' }
    }
  },

  mounted() {
    this.userObject = new User(this.activeUser)
  },
  methods: {
    setUserData() {
      this.userObject = new User(this.activeUser)
    },

    isVisible(settings) {
      return settings.showOnSelfUpdate
    },
    submit() {
      this.userObject
        .modifyUser()
        .then(() => {
          let updatedUser = {}
          for (let [key, settings] of Object.entries(this.fieldSettings)) {
            if (this.isVisible(settings)) {
              updatedUser[key] = this.userObject[key]
            }
          }
          this.$store.dispatch('updateUserInfo', updatedUser)
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.PROFILE_UPDATED'),
            text: this.$t('GLOBALS.PROFILE_SUCCESSFULLY_UPDATED')
          })
          this.$router.push(this.redirect)
        })
        .catch(error => {
          this.errorMessageApi(error.response)
        })
    },
    changePassword() {
      this.$router.push({
        name: 'users-change-password',
        params: {
          user: this.userObject
        }
      })
    }
  }
}
</script>
