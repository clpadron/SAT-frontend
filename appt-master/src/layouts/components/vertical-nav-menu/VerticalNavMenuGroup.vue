<!-- =========================================================================================
	File Name: VerticalNavMenuGroup.vue
	Description: Vertical NavMenu Group Component. Extends vuesax framework's 'vs-sidebar-group' component
	Component Name: VerticalNavMenuGroup
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    :class="[
      { 'vs-sidebar-group-open': openItems },
      { 'vs-sidebar-group-active': open },
      { 'disabled-item pointer-events-none': group.isDisabled }
    ]"
    class="vs-sidebar-group"
    @mouseover="mouseover"
    @mouseout="mouseout"
  >
    <!-- Group Label -->
    <div class="group-header w-full" @click="clickGroup">
      <span class="flex items-center w-full">
        <!-- Group Icon -->
        <i
          v-if="group.icon || this.groupIndex > Math.floor(this.groupIndex)"
          :icon="group.icon || 'panorama_fish_eye'"
          :svgClasses="{ 'w-3 h-3': this.groupIndex % 1 != 0 }"
          class="material-icons group-item"
          >{{ group.icon }}</i
        >

        <!-- Group Name -->
        <span
          v-show="!verticalNavMenuItemsMin"
          class="truncate mr-3 select-none"
          >{{ $t(group.name) }}</span
        >

        <!-- Group Tag -->
        <vs-chip
          v-if="group.tag && !verticalNavMenuItemsMin"
          :color="group.tagColor"
          class="ml-auto mr-4"
          >{{ group.tag }}</vs-chip
        >
      </span>

      <!-- Group Collapse Icon -->
      <feather-icon
        v-show="!verticalNavMenuItemsMin"
        :class="[{ rotate90: openItems }, 'feather-grp-header-arrow']"
        icon="ChevronRightIcon"
        svg-classes="w-4 h-4"
      />

      <!-- Group Tooltip -->
      <span class="vs-sidebar--tooltip">{{ group.name }}</span>
    </div>
    <!-- /Group Label -->

    <!-- Group Items -->
    <ul ref="items" :style="styleItems" class="vs-sidebar-group-items">
      <template v-for="(groupItem, index) in group.submenu">
        <li v-if="checkRole(groupItem.roles)" :key="index">
          <!-- If item is group -->
          <v-nav-menu-group
            v-if="groupItem.submenu"
            :group="groupItem"
            :group-index="Number(`${groupIndex}.${index}`)"
            :open="isGroupActive(groupItem)"
            :open-hover="openHover"
          />

          <!-- Else: Item -->
          <v-nav-menu-item
            v-else
            :index="groupIndex + '.' + index"
            :to="groupItem.slug !== 'external' ? groupItem.url : null"
            :href="groupItem.slug === 'external' ? groupItem.url : null"
            :icon="itemIcon(groupIndex + '.' + index)"
            :slug="groupItem.slug"
            :target="groupItem.target"
            icon-small
          >
            <span class="truncate">{{ $t(groupItem.name) }}</span>
            <vs-chip
              v-if="groupItem.tag"
              :color="groupItem.tagColor"
              class="ml-auto"
              >{{ groupItem.tag }}</vs-chip
            >
          </v-nav-menu-item>
        </li>
      </template>
    </ul>
    <!-- /Group Items -->
  </div>
</template>

<script>
import VNavMenuItem from './VerticalNavMenuItem.vue'

export default {
  name: 'VNavMenuGroup',
  components: {
    VNavMenuItem
  },
  props: {
    openHover: { type: Boolean, default: false },
    open: { type: Boolean, default: false },
    group: { type: Object },
    groupIndex: { type: Number }
  },
  data: () => ({
    maxHeight: '0px',
    openItems: false
  }),
  computed: {
    verticalNavMenuItemsMin() {
      return this.$store.state.verticalNavMenuItemsMin
    },
    styleItems() {
      return { maxHeight: this.maxHeight }
    },
    itemIcon() {
      return index => {
        if (!((index.match(/\./g) || []).length > 1)) return 'panorama_fish_eye'
      }
    },
    isGroupActive() {
      return item => {
        const path = this.$route.fullPath
        let open = false
        const routeParent = this.$route.meta
          ? this.$route.meta.parent
          : undefined

        let func = item => {
          if (item.submenu) {
            item.submenu.forEach(item => {
              if ((path == item.url || routeParent == item.slug) && item.url) {
                open = true
              } else if (item.submenu) {
                func(item)
              }
            })
          }
        }

        func(item)
        return open
      }
    }
  },
  watch: {
    // OPEN & CLOSES DROPDOWN ON ROUTE CHANGE
    $route() {
      if (this.verticalNavMenuItemsMin) return

      let scrollHeight = this.scrollHeight

      // Collapse Group
      if (this.openItems && !this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = `${0}px`
        }, 50)

        // Expand Group
      } else if (this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = 'none'
        }, 300)
      }
    },
    maxHeight() {
      this.openItems = this.maxHeight != '0px'
    },
    // OPEN AND CLOSES DROPDOWN MENU ON NavMenu COLLAPSE AND DEFAULT VIEW
    '$store.state.verticalNavMenuItemsMin'(val) {
      let scrollHeight = this.$refs.items.scrollHeight

      if (!val && this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = 'none'
        }, 300)
      } else {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = '0px'
        }, 50)
      }
      if (val && this.open) {
        this.maxHeight = `${scrollHeight}px`
        setTimeout(() => {
          this.maxHeight = '0px'
        }, 250)
      }
    }
  },
  mounted() {
    this.openItems = this.open
    if (this.open) {
      this.maxHeight = 'none'
    }
  },
  methods: {
    checkRole(roles) {
      if (!roles && !roles.length) {
        return true
      }

      for (let role of roles) {
        if (this.$acl.check(role)) {
          return true
        }
      }
      return false
    },
    clickGroup() {
      if (!this.openHover) {
        let thisScrollHeight = this.$refs.items.scrollHeight

        if (this.maxHeight == '0px') {
          this.maxHeight = `${thisScrollHeight}px`
          setTimeout(() => {
            this.maxHeight = 'none'
          }, 300)
        } else {
          this.maxHeight = `${thisScrollHeight}px`
          setTimeout(() => {
            this.maxHeight = `${0}px`
          }, 50)
        }

        this.$parent.$children.map(child => {
          if (child.isGroupActive) {
            if (child !== this && !child.open && child.maxHeight != '0px') {
              setTimeout(() => {
                child.maxHeight = `${0}px`
              }, 50)
            }
          }
        })
      }
    },
    mouseover() {
      if (this.openHover) {
        let scrollHeight = this.$refs.items.scrollHeight
        this.maxHeight = `${scrollHeight}px`
      }
    },
    mouseout() {
      if (this.openHover) {
        let scrollHeight = 0
        this.maxHeight = `${scrollHeight}px`
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/vuexy/components/verticalNavMenuGroup.scss';

.material-icons.group-item {
  margin-right: 10px;
}
</style>
