<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card>
        <template v-for="(settings, key) in templateArticle.fieldsSettings()">
          <template v-if="isVisible(settings)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="templateArticle"
              :field="key"
            />
            <v-sub-form
              v-else-if="settings.type === 'subForm'"
              :key="key"
              :object="templateArticle"
              :field="key"
            />
            <v-text-area
              v-else-if="settings.type === 'textarea'"
              :key="key"
              :object="templateArticle"
              :field="key"
            />
            <v-text-box
              v-else
              :key="key"
              :object="templateArticle"
              :field="key"
            />
          </template>
        </template>

        <div class="vx-row">
          <div class="vx-col sm:w-2/3 w-full ml-auto">
            <vs-button class="mr-3 mb-2" @click="submit">{{
              $t('GLOBALS.SUBMIT')
            }}</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { TemplateArticle } from '../../models/TemplateArticle'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import VSubForm from '../../components/form/VSubForm'
import VTextArea from '../../components/form/VTextArea'

export default {
  components: {
    VTextBox,
    VSelectBox,
    VSubForm,
    VTextArea
  },

  props: {
    templateArticle: {
      type: Object,
      default: () => new TemplateArticle()
    }
  },

  mounted() {},
  methods: {
    isVisible(settings) {
      if (this.templateArticle.id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },
    submit() {
      let action = 'save'
      if (this.templateArticle.id) {
        action = 'patch'
      }
      this.templateArticle[action]()
        .then(() => {
          this.$router.push({ name: 'template-articles' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(this.templateArticle)
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.ERROR_ON_SAVE'),
            text: error.message
          })
        })
    }
  }
}
</script>
