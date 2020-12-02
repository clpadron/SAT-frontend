<!-- =========================================================================================
    File Name: VerticalNavMenuItem.vue
    Description: Vertical NavMenu item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VerticalNavMenuItem
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    :class="[
      { 'vs-sidebar-item-active': activeLink },
      { 'disabled-item pointer-events-none': isDisabled }
    ]"
    class="vs-sidebar--item"
  >
    <router-link
      v-if="to"
      :class="[{ 'router-link-active': activeLink }]"
      :to="to"
      :target="target"
      exact
    >
      <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
      <feather-icon v-else :class="{ 'w-3 h-3': iconSmall }" :icon="icon" />
      <slot />
    </router-link>

    <a v-else :target="target" :href="href">
      <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" />
      <feather-icon v-else :class="{ 'w-3 h-3': iconSmall }" :icon="icon" />
      <slot />
    </a>
  </div>
</template>

<script>
export default {
  name: 'VNavMenuItem',
  props: {
    icon: { type: String, default: '' },
    iconSmall: { type: Boolean, default: false },
    iconPack: { type: String, default: 'material-icons' },
    href: { type: [String, null], default: '#' },
    to: { type: [String, Object, null], default: null },
    slug: { type: String, default: null },
    index: { type: [String, Number], default: null },
    featherIcon: { type: Boolean, default: false },
    target: { type: String, default: '_self' },
    isDisabled: { type: Boolean, default: false }
  },
  computed: {
    activeLink() {
      return this.to == this.$route.path ||
        (this.$route.meta.parent == this.slug && this.to)
        ? true
        : false
    }
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.v-nav-menu .vs-sidebar--item > a.router-link-active > i {
  color: white;
  font-size: 16px;
}
.v-nav-menu .ps-container > .vs-sidebar--item > a.router-link-active > i {
  color: white;
}
.v-nav-menu .ps-container > .vs-sidebar--item > a > i {
  font-size: 24px;
}
</style>
