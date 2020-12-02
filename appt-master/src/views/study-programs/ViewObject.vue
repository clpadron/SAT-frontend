<template>
  <div>
    <template v-for="(settings, key) in studyProgramObject.fieldsSettings()">
      <div v-if="settings.showInView" :key="key" class="mb-5">
        <h6>{{ $t(settings.label) }}:</h6>
        <p>{{ studyProgramObject[key] }}</p>
      </div>
    </template>
  </div>
</template>

<script>
import { StudyProgram } from '../../models/StudyProgram'

export default {
  props: {
    studyProgram: {
      type: Object,
      default: () => new StudyProgram()
    },
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      studyProgramObject: this.studyProgram
    }
  },

  async mounted() {
    if (this.data) {
      this.studyProgramObject = new StudyProgram(this.data)
    } else {
      this.studyProgramObject = this.studyProgram
    }
  },
  methods: {}
}
</script>
