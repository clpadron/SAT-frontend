<template>
  <div class="vx-row">
    <!-- HORIZONTAL LAYOUT -->
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card :title="evaluationObject.name.toUpperCase()">
        <template v-for="(settings, key) in evaluationObject.fieldsSettings()">
          <div v-if="settings.showInView" :key="key" class="mb-5">
            <small>{{ $t(settings.label) }}:</small>
            <h4>{{ evaluationObject[key] }}</h4>
          </div>
        </template>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card :title="$t('STUDY_PROGRAMS.TITLE')">
        <template v-for="(studyProgram, key) in evaluationObject.studyPrograms">
          <div :key="key" class="mb-5">
            <h6>
              {{ studyProgram.name }}
              <vs-button
                v-if="can('view', 'StudyProgram')"
                class="float-right"
                size="small"
                type="border"
                icon="remove_red_eye"
                @click="viewStudyProgram(studyProgram)"
              />
            </h6>
          </div>
        </template>
      </vx-card>
    </div>
    <div v-if="can('update', 'Evaluation')" class="vx-col text-right w-full">
      <vs-button @click="edit()">{{ $t('GLOBALS.EDIT') }} </vs-button>
    </div>
  </div>
</template>

<script>
import { Evaluation, EvaluationCollection } from '../../models/Evaluation'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    evaluation: {
      type: Object,
      default: () => new Evaluation()
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      evaluationObject: this.evaluation
    }
  },

  async mounted() {
    if (!this.evaluationObject.id) {
      let evaluations = new EvaluationCollection()
      await evaluations.fetch()
      this.evaluationObject = evaluations.find(
        evaluation => evaluation.id === parseInt(this.id)
      )
    }
  },
  methods: {
    viewStudyProgram(studyProgram) {
      this.$router.push({
        name: 'study-programs-view',
        params: {
          id: studyProgram.id,
          studyProgram: studyProgram
        }
      })
    },
    edit() {
      this.$router.push({
        name: 'evaluations-edit',
        params: {
          id: this.evaluationObject.id,
          evaluation: this.evaluationObject
        }
      })
    }
  }
}
</script>
