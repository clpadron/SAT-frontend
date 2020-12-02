<!-- =========================================================================================
    File Name: TodoAddNew.vue
    Description: Add new todo component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="todo__filters-container">
    <!-- all -->
    <div class="px-6 py-4">
      <span
        :class="{ 'text-primary': notificationFilter === 'all' }"
        tag="span"
        class="flex cursor-pointer"
        @click="$emit('filter', 'all')"
      >
        <feather-icon
          :svg-classes="[
            { 'text-primary stroke-current': notificationFilter === 'all' },
            'h-6 w-6'
          ]"
          icon="LayersIcon"
        ></feather-icon>
        <span class="text-lg ml-3">All</span>
      </span>
    </div>

    <vs-divider></vs-divider>

    <!-- starred -->
    <div class="px-6 py-4">
      <h5>Filters</h5>

      <template v-for="filter in notificationFilters">
        <span
          :class="{ 'text-primary': notificationFilter === filter.filter }"
          :key="filter.filter"
          tag="span"
          class="flex mt-6 cursor-pointer"
          @click="$emit('filter', filter.filter)"
        >
          <feather-icon
            :icon="filter.icon"
            :svg-classes="[
              {
                'text-primary stroke-current':
                  notificationFilter === filter.filter
              },
              'h-6 w-6'
            ]"
          ></feather-icon>
          <span class="text-lg ml-3">{{ filter.filterName }}</span>
        </span>
      </template>
    </div>

    <!--    <vs-divider></vs-divider>-->

    <!--    <div class="px-6 py-4">-->
    <!--      <h5>Labels</h5>-->
    <!--      <div class="todo__lables-list">-->
    <!--        <router-link-->
    <!--          v-for="(tag, index) in taskTags"-->
    <!--          :key="index"-->
    <!--          :to="`${baseUrl}/${tag.value}`"-->
    <!--          tag="span"-->
    <!--          class="todo__label flex items-center mt-6 cursor-pointer"-->
    <!--        >-->
    <!--          <div-->
    <!--            :class="'border-2 border-solid border-' + tag.color"-->
    <!--            class="ml-1 h-3 w-3 rounded-full mr-4"-->
    <!--          />-->
    <!--          <span-->
    <!--            :class="{ 'text-primary': notificationFilter === tag.value }"-->
    <!--            class="text-lg"-->
    <!--            >{{ tag.text }}</span-->
    <!--          >-->
    <!--        </router-link>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
export default {
  props: {
    notificationFilter: {
      type: String,
      required: false,
      default() {
        return 'all'
      }
    }
  },
  data() {
    return {
      notificationFilters: [
        // { filterName: 'Starred', filter: 'starred', icon: 'StarIcon' },
        // { filterName: 'Important', filter: 'important', icon: 'InfoIcon' },
        { filterName: 'Read', filter: 'read', icon: '' },
        { filterName: 'Unread', filter: 'unread', icon: '' }
      ]
    }
  },
  computed: {
    // taskTags() {
    //   return this.$store.state.todo.taskTags
    // },
    // notificationFilter() {
    //   console.log(this.$route.params)
    //   return this.$route.params.filter
    // }
    // baseUrl() {
    //   const path = this.$route.path
    //   return path.slice(0, path.lastIndexOf('/'))
    // }
  },
  methods: {
    // filterNotification(filter) {
    //   this.$route.push({
    //     path: '/notifications/' + filter
    //   })
    // }
  }
}
</script>
