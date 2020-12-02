<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import themeConfig from '@/../themeConfig.js'

export default {
  watch: {
    '$store.state.theme'(val) {
      this.toggleClassInBody(val)
    }
  },
  mounted() {
    let refreshNumber = '2'
    if (
      !localStorage.getItem('forceRefresh') ||
      localStorage.getItem('forceRefresh') !== refreshNumber
    ) {
      localStorage.clear()
      localStorage.setItem('forceRefresh', refreshNumber)
      location.reload()
      this.$store.dispatch('updateUserRole', {
        aclChangeRole: this.$acl.change,
        role: 'public'
      })
      this.$acl.change('public')
      this.$http.get('/logout')
      // This is just for demo Purpose. If user clicks on logout -> redirect
      this.$router.push('/pages/login').catch(() => {})
    }

    this.$i18n.locale = localStorage.getItem('language')
      ? localStorage.getItem('language')
      : 'en'

    this.toggleClassInBody(themeConfig.theme)
    this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
  },
  async created() {
    window.addEventListener('resize', this.handleWindowResize)
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleClassInBody(className) {
      if (className == 'dark') {
        if (document.body.className.match('theme-semi-dark'))
          document.body.classList.remove('theme-semi-dark')
        document.body.classList.add('theme-dark')
      } else if (className == 'semi-dark') {
        if (document.body.className.match('theme-dark'))
          document.body.classList.remove('theme-dark')
        document.body.classList.add('theme-semi-dark')
      } else {
        if (document.body.className.match('theme-dark'))
          document.body.classList.remove('theme-dark')
        if (document.body.className.match('theme-semi-dark'))
          document.body.classList.remove('theme-semi-dark')
      }
    },
    handleWindowResize() {
      this.$store.commit('UPDATE_WINDOW_WIDTH', window.innerWidth)
    },
    handleScroll() {
      this.$store.commit('UPDATE_WINDOW_SCROLL_Y', window.scrollY)
    }
  }
}
</script>
