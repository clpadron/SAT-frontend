<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card>
        <template v-for="(settings, key) in school.fieldsSettings()">
          <template v-if="isVisible(settings)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="school"
              :field="key"
            />
            <v-text-box v-else :key="key" :object="school" :field="key" />
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
import { School } from '../../models/School'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    school: {
      type: Object,
      default: () => new School()
    }
  },

  mounted() {},
  methods: {
    isVisible(settings) {
      if (this.school.id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },
    submit() {
      let action = 'save'
      if (this.school.id) {
        action = 'patch'
      }

      this.school[action]()
        .then(() => {
          this.$router.push({ name: 'schools' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(this.school)
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
