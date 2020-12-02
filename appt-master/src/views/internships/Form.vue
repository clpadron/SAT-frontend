<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/3 w-full mb-base">
      <vx-card>
        <template v-for="(settings, key) in internshipObject.fieldsSettings()">
          <template v-if="isVisible(settings)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="internshipObject"
              :field="key"
            />
            <v-select-box
              v-else-if="settings.type === 'form'"
              :key="key"
              :settings="settings"
              :object="internshipObject"
              :field="key"
            />
            <v-text-box
              v-else
              :key="key"
              :object="internshipObject"
              :field="key"
            />
          </template>
        </template>
        <div class="vx-row mb-6">
          <div class="vx-col  w-full">
            <vs-select
              v-model="selectedCompetences"
              :danger="hasErrors(internshipObject, 'studyCompetence')"
              :danger-text="errorText(internshipObject, 'studyCompetence')"
              :label="$t('STUDY_COMPETENCES.TITLE')"
              :multiple="true"
              class="w-full"
              autocomplete
            >
              <vs-select-item
                v-for="item in studyCompetences.models"
                :key="item.id"
                :value="item.id"
                :text="item.name"
              />
            </vs-select>
          </div>
        </div>
      </vx-card>
    </div>

    <div class="vx-col w-full mb-base">
      <div class="vx-col w-full ml-auto">
        <vs-button class="mr-3 mb-2" @click="submit">{{
          $t('GLOBALS.SUBMIT')
        }}</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Internship, InternshipCollection } from '../../models/Internship'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import {
  StudyCompetence,
  StudyCompetenceCollection
} from '../../models/StudyCompetence'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { StudyProgramCollection } from '../../models/StudyProgram'

export default {
  components: {
    VTextBox,
    VSelectBox,
    quillEditor
  },

  props: {
    internship: {
      type: Object,
      default: () => new Internship()
    },

    id: {
      type: [Number, String],
      default: () => null
    }
  },
  data() {
    return {
      internshipObject: this.internship,
      studyCompetences: new StudyCompetenceCollection(),
      selectedCompetences: [],
      studyPrograms: new StudyProgramCollection()
    }
  },

  async mounted() {
    if (!this.internshipObject.id && this.id) {
      let internships = new InternshipCollection()
      await internships.fetch()
      this.internshipObject = internships.find(
        internship => internship.id === parseInt(this.id)
      )
    }
    if (this.internshipObject.studyProgram) {
      this.studyCompetences = this.getStudyCompetencesFromStudyProgram(
        this.internshipObject.studyProgram
      )
    }

    this.internshipObject.on('change', event => {
      if (
        event.attribute === 'studyProgram' &&
        this.internshipObject.studyProgram
      ) {
        this.studyCompetences = this.getStudyCompetencesFromStudyProgram(
          this.internshipObject.studyProgram
        )
      }
    })

    this.selectedCompetences = this.internshipObject.studyCompetence.map(
      competence => competence.id
    )
  },
  methods: {
    getStudyCompetencesFromStudyProgram(studyProgram) {
      let competences = studyProgram.studyCompetences
      if (studyProgram.studyModules) {
        for (let studyModule of studyProgram.studyModules) {
          competences = competences.concat(
            studyModule.studyCompetences.map(competence => {
              competence.name = studyModule.name + ' - ' + competence.name
              return competence
            })
          )
        }
      }

      return new StudyCompetenceCollection(competences)
    },
    isVisible(settings) {
      if (this.internshipObject.id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },

    submit() {
      this.internship.studyCompetence = this.studyCompetences.filter(
        competence => this.selectedCompetences.includes(competence.id)
      )
      let action = 'save'
      if (this.internshipObject.id) {
        action = 'patch'
      }

      this.internshipObject[action]()
        .then(() => {
          this.$router.push({ name: 'internships' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(this.internshipObject)
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
