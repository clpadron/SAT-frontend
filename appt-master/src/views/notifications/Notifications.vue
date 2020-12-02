<!-- =========================================================================================
  File Name: Todo.vue
  Description: Todo Application to keep you ahead of time
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    id="todo-app"
    style="min-height: 400px"
    class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden"
  >
    <vs-sidebar
      :click-not-close="clickNotClose"
      :hidden-background="clickNotClose"
      v-model="isSidebarActive"
      class="items-no-padding"
      parent="#todo-app"
    >
      <!--      <todo-add-new />-->

      <component
        :is="scrollbarTag"
        :settings="settings"
        :key="$vs.rtl"
        class="todo-scroll-area"
      >
        <notification-filters
          :notification-filter="notificationFilter"
          @filter="filterNotifications"
          @closeSidebar="toggleTodoSidebar"
        ></notification-filters>
      </component>
    </vs-sidebar>
    <div
      :class="{ 'sidebar-spacer': clickNotClose }"
      class="no-scroll-content border border-r-0 border-b-0 border-t-0 border-solid d-theme-border-grey-light no-scroll-content"
    >
      <div
        class="flex d-theme-dark-bg items-center border border-l-0 border-r-0 border-t-0 border-solid d-theme-border-grey-light"
      >
        <!-- TOGGLE SIDEBAR BUTTON -->
        <feather-icon
          class="md:inline-flex lg:hidden ml-4 mr-4 cursor-pointer"
          icon="MenuIcon"
          @click.stop="toggleTodoSidebar(true)"
        />

        <!-- SEARCH BAR -->
        <vs-input
          v-model="searchQuery"
          icon-no-border
          size="large"
          icon-pack="feather"
          icon="icon-search"
          placeholder="Search..."
          class="vs-input-no-border vs-input-no-shdow-focus w-full"
        />
      </div>

      <!-- TODO LIST -->
      <component
        ref="taskListPS"
        :is="scrollbarTag"
        :settings="settings"
        :key="$vs.rtl"
        class="todo-content-scroll-area"
      >
        <transition-group
          class="todo-list"
          name="list-enter-up"
          tag="ul"
          appear
        >
          <li
            v-for="(notification, index) in notifications.models"
            :key="String(currFilter) + notification.id"
            :style="[{ transitionDelay: index * 0.1 + 's' }]"
            class="cursor-pointer todo_todo-item"
          >
            <todo-task
              :notification="notification"
              :key="String(notification.title) + String(notification.desc)"
              @showDisplayPrompt="showDisplayPrompt($event)"
            />
            <!--
                        Note: Remove "todo-task" component's key just concat lastUpdated field in li key list.
                        e.g. <li class="..." v-for="..." :key="String(currFilter) + String(task.id) + String(task.lastUpdated)" .. >
                        -->
          </li>
        </transition-group>
      </component>
      <!-- /TODO LIST -->
    </div>

    <!-- EDIT TODO DIALOG -->
    <!--    <todo-edit-->
    <!--      v-if="displayPrompt"-->
    <!--      :display-prompt="displayPrompt"-->
    <!--      :task-id="taskIdToEdit"-->
    <!--      @hideDisplayPrompt="hidePrompt"-->
    <!--    ></todo-edit>-->
  </div>
</template>

<script>
import moduleTodo from '../../store/todo/moduleTodo.js'
// import TodoAddNew from './TodoAddNew.vue'
import TodoTask from './TodoTask.vue'
import NotificationFilters from './NotificationFilters.vue'
// import TodoEdit from './TodoEdit.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { NotificationCollection } from '../../models/Notification'

export default {
  components: {
    // TodoAddNew,
    TodoTask,
    NotificationFilters,
    // TodoEdit,
    VuePerfectScrollbar
  },
  data() {
    return {
      currFilter: '',
      searchQuery: '',
      notificationFilter: 'all',
      clickNotClose: true,
      displayPrompt: false,
      taskIdToEdit: 0,
      notifications: new NotificationCollection(),
      isSidebarActive: true,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.3
      }
    }
  },
  computed: {
    todo() {
      return this.$store.state.todo.todoArray
    },
    // todoFilter() {
    //   return this.$route.params.filter
    // },
    taskList() {
      return this.$store.getters['todo/queriedTasks']
    },
    // searchQuery: {
    //   get() {
    //     return this.$store.state.todo.todoSearchQuery
    //   },
    //   set(val) {
    //     this.$store.dispatch('todo/setTodoSearchQuery', val)
    //   }
    // },
    scrollbarTag() {
      return this.$store.getters.scrollbarTag
    },
    windowWidth() {
      return this.$store.state.windowWidth
    }
  },
  watch: {
    notificationFilter() {
      // const scroll_el = this.$refs.taskListPS.$el || this.$refs.taskListPS
      // scroll_el.scrollTop = 0

      // this.toggleTodoSidebar()

      // Fetch Tasks
      if (this.notificationFilter === 'unread') {
        this.notifications.fetchUnread(this.activeUser.username)
      } else if (this.notificationFilter === 'read') {
        this.notifications.fetchRead(this.activeUser.username)
      } else {
        this.notifications.fetchAll(this.activeUser.username)
      }
    }
    // windowWidth() {
    //   this.setSidebarWidth()
    // }
  },
  created() {
    // this.$store.registerModule('todo', moduleTodo)
    // this.setSidebarWidth()
    //
    // const filter = this.$route.params.filter
    //
    // // Fetch Tasks
    // this.$store.dispatch('todo/fetchTasks', { filter })
    // this.$store.commit('todo/UPDATE_TODO_FILTER', filter)
    //
    // // Fetch Tags
    // this.$store.dispatch('todo/fetchTags')
    this.notifications.fetchAll(this.activeUser.username)
  },
  beforeUpdate() {
    // this.currFilter = this.$route.params.filter
  },
  beforeDestroy() {
    // this.$store.unregisterModule('todo')
  },
  mounted() {
    // this.$store.dispatch('todo/setTodoSearchQuery', '')
  },
  methods: {
    showDisplayPrompt(itemId) {
      this.taskIdToEdit = itemId
      this.displayPrompt = true
    },
    hidePrompt() {
      this.displayPrompt = false
    },
    setSidebarWidth() {
      if (this.windowWidth < 992) {
        this.isSidebarActive = this.clickNotClose = false
      } else {
        this.isSidebarActive = this.clickNotClose = true
      }
    },
    toggleTodoSidebar(value = false) {
      if (!value && this.clickNotClose) return
      this.isSidebarActive = value
    },
    filterNotifications(filter) {
      this.notificationFilter = filter
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/vuexy/apps/todo.scss';
</style>
