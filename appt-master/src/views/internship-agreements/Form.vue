<template>
  <div class="vx-row">
    <div class="vx-col md:w-3/3 w-full mb-base">
      <div class="vx-row">
        <div class="vx-col md:w-1/2 w-full mb-base">
          <vx-card :title="$t('GLOBALS.DETAILS')">
            <template
              v-for="(settings,
              key) in internshipAgreementObject.fieldsSettings()"
            >
              <template v-if="isVisible(settings)">
                <v-select-box
                  v-if="settings.type === 'select'"
                  :key="key"
                  :settings="settings"
                  :object="internshipAgreementObject"
                  :field="key"
                />
                <v-text-box
                  v-else
                  :key="key"
                  :object="internshipAgreementObject"
                  :field="key"
                />
              </template>
            </template>
            <div class="vx-row mb-6">
              <div class="vx-col  w-full">
                <vs-select
                  v-model="selectedCompetences"
                  :danger="hasErrors(internshipAgreementObject, 'competences')"
                  :danger-text="
                    errorText(internshipAgreementObject, 'competences')
                  "
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
      </div>
    </div>
    <div class="vx-col md:w-3/3 w-full mb-base">
      <vx-card :title="$t('ARTICLES.TITLE')">
        <span v-if="articlesHasError">{{ errorText(articles) }}</span>
        <div v-for="(article, index) in articles.models" :key="index">
          <div class="vx-row  mb-6">
            <div class="vx-col md:w-3/12 ">
              <div class="vx-row  mb-6">
                <div class="vx-col w-full">
                  <vs-input
                    :label="$t('GLOBALS.ORDER_NUMBER')"
                    v-model="article.version_num"
                    class="w-full"
                    type="text"
                  />
                </div>
                <div class="vx-col w-full">
                  <vs-input
                    :label="$t('GLOBALS.VERSION_NUMBER')"
                    v-model="article.ordnum"
                    class="w-full"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div class="vx-col md:w-8/12">
              <label class="vs-input--label">
                {{ $t('GLOBALS.CONTENT') }}
              </label>
              <quill-editor
                :options="quillOptions"
                v-model="article.content"
                style="min-height:100px;"
              />
            </div>

            <div class="vx-col  sm:w-1/12">
              <vs-button
                class="float-right"
                size="small"
                type="border"
                icon="delete"
                @click="removeArticle(article)"
              />
            </div>
          </div>
          <vs-divider />
        </div>
        <div class="vx-row mt-5">
          <div class="vx-col w-full text-right ml-auto">
            <vs-button class="" @click="addEmptyArticle()">
              Add article
            </vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-2/3 w-full ml-auto">
        <vs-button class="mr-3 mb-2" @click="submit">{{
          $t('GLOBALS.SUBMIT')
        }}</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  InternshipAgreement,
  InternshipAgreementCollection
} from '../../models/InternshipAgreement'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

import {
  AgreementArticle,
  AgreementArticleCollection
} from '../../models/AgreementArticle'
import {
  StudyCompetence,
  StudyCompetenceCollection
} from '../../models/StudyCompetence'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import {
  TemplateArticle,
  TemplateArticleCollection
} from '../../models/TemplateArticle'
import { GradeCollection } from '../../models/Grade'

export default {
  components: {
    VTextBox,
    VSelectBox,
    quillEditor
  },

  props: {
    internshipAgreement: {
      type: Object,
      default: () => new InternshipAgreement()
    },
    id: {
      type: [Number, String],
      required: false,
      default: null
    }
  },
  data() {
    return {
      articles: new AgreementArticleCollection(),
      studyCompetences: new StudyCompetenceCollection(),

      internshipAgreementObject: this.internshipAgreement,
      articlesHasError: false,
      competencesHasError: false,
      selectedCompetences: [],
      grades: null
    }
  },

  async mounted() {
    if (!this.internshipAgreementObject.id && this.id) {
      let internshipAgreements = new InternshipAgreementCollection()
      if (this.isOrganizationUser) {
        await internshipAgreements.fetchOrganization()
      } else if (this.isStudent) {
        await internshipAgreements.fetchStudent()
      } else {
        await internshipAgreements.fetch()
      }

      let $this = this
      this.internshipAgreementObject = internshipAgreements.models.find(
        internshipAgreement => internshipAgreement.id === parseInt($this.id)
      )
    }
    if (this.id) {
      this.articles.replace(this.internshipAgreementObject.articles)
    } else {
      let articles = new TemplateArticleCollection()
      await articles.fetch()
      this.articles.replace(articles.models)
    }
    if (this.internshipAgreementObject.studyProgram) {
      this.studyCompetences = this.getStudyCompetencesFromStudyProgram(
        this.internshipAgreementObject.studyProgram
      )
    }

    this.internshipAgreementObject.on('change', event => {
      if (
        event.attribute === 'studyProgram' &&
        this.internshipAgreementObject.studyProgram
      ) {
        this.studyCompetences = this.getStudyCompetencesFromStudyProgram(
          this.internshipAgreementObject.studyProgram
        )
      }
    })

    this.selectedCompetences = this.internshipAgreementObject.competences.map(
      competence => competence.id
    )
    let grades = new GradeCollection()
    await grades.fetch(this.id)
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
      if (this.internshipAgreementObject.id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },
    isSignatureVisible(settings) {
      return settings.showInSignature
    },

    addEmptyArticle() {
      this.articles.add(new AgreementArticle())
      this.$forceUpdate()
    },
    submit() {
      this.internshipAgreementObject.articles = this.articles
      this.internshipAgreementObject.competences = this.studyCompetences.filter(
        competence => this.selectedCompetences.includes(competence.id)
      )
      let action = 'save'
      if (this.internshipAgreementObject.id) {
        action = 'patch'
      }
      this.internshipAgreementObject[action]()
        .then(() => {
          this.$router.push({ name: 'internship-agreements' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(this.internshipAgreementObject)
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.ERROR_ON_SAVE'),
            text: error.message
          })
        })
    },
    remove(file) {
      file.delete()
    },

    removeArticle(article) {
      this.articles.remove(article)
      this.articles = new AgreementArticleCollection(this.articles.models)
    },
    editStudentQuestions() {
      this.$router.push({
        name: 'internship-agreements-update-student-questions',
        params: {
          id: this.id
        }
      })
    },
    editMentorQuestions() {
      this.$router.push({
        name: 'internship-agreements-update-mentor-questions',
        params: {
          id: this.id
        }
      })
    },
    editSchoolOrganizerQuestions() {
      this.$router.push({
        name: 'internship-agreements-update-school-organizer-questions',
        params: {
          id: this.id
        }
      })
    }
  }
}
</script>
