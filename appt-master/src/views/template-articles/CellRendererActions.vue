<template>
  <div>
    <feather-icon
      v-if="can('view', 'TemplateArticle')"
      icon="Edit3Icon"
      svg-classes="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
      @click="edit(object)"
    />

    <feather-icon
      v-if="can('update', 'TemplateArticle')"
      icon="EyeIcon"
      svg-classes="h-5 w-5 mr-4  hover:text-primary cursor-pointer"
      @click="view(object)"
    />

    <feather-icon
      v-if="can('delete', 'TemplateArticle')"
      icon="Trash2Icon"
      svg-classes="h-5 w-5 hover:text-danger cursor-pointer"
      @click="deleteTemplateArticle(object)"
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
    deleteTemplateArticle(templateArticle) {
      templateArticle
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
    edit(templateArticle) {
      this.$router.push({
        name: 'template-articles-edit',
        params: {
          id: templateArticle.id,
          templateArticle: templateArticle
        }
      })
    },

    view(templateArticle) {
      this.$router.push({
        name: 'template-articles-view',
        params: {
          id: templateArticle.id,
          templateArticle: templateArticle
        }
      })
    }
  }
})
</script>
