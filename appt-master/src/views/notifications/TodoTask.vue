<!-- =========================================================================================
    File Name: TodoItem.vue
    Description: Single todo item component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="px-4 py-4 list-item-component" @click="displayPrompt">
    <div class="vx-row">
      <div
        class="vx-col w-full sm:w-5/6 flex sm:items-center sm:flex-row flex-col"
      >
        <div class="flex items-center">
          <!--          <vs-checkbox-->
          <!--            v-model="isRead"-->
          <!--            class="w-8 m-0 vs-checkbox-small"-->
          <!--            @click.stop-->
          <!--          />-->
          <h6
            :class="{ 'line-through': notification.isCompleted }"
            class="todo-title"
          >
            {{ getInfo(notification) }}
          </h6>
        </div>
        <div class="todo-tags sm:ml-2 sm:my-0 my-2 flex">
          <vs-chip v-for="(tag, index) in notification.tags" :key="index">
            <div
              :class="'bg-' + todoLabelColor(tag)"
              class="h-2 w-2 rounded-full mr-1"
            ></div>
            <span>{{ tag | capitalize }}</span>
          </vs-chip>
        </div>
      </div>

      <div class="vx-col w-full sm:w-1/6 ml-auto flex sm:justify-end">
        <!--        <feather-icon-->
        <!--          icon="InfoIcon"-->
        <!--          class="cursor-pointer"-->
        <!--          :svgClasses="[-->
        <!--            { 'text-success stroke-current': notification.isImportant },-->
        <!--            'w-5',-->
        <!--            'h-5 mr-4'-->
        <!--          ]"-->
        <!--          @click.stop="toggleIsImportant"-->
        <!--        />-->

        <!--        <feather-icon-->
        <!--          icon="StarIcon"-->
        <!--          class="cursor-pointer"-->
        <!--          :svgClasses="[-->
        <!--            { 'text-warning stroke-current': notification.isStarred },-->
        <!--            'w-5',-->
        <!--            'h-5 mr-4'-->
        <!--          ]"-->
        <!--          @click.stop="toggleIsStarred"-->
        <!--        />-->
        <vx-tooltip
          :title="$t('GLOBALS.MARK_AS_READ')"
          class="inline-block mr-2"
          color="success"
        >
          <feather-icon
            v-if="!isRead"
            :title="$t('GLOBALS.MARK_AS_READ')"
            icon="CheckCircleIcon"
            class="cursor-pointer"
            svg-classes="w-5 h-5 mr-4"
            @click.stop="markAsRead"
          />
        </vx-tooltip>
        <vx-tooltip
          :title="$t('GLOBALS.DELETE_NOTIFICATION')"
          class="inline-block mr-2"
          color="success"
        >
          <feather-icon
            v-if="!notification.isTrashed"
            :title="$t('NOTIFICATIONS.DELETE')"
            icon="TrashIcon"
            class="cursor-pointer"
            svg-classes="w-5 h-5"
            @click.stop="moveToTrash"
          />
        </vx-tooltip>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <p :class="{ 'line-through': isRead }" class="mt-2 truncate">
          {{ getInfo(notification) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      // taskLocal: this.$store.getters['todo/getTask'](this.taskId)
    }
  },
  computed: {
    isRead() {
      return this.notification.read_at !== null
    },
    todoLabelColor() {
      // return label => {
      //   const tags = this.$store.state.todo.taskTags
      //   return tags.find(tag => {
      //     return tag.value === label
      //   }).color
      // }
    }
  },
  methods: {
    toggleIsImportant() {
      this.$store
        .dispatch(
          'todo/updateTask',
          Object.assign({}, this.taskLocal, {
            isImportant: !this.taskLocal.isImportant
          })
        )
        .then(response => {
          this.taskLocal.isImportant = response.data.isImportant
        })
        .catch(error => {
          console.error(error)
        })
    },
    toggleIsStarred() {
      this.$store
        .dispatch(
          'todo/updateTask',
          Object.assign({}, this.taskLocal, {
            isStarred: !this.taskLocal.isStarred
          })
        )
        .then(response => {
          this.taskLocal.isStarred = response.data.isStarred
        })
        .catch(error => {
          console.error(error)
        })
    },
    markAsRead() {
      this.notification.markAsRead(this.activeUser.username)
      this.$vs.notify({
        color: 'success',
        title: this.$t('GLOBALS.NOTIFICATION_MARKED_AS_READ')
      })
    },
    moveToTrash() {
      this.notification.delete(this.activeUser.username)
      this.$vs.notify({
        color: 'success',
        title: this.$t('GLOBALS.NOTIFICATION_DELETED')
      })
    },
    displayPrompt() {
      this.$emit('showDisplayPrompt', this.taskId)
    },
    getInfo(notification) {
      return notification.data.info
    }
  }
}
</script>
