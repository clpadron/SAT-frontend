<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    id="page-login"
    class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                src="@/assets/images/pages/login.png"
                alt="login"
                class="mx-auto"
              />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">{{ $t('GLOBALS.LOGIN') }}</h4>
                  <p>{{ $t('GLOBALS.WELCOME_BACK') }}</p>
                </div>

                <div>
                  <vs-input
                    v-model="username"
                    name="username"
                    icon-no-border
                    icon="icon icon-user"
                    icon-pack="feather"
                    label-placeholder="Username"
                    class="w-full mt-10"
                  />

                  <vs-input
                    v-model="password"
                    type="password"
                    name="password"
                    icon-no-border
                    icon="icon icon-lock"
                    icon-pack="feather"
                    label-placeholder="Password"
                    class="w-full mt-10"
                    @keyup.enter="login"
                  />
                  <vs-select
                    v-model="school"
                    :label="$t('SCHOOLS.TITLE_SINGLE')"
                    :multiple="false"
                    class="w-full mt-5"
                    autocomplete
                  >
                    <vs-select-item
                      v-for="(item, index) in schools"
                      :key="index"
                      :value="item.school_id"
                      :text="item.name"
                    />
                  </vs-select>
                  <vs-button class="mt-4" to="register" type="border"
                    >{{ $t('GLOBALS.SELF_REGISTER') }}
                  </vs-button>
                  <vs-button class="mt-4 float-right" @click="login"
                    >{{ $t('GLOBALS.LOGIN') }}
                  </vs-button>
                </div>
              </div>
            </div>
          </div>
          <div
            class="vx-row no-gutter justify-center items-center d-theme-dark-bg"
          >
            <div class="vx-col hidden lg:block p-5 lg:w-1/2">
              <img
                src="@/assets/images/common/eu_flag.jpg"
                alt="eu_flag"
                style="width: 250px"
                class="mx-auto"
              />
            </div>
            <div class="vx-col hidden text-xs p-5 lg:block lg:w-1/2">
              <p class="mb-2">
                Smart Electronic System for Tracking Apprenticeships (Apprentice
                Track)
              </p>
              <p class="mb-2">Project Ref: 2017-1-SI01-KA203-035576</p>
              <p>
                This project has been funded with support from the European
                Commission
              </p>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      school: null,
      schools: [],
      checkbox_remember_me: false,
      roles: {
        ROLE_ADMIN: 'admin',
        ROLE_SCHOOLADMIN: 'schoolAdmin',
        ROLE_SCHOOLORG: 'schoolOrganizer',
        ROLE_ORGADMIN: 'organizationAdmin',
        ROLE_MENTOR: 'mentor',
        ROLE_STUDENT: 'student'
      }
    }
  },
  mounted() {
    const domain = process.env.VUE_APP_JAGER_API
    let axios1 = axios.create({
      baseURL: domain
    })
    axios1
      .get('get-school-keys-for-login')
      .then(response => {
        this.schools = response.data
        if (this.schools.length) {
          this.school = this.schools[0].school_id
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    login() {
      this.$http
        .post('login', {
          username: this.username,
          password: this.password,
          school: this.school
        })
        .then(response => {
          let userData = response.data
          delete userData.password
          this.$store.dispatch('updateUserRole', {
            aclChangeRole: this.$acl.change,
            userRole: this.getRole(userData.roles)
          })

          this.$store.dispatch('updateUserInfo', response.data)
          this.$router.push('/')
        })
        .catch(() => {
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.CHECK_CREDENTIALS'),
            text: this.$t('GLOBALS.USERNAME_OR_PASSWORD_NOT_CORRECT')
          })
        })
    },
    getRole(role) {
      return this.roles[role[0]]
    }
  }
}
</script>
