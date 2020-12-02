<template>
  <div>
    <feather-icon
      v-if="can('view', 'User')"
      icon="EyeIcon"
      svg-classes="h-5 w-5 mr-4  hover:text-primary cursor-pointer"
      @click="view(object)"
    />

    <feather-icon
      v-if="canEditUser(object)"
      icon="Edit3Icon"
      svg-classes="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
      @click="edit(object)"
    />

    <feather-icon
      v-if="canDeleteUser(object)"
      icon="Trash2Icon"
      svg-classes="h-5 w-5 hover:text-danger cursor-pointer"
      @click="deleteUser(object)"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { UserCollection } from '../../models/User'

export default Vue.extend({
  computed: {
    object() {
      return this.params.data
    }
  },
  mounted() {},
  methods: {
    deleteUser(user) {
      user
        .delete()
        .then(() => {
          let users = new UserCollection()
          users.fetch()
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.DELETE_SUCCESSFUL'),
            text: this.$t('GLOBALS.DELETE_SUCCESSFUL_CONTENT')
          })
          this.params.context.componentParent.loadData()
        })
        .catch(error => {
          console.log(error)
          this.errorMessageApi(error.response)
        })
    },
    edit(user) {
      this.$router.push({
        name: 'users-edit',
        params: {
          id: user.username,
          user: user
        }
      })
    },
    view(user) {
      this.$router.push({
        name: 'users-view',
        params: {
          id: user.username,
          user: user
        }
      })
    }
  }
})
</script>
