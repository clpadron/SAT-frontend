<template>
  <div>
    <feather-icon
      v-if="can('view', 'StudyProgram')"
      icon="Edit3Icon"
      svg-classes="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
      @click="edit(object)"
    />

    <feather-icon
      v-if="can('update', 'StudyProgram')"
      icon="EyeIcon"
      svg-classes="h-5 w-5 mr-4  hover:text-primary cursor-pointer"
      @click="view(object)"
    />

    <feather-icon
      v-if="can('delete', 'StudyProgram')"
      icon="Trash2Icon"
      svg-classes="h-5 w-5 hover:text-danger cursor-pointer"
      @click="deleteStudyProgram(object)"
    />
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  computed: {
    object() {
      return this.params.data
    }
  },
  methods: {
    deleteStudyProgram(studyProgram) {
      studyProgram
        .delete()
        .then(() => {
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.DELETE_SUCCESSFUL'),
            text: this.$t('GLOBALS.DELETE_SUCCESSFUL_CONTENT')
          })
          this.params.context.componentParent.loadData()
        })
        .catch(error => {
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.SOMETHING_WENT_WRONG'),
            text: error.message
          })
        })
    },
    edit(studyProgram) {
      this.$router.push({
        name: 'study-programs-edit',
        params: {
          id: studyProgram.id,
          studyProgram: studyProgram
        }
      })
    },

    view(studyProgram) {
      this.$router.push({
        name: 'study-programs-view',
        params: {
          id: studyProgram.id,
          studyProgram: studyProgram
        }
      })
    }
  }
})
</script>
