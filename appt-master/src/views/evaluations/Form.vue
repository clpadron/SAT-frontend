<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card>
        <template v-for="(settings, key) in evaluationObject.fieldsSettings()">
          <template v-if="isVisible(settings, key)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="evaluationObject"
              :field="key"
            />
            <v-text-box
              v-else
              :key="key"
              :object="evaluationObject"
              :field="key"
            />
          </template>
        </template>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card>
        <vs-select
          v-model="selectedQuestionType"
          :label="$t('GLOBALS.QUESTION_TYPE')"
          class="w-full"
          autocomplete
        >
          <vs-select-item
            v-for="type in questionTypes"
            :key="type"
            :value="type"
            :text="type"
          />
        </vs-select>

        <template v-if="showOptions">
          <div v-for="(option, key) in options" :key="key" class="vx-row">
            <vs-divider />
            <div class="vx-col md:w-11/12">
              <vs-input
                :label="$t('GLOBALS.OPTION')"
                v-model="option.value"
                class="w-full"
              />
            </div>
            <div class="vx-col md:w-1/12">
              <vs-button
                class="float-right mt-6"
                size="small"
                type="border"
                icon="delete"
                @click="removeOption(key)"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <vs-button class="mt-10 float-right" @click="addOption">{{
                $t('GLOBALS.ADD_OPTION')
              }}</vs-button>
            </div>
          </div>
        </template>
      </vx-card>
    </div>

    <div class="vx-col sm:w-3/3 w-full ml-auto">
      <vs-button class="mr-3 mb-2" @click="submit">{{
        $t('GLOBALS.SUBMIT')
      }}</vs-button>
    </div>
  </div>
</template>

<script>
import { Evaluation, EvaluationCollection } from '../../models/Evaluation'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import { StudyCompetenceCollection } from '../../models/StudyCompetence'
import { InternshipCollection } from '../../models/Internship'
import { StudyProgramCollection } from '../../models/StudyProgram'

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
      default: () => null
    }
  },
  data() {
    return {
      evaluationObject: this.evaluation,
      studyCompetences: new StudyCompetenceCollection(),
      studyPrograms: new StudyProgramCollection(),
      selectedQuestionType: 'text',
      questionTypes: ['text', 'select', 'checkbox'],
      options: []
    }
  },
  computed: {
    showOptions() {
      return (
        this.selectedQuestionType === 'select' ||
        this.selectedQuestionType === 'checkbox'
      )
    }
  },

  mounted() {
    if (!this.evaluationObject.id && this.id) {
      let evaluations = new EvaluationCollection()
      evaluations.fetch().then(() => {
        this.evaluationObject = evaluations.find(
          evaluation => evaluation.id === parseInt(this.id)
        )
      })
    }
  },

  methods: {
    isVisible(settings, key = null) {
      if (this.evaluationObject.id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },

    submit() {
      let action = 'save'
      if (this.evaluationObject.id) {
        action = 'patch'
      }
      this.evaluationObject[action]()
        .then(() => {
          this.$router.push({ name: 'evaluations' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(this.evaluationObject)
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.ERROR_ON_SAVE'),
            text: error.message
          })
        })
    },
    addOption() {
      this.options.push({
        value: ''
      })
    },

    removeOption(index) {
      this.options.splice(this.index, 1)
    }
  }
}
</script>
