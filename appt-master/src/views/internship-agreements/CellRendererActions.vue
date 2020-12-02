<template>
  <div>
    <feather-icon
      v-if="can('view', 'InternshipAgreement')"
      icon="EyeIcon"
      svg-classes="h-5 w-5 mr-4  hover:text-primary cursor-pointer"
      @click="view(object)"
    />
    <feather-icon
      v-if="can('update', 'InternshipAgreement')"
      icon="Edit3Icon"
      svg-classes="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
      @click="edit(object)"
    />

    <feather-icon
      v-if="can('delete', 'InternshipAgreement')"
      icon="Trash2Icon"
      svg-classes="h-5 w-5 hover:text-danger cursor-pointer"
      @click="deleteInternshipAgreement(object)"
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
    deleteInternshipAgreement(internshipAgreement) {
      internshipAgreement
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
    edit(internshipAgreement) {
      this.$router.push({
        name: 'internship-agreements-edit',
        params: {
          id: internshipAgreement.id,
          internshipAgreement: internshipAgreement
        }
      })
    },

    view(internshipAgreement) {
      this.$router.push({
        name: 'internship-agreements-view',
        params: {
          id: internshipAgreement.id,
          internshipAgreement: internshipAgreement
        }
      })
    }
  }
})
</script>
