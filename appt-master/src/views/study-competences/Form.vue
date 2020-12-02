<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card>
        <template v-for="(settings, key) in studyCompetence.fieldsSettings()">
          <template v-if="isVisible(settings)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="studyCompetence"
              :field="key"
            />
            <v-text-box
              v-else
              :key="key"
              :object="studyCompetence"
              :field="key"
            />
          </template>
        </template>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { StudyCompetence } from '../../models/StudyCompetence'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    studyCompetence: {
      type: Object,
      default: () => new StudyCompetence()
    }
  }
}
</script>
