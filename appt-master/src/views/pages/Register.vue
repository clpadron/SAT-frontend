<!-- =========================================================================================
    File Name: Register.vue
    Description: Register Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/register.jpg"
                alt="register"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg"
            >
              <div class="px-8 pt-8 register-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Create Account</h4>
                  <p>Fill the below form to create a new account.</p>
                </div>
                <div class="clearfix">
                  <template v-for="(settings, key) in fieldSettings">
                    <template v-if="isVisible(settings)">
                      <v-select-box
                        v-if="settings.type === 'select'"
                        :key="key"
                        :object="user"
                        :settings="settings"
                        :field="key"
                      />
                      <v-text-box
                        v-else
                        :key="key"
                        :object="user"
                        :field="key"
                      />
                    </template>
                  </template>

                  <vs-select
                    v-model="school"
                    :label="$t('SCHOOLS.TITLE_SINGLE')"
                    :multiple="false"
                    class="w-full"
                    autocomplete
                  >
                    <vs-select-item
                      v-for="(item, index) in schools"
                      :key="index"
                      :value="item"
                      :text="item.name"
                    />
                  </vs-select>
                  <vs-button to="login" type="border" class="mt-5 mb-6">{{
                    $t('GLOBALS.BACK_TO_LOGIN')
                  }}</vs-button>
                  <vs-button
                    class="float-right mt-5 mb-6"
                    @click="registerUser"
                    >{{ $t('GLOBALS.REGISTER') }}</vs-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { User } from '../../models/User'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import axios from 'axios'

export default {
  components: {
    VTextBox,
    VSelectBox
  },
  data() {
    return {
      user: new User(),
      school: null,
      schools: []
    }
  },
  computed: {
    fieldSettings() {
      return this.user.fieldsSettings()
    }
  },
  watch: {
    school() {
      this.user.school = this.school.school_id
      this.user.organization = this.school.id
    }
  },
  mounted() {
    this.user.roles.push('ROLE_STUDENT')

    const domain = process.env.VUE_APP_JAGER_API
    let axios1 = axios.create({
      baseURL: domain
    })
    axios1
      .get('get-school-key-for-registration')
      .then(response => {
        this.schools = response.data
        if (this.schools.length) {
          this.school = this.schools[0]
          this.user.school = this.schools[0].school_id
          this.user.organization = this.schools[0].id
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    isVisible(settings) {
      return settings.showOnRegister
    },

    registerUser() {
      this.user
        .register()
        .then(() => {
          this.$router.push({ name: 'page-login' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.REGISTRATION_SUCCESSFUL')
          })
        })
        .catch(error => {
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.ERROR'),
            text: error.message
          })
        })
    }
  }
}
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 517px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
