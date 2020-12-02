<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card>
        <vs-input
          :danger="localHasErrors"
          :danger-text="localErrorText"
          :label="$t('USERS.PASSWORD')"
          v-model="password"
          type="password"
          class="w-full mb-5"
        />
        <vs-input
          :danger="localHasErrors1"
          :danger-text="localErrorText1"
          :label="$t('USERS.REPEAT_PASSWORD')"
          v-model="passwordRepeat"
          type="password"
          class="w-full"
        />
      </vx-card>
    </div>

    <div class="vx-col sm:w-2/2 w-full ml-auto">
      <vs-button class="mr-3 mb-2" @click="submit">{{
        $t('GLOBALS.SUBMIT')
      }}</vs-button>
    </div>
  </div>
</template>

<script>
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import { User } from '../../models/User'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    user: {
      type: User,
      required: false,

      default: () => null
    }
  },

  data() {
    return {
      localHasErrors: false,
      localErrorText: null,
      localHasErrors1: false,
      localErrorText1: this.$t('USERS.PASSWORD_MATCH_ERROR'),
      password: '',
      passwordRepeat: '',
      userObject: this.user
    }
  },
  computed: {
    checkPasswordLength() {
      return this.password.length >= 6
    },
    checkPassword() {
      return this.passwordRepeat === this.password
    },
    redirect() {
      return { name: 'profile' }
    }
  },

  watch: {
    passwordRepeat() {
      if (this.passwordRepeat === '') {
        this.localHasErrors1 = false
      }

      this.localHasErrors1 = !this.checkPassword
    }
  },

  async mounted() {},
  methods: {
    submit() {
      if (!this.checkPasswordLength) {
        this.$vs.notify({
          color: 'danger',
          title: this.$t('GLOBALS.ERROR_ON_SAVE'),
          text: this.$t('USERS.PASSWORD_LENGTH_ERROR')
        })
        return false
      }
      if (!this.checkPassword) {
        this.$vs.notify({
          color: 'danger',
          title: this.$t('GLOBALS.ERROR_ON_SAVE'),
          text: this.$t('USERS.PASSWORD_MATCH_ERROR')
        })
        return false
      }
      if (!this.userObject) {
        this.userObject = new User(this.activeUser)
      }
      this.userObject.password = this.password
      this.userObject
        .modifyUserPassword()
        .then(() => {
          this.$router.push(this.redirect)
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.PASSWORD_UPDATED'),
            text: this.$t('GLOBALS.PASSWORD_SUCCESSFULLY_UPDATED')
          })
        })
        .catch(error => {
          this.errorMessageApi(error.response)
        })
    }
  }
}
</script>
