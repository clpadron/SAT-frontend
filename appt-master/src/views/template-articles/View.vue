<template>
  <div class="vx-row">
    <!-- HORIZONTAL LAYOUT -->
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card :title="templateArticleObject.name">
        <template v-for="(settings, key) in templateArticle.fieldsSettings()">
          <div v-if="settings.showInView" :key="key" class="mb-5">
            <h6>{{ $t(settings.label) }}:</h6>
            <p>{{ templateArticleObject[key] }}</p>
          </div>
        </template>
      </vx-card>
    </div>
    <div
      v-if="can('update', 'TemplateArticle')"
      class="vx-col text-right w-full"
    >
      <vs-button @click="edit()">{{ $t('GLOBALS.EDIT') }} </vs-button>
    </div>
  </div>
</template>

<script>
import {
  TemplateArticle,
  TemplateArticleCollection
} from '../../models/TemplateArticle'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    templateArticle: {
      type: Object,
      default: () => new TemplateArticle()
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      templateArticleObject: this.templateArticle
    }
  },

  async mounted() {
    if (!this.templateArticleObject.id) {
      let templateArticles = new TemplateArticleCollection()
      await templateArticles.fetch()
      this.templateArticleObject = templateArticles.find(
        templateArticle => templateArticle.id === parseInt(this.id)
      )
    }
  },
  methods: {
    edit() {
      this.$router.push({
        name: 'template-articles-edit',
        params: {
          id: this.templateArticleObject.id,
          studyProgram: this.templateArticleObject
        }
      })
    }
  }
}
</script>
