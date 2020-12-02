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
                  <h4 class="mb-4">Login</h4>
                  <p>Welcome back, logging you in.</p>
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
export default {
  data() {
    return {
      jwt: null,
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
    this.token = this.$route.query.token
    if (this.token) {
      this.login()
    }
  },
  methods: {
    login() {
      this.$http.get('loginJWT?User=' + this.token).then(response => {
        let userData = response.data
        delete userData.password
        userData.jwt = this.token
        this.$store.dispatch('updateUserRole', {
          aclChangeRole: this.$acl.change,
          userRole: this.getRole(userData.roles)
        })

        this.$store.dispatch('updateUserInfo', response.data)
        this.$router.push('/')
      })
    },
    getRole(role) {
      return this.roles[role[0]]
    }
  }
}
</script>
