<template>
  <div class="vx-row">
    <!-- HORIZONTAL LAYOUT -->
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card>
        <template v-for="(settings, key) in studyModule.fieldsSettings()">
          <template v-if="isVisible(settings)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="studyModule"
              :field="key"
            />
            <v-text-box v-else :key="key" :object="studyModule" :field="key" />
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
import { StudyModule } from '../../models/StudyModule'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    studyModule: {
      type: Object,
      default: () => new StudyModule()
    }
  },

  mounted() {},
  methods: {
    submit() {
      this.studyModule
        .save()
        .then(() => {
          this.$router.push({ name: 'study-modules' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
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
