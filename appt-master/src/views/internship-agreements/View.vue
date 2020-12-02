<template>
  <div class="vx-row">
    <div class="vx-col md:w-3/3 w-full mb-base">
      <div class="vx-row">
        <div class="vx-col md:w-1/3 w-full mb-base">
          <vx-card :title="$t('GLOBALS.DETAILS')">
            <template
              v-for="(settings,
              key) in internshipAgreementObject.fieldsSettings()"
            >
              <div v-if="settings.showInView" :key="key" class="mb-5">
                <h6 class="mb-2">{{ $t(settings.label) }}:</h6>
                <p v-if="!internshipAgreementObject[key]">
                  /
                </p>
                <p v-else-if="settings.type === 'date'">
                  {{
                    new Date(internshipAgreementObject[key])
                      | moment('DD.MM.YYYY hh:mm')
                  }}
                </p>
                <p
                  v-else-if="typeof internshipAgreementObject[key] === 'object'"
                >
                  <vs-collapse class="small">
                    <vs-collapse-item>
                      <div slot="header">
                        {{ getChildObjectNiceName(key) }}
                      </div>
                      <view-object
                        :data="internshipAgreementObject[key]"
                      ></view-object>
                    </vs-collapse-item>
                  </vs-collapse>
                </p>
                <p v-else>
                  {{ internshipAgreementObject[key] }}
                </p>
              </div>
            </template>
          </vx-card>
        </div>
        <div class="vx-col md:w-1/3 w-full mb-base">
          <vx-card :title="$t('GLOBALS.SIGNATURES')">
            <template
              v-for="(settings,
              key) in internshipAgreementObject.fieldsSettings()"
            >
              <div v-if="settings.showInSignature" :key="key" class="mb-5">
                <h6>{{ $t(settings.label) }}:</h6>
                <p v-if="!internshipAgreementObject[key]">
                  /
                </p>
                <p v-else-if="settings.type === 'date'">
                  {{
                    new Date(internshipAgreementObject[key])
                      | moment('DD.MM.YYYY hh:mm')
                  }}
                </p>
                <p v-else>
                  {{ internshipAgreementObject[key] }}
                </p>
              </div>
            </template>
          </vx-card>
        </div>
        <div class="vx-col md:w-1/3 w-full">
          <vx-card v-if="isOwner" :title="$t('GLOBALS.FILE_UPLOADS')">
            <p>
              <vue-dropzone
                v-if="can('upload', 'InternshipAgreement')"
                id="dropzone"
                ref="myDropzoneInstance"
                :options="
                  isSchoolOrganizer || isSchoolAdmin
                    ? dropzoneOptionsAdmin
                    : dropzoneOptions
                "
                @vdropzone-success="sent"
                @vdropzone-error="error"
              />
            </p>
            <div class="mt-5">
              <div
                v-for="file of files.models"
                :key="file.id"
                class="mt-1 clearfix"
              >
                {{ file.filename }}
                <vs-button
                  v-if="can('update', 'InternshipAgreement')"
                  class="inline-block mr-2 float-right"
                  size="small"
                  type="border"
                  icon="delete"
                  @click="remove(file)"
                />
                <a
                  :href="downloadLink + file.id"
                  class="inline-block mr-2 float-right"
                  target="_blank"
                >
                  <vs-button size="small" type="border" icon="cloud_download" />
                </a>

                <vs-button
                  v-if="can('comment', 'InternshipAgreement')"
                  class="inline-block mr-2 float-right"
                  size="small"
                  type="border"
                  icon="comment"
                  @click="openCommentPopup(file)"
                />
              </div>
              <p v-if="files.length === 0">{{ $t('GLOBALS.NO_UPLOADS') }}</p>
            </div>
          </vx-card>
          <vx-card
            v-if="isOwner"
            :title="$t('GLOBALS.STUDENT_FILES')"
            class="mt-5"
          >
            <div class="mt-5">
              <div
                v-for="file of studentFiles.models"
                :key="file.id"
                class="mt-4"
              >
                {{ file.filename }}
                <a
                  :href="downloadLink + file.id"
                  class="inline-block mr-2 float-right"
                  target="_blank"
                >
                  <vs-button size="small" type="border" icon="cloud_download" />
                </a>
              </div>
              <p v-if="studentFiles.length === 0">
                {{ $t('GLOBALS.NO_UPLOADS') }}
              </p>
            </div>
          </vx-card>
          <vx-card :title="$t('GLOBALS.ACTIONS')" class="mt-5">
            <div class="mt-5">
              <vs-button
                v-if="
                  (isOwner || isSchoolAdmin) &&
                    can('sign', 'InternshipAgreement')
                "
                :disabled="alreadySigned || !studentAndMentorAlreadySigned"
                class="mb-2 w-full"
                size="small"
                type="border"
                icon="edit"
                @click="sign"
                >{{ signLabel }}</vs-button
              >
            </div>
            <div class="mt-5">
              <vs-button
                v-if="isOwner && can('evaluate', 'InternshipAgreement')"
                :disabled="alreadyAnswered"
                class="mb-2 w-full"
                size="small"
                type="border"
                icon="edit"
                @click="activeEvaluatePopup = true"
                >{{ $t('GLOBALS.EVALUATE') }}</vs-button
              >
            </div>
            <div class="mt-5">
              <vs-button
                class="mb-2 w-full"
                size="small"
                type="border"
                icon="edit"
                @click="activeArticlesPopup = true"
                >{{ $t('GLOBALS.VIEW_ARTICLES') }}</vs-button
              >
            </div>
            <div class="mt-5">
              <vs-button
                :disabled="!alreadyAnsweredSchoolOrganizer"
                class="mb-2 w-full"
                size="small"
                type="border"
                icon="edit"
                @click="activeViewAnswersSchoolOrganizerPopup = true"
                >{{ $t('GLOBALS.VIEW_ANSWERS_OF_SCHOOL_ORGANIZER') }}</vs-button
              >
            </div>
            <div class="mt-5">
              <vs-button
                :disabled="!alreadyAnsweredStudent"
                class="mb-2 w-full"
                size="small"
                type="border"
                icon="edit"
                @click="activeViewAnswersStudentPopup = true"
                >{{ $t('GLOBALS.VIEW_ANSWERS_OF_STUDENT') }}</vs-button
              >
            </div>
            <div class="mt-5">
              <vs-button
                :disabled="!alreadyAnsweredMentor"
                class="mb-2 w-full"
                size="small"
                type="border"
                icon="edit"
                @click="activeViewAnswersMentorPopup = true"
                >{{ $t('GLOBALS.VIEW_ANSWERS_OF_MENTOR') }}</vs-button
              >
            </div>
            <div class="mt-5">
              <vs-button
                class="mb-2 w-full"
                size="small"
                type="border"
                icon="print"
                @click="print()"
                >{{ $t('GLOBALS.PRINT') }}
              </vs-button>
            </div>
          </vx-card>
        </div>
      </div>
      <div class="vx-row mt-5">
        <div class="vx-col w-full mb-base">
          <vx-card :title="$t('COMPETENCES.TITLE')">
            <template v-for="(grade, key) in gradesCollection.models">
              <div :key="key">
                <div class="mb-5 vx-row">
                  <div class="vx-col w-10/12 mb-base">
                    <h6>{{ grade.studyCompetence.name }}</h6>
                    <p v-html="grade.studyCompetence.description" />
                  </div>
                  <div class="vx-col text-center w-2/12 mb-base">
                    <vs-button
                      v-if="
                        isGraded(grade.studyCompetence) &&
                          can('comment', 'InternshipAgreement')
                      "
                      class="inline-block mr-2 float-right"
                      size=""
                      type="border"
                      icon="comment"
                      @click="openCommentPopup(grade.studyCompetence)"
                    />
                  </div>
                </div>
                <div class="mb-5 vx-row">
                  <div class="vx-col w-10/12 mb-base">
                    <vs-slider
                      :min="1"
                      :max="5"
                      :disabled="!can('grade', 'InternshipAgreement')"
                      v-model="grading[key]"
                      color="#ffa73a"
                      step="1"
                      ticks
                      @change="gradeChange(key)"
                    />
                  </div>
                  <div class="vx-col w-2/12 mb-base">
                    <div class="cuadrox">
                      {{ grade.grade || 1 }}
                    </div>
                  </div>
                </div>
                <vs-divider />
              </div>
            </template>
            <span v-if="!internshipAgreementObject.competences.length">{{
              $t('GLOBALS.NO_RECORDS')
            }}</span>
            <div v-else>
              <h3 class="my-5">{{ $t('GRADING.OVERALL_PROGRESS') }}</h3>
              <span class="d-block text-center">{{ getOverallProgress }}%</span>
              <vs-progress
                :height="12"
                :percent="getOverallProgress"
                :color="color"
                >{{ color }}</vs-progress
              >
            </div>
          </vx-card>
        </div>
      </div>
      <div v-if="internshipAgreementObject.id" class="vx-row mt-5">
        <div class="vx-col w-full mb-base">
          <vx-card :title="$t('ASSIGNMENTS.TITLE')">
            <assignments
              :internship-agreement="internshipAgreementObject"
              :is-owner="isOwner"
            ></assignments>
          </vx-card>
        </div>
      </div>
      <div v-if="internshipAgreementObject.id" class="vx-row mt-5">
        <div class="vx-col w-full mb-base">
          <comments
            :object="internshipAgreementObject"
            :object-id="internshipAgreementObject.id"
            :is-owner="isOwner"
          ></comments>
        </div>
      </div>
    </div>

    <div
      v-if="can('update', 'InternshipAgreement')"
      class="vx-col text-right w-full"
    >
      <vs-button @click="edit()">{{ $t('GLOBALS.EDIT') }} </vs-button>
    </div>

    <vs-popup
      :active.sync="activeSignaturePopup"
      :title="$t('GLOBALS.MARK_AS_SIGNED')"
    >
      <div class="inner-popup ml-3 ml-r">
        <vs-select
          :label="$t('GLOBALS.STUDENT')"
          v-model="signatureStudent"
          class="w-full mb-3"
        >
          <vs-select-item
            v-for="(user, index) in students.models"
            :key="index"
            :value="user"
            :text="getNiceName(user)"
            class="w-full"
          />
        </vs-select>
        <vs-select
          :label="$t('GLOBALS.ORGANIZATION_USER')"
          v-model="signatureOrganizationUser"
          class="w-full mb-3"
        >
          <vs-select-item
            v-for="(user, index) in organizationUsers.models"
            :key="index"
            :value="user"
            :text="getNiceName(user)"
            class="w-full mb-3"
          />
        </vs-select>
        <vs-select
          :label="$t('GLOBALS.SCHOOL_USER')"
          v-model="signatureSchoolUser"
          class="w-full"
        >
          <vs-select-item
            v-for="(user, index) in schoolUsers.models"
            :key="index"
            :value="user"
            :text="getNiceName(user)"
            class="w-full mb-3"
          />
        </vs-select>
        <vs-button class="mt-5 float-right" @click="sign()"
          >{{ $t('GLOBALS.SAVE_SIGNATURES') }}
        </vs-button>
      </div>
    </vs-popup>
    <vs-popup
      :active.sync="activeEvaluatePopup"
      :fullscreen="true"
      :title="$t('GLOBALS.EVALUATE')"
    >
      <div class="inner-popup ml-3 ml-r">
        <form-wizard
          :title="null"
          :subtitle="null"
          :finish-button-text="$t('GLOBALS.SUBMIT')"
          color="rgba(var(--vs-primary), 1)"
          @on-complete="evaluationSubmit"
        >
          <template v-for="(answer, index) in answers.models">
            <tab-content
              :key="index"
              :title="$t('GLOBALS.STEP' + '_' + (index + 1))"
              class="mb-5"
            >
              <div class="vx-row">
                <div class="vx-col w-full ">
                  <vs-select
                    v-if="getQuestionType(answer.question) === 'select'"
                    :label="answer.question.question"
                    v-model="answer.answer"
                    class="w-full select-large"
                  >
                    <vs-select-item
                      v-for="(item, index) in getQuestionOptions(
                        answer.question
                      )"
                      :key="index"
                      :value="item.value"
                      :text="item.value"
                      class="w-full"
                    />
                  </vs-select>
                  <div
                    v-else-if="getQuestionType(answer.question) === 'checkbox'"
                  >
                    <label class="mb-5 block">{{
                      answer.question.question
                    }}</label>

                    <div
                      v-for="(option, key) in getQuestionOptions(
                        answer.question
                      )"
                      :key="key"
                    >
                      <vs-radio
                        v-model="answer.answer"
                        :vs-value="option.value"
                        >{{ option.value }}</vs-radio
                      >
                    </div>
                  </div>
                  <vs-textarea
                    v-else
                    :label="answer.question.question"
                    v-model="answer.answer"
                    class="w-full h-36"
                  />
                </div>
              </div>
            </tab-content>
          </template>
        </form-wizard>
      </div>
    </vs-popup>
    <view-answers-popup
      :visible="activeViewAnswersSchoolOrganizerPopup"
      :answers="answersSchoolOrganizer"
      @close="activeViewAnswersSchoolOrganizerPopup = false"
    ></view-answers-popup>
    <view-answers-popup
      :visible="activeViewAnswersStudentPopup"
      :answers="answersStudent"
      @close="activeViewAnswersStudentPopup = false"
    ></view-answers-popup>
    <view-answers-popup
      :visible="activeViewAnswersMentorPopup"
      :answers="answersMentor"
      @close="activeViewAnswersMentorPopup = false"
    ></view-answers-popup>

    <vs-popup
      :active.sync="activeCommentPopup"
      :title="$t('GLOBALS.ADD_TITLE')"
    >
      <div class="inner-popup ml-3 ml-r">
        <vs-textarea
          :label="$t('GLOBALS.ENTER_YOUR_COMMENT_HERE')"
          v-model="comment"
          class="w-full h-36"
        />
        <vs-button
          class="inline-block mr-2 float-right"
          type="border"
          @click="sendComment()"
          >{{ $t('GLOBALS.SEND_COMMENT_BY_EMAIL') }}</vs-button
        >
      </div>
    </vs-popup>
    <vs-popup :active.sync="activeArticlesPopup" :title="$t('ARTICLES.TITLE')">
      <div class="inner-popup ml-3 ml-r">
        <template v-for="(article, key) in internshipAgreementObject.articles">
          <div :key="key" class="mb-5">
            <p v-html="article.content" />

            <vs-divider />
          </div>
        </template>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import {
  InternshipAgreement,
  InternshipAgreementCollection
} from '../../models/InternshipAgreement'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import Comments from '../../components/comments/Comments'
import { FileCollection } from '../../models/File'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { User, UserCollection } from '../../models/User'

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { Grade, GradeCollection } from '../../models/Grade'
import ViewObject from '../enterprises/ViewObject'
import { AnswerCollection } from '../../models/Answer'
import { Notification } from '../../models/Notification'
import ViewAnswersPopup from './ViewAnswersPopup'
import Assignments from './Assignments'
let _ = require('lodash')

export default {
  components: {
    Comments,
    VTextBox,
    VSelectBox,
    FormWizard,
    TabContent,
    ViewObject,
    vueDropzone: vue2Dropzone,
    ViewAnswersPopup,
    Assignments
  },

  props: {
    internshipAgreement: {
      type: Object,
      default: () => new InternshipAgreement()
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      files: new FileCollection(),
      studentFiles: new FileCollection(),
      students: new UserCollection(),
      signatureStudent: new User(),
      organizationUsers: new UserCollection(),
      signatureOrganizationUser: new User(),
      schoolUsers: new UserCollection(),
      signatureSchoolUser: new User(),
      activeSignaturePopup: false,
      activeViewAnswersSchoolOrganizerPopup: false,
      activeViewAnswersStudentPopup: false,
      activeViewAnswersMentorPopup: false,
      activeEvaluatePopup: false,
      activeArticlesPopup: false,
      activeCommentPopup: false,
      objectToComment: null,
      comment: '',
      user: this.$store.state.AppActiveUser,
      internshipAgreementObject: this.internshipAgreement,
      downloadLink: process.env.VUE_APP_API_URL + 'download/',
      dropzoneOptionsAdmin: {
        url:
          process.env.VUE_APP_API_URL +
          'uploadInternshipAgreementFile/' +
          this.id,
        thumbnailWidth: 150,
        maxFiles: 8,
        withCredentials: true
      },
      dropzoneOptions: {
        url:
          process.env.VUE_APP_API_URL +
          'uploadFile/internship_agreement_table/' +
          this.id,
        thumbnailWidth: 150,
        maxFiles: 8,
        withCredentials: true
      },
      grading: [],
      gradesCollection: new GradeCollection(),
      disableGradeCommit: true,

      answers: new AnswerCollection(),
      answersSchoolOrganizer: new AnswerCollection(),
      answersStudent: new AnswerCollection(),
      answersMentor: new AnswerCollection()
    }
  },
  computed: {
    color() {
      let progress = this.getOverallProgress
      if (progress <= 33) {
        return 'danger'
      }
      if (progress <= 66) {
        return 'primary'
      } else {
        return 'success'
      }
    },

    isOwner() {
      if (this.isAdmin) {
        return true
      }
      if (!this.internshipAgreementObject) {
        return false
      }

      if (
        this.internshipAgreementObject.mentor &&
        this.internshipAgreementObject.mentor.username ===
          this.activeUser.username
      ) {
        return true
      }

      if (
        this.internshipAgreementObject.school_organizer &&
        this.internshipAgreementObject.school_organizer.username ===
          this.activeUser.username
      ) {
        return true
      }
      return (
        this.internshipAgreementObject.student &&
        this.internshipAgreementObject.student.username ===
          this.activeUser.username
      )
    },
    getOverallProgress() {
      let progress = 0
      for (let grade of this.gradesCollection.models) {
        progress += grade.grade || 1
      }

      if (!this.gradesCollection.models.length) {
        return 0
      }

      progress = progress / this.gradesCollection.models.length
      progress = ((progress - 1) * 100) / (5 - 1)

      return progress
    },
    signLabel() {
      if (this.isSchoolOrganizer) {
        return this.$t('GLOBALS.SIGN_AS_SCHOOL')
      } else if (this.isMentor) {
        return this.$t('GLOBALS.SIGN_AS_MENTOR')
      }
      return this.$t('GLOBALS.SIGN_AS_STUDENT')
    },
    alreadyAnswered() {
      let anyAnswers = this.answers.filter(answer => {
        return answer.answer !== null
      })
      return anyAnswers.models.length !== 0
    },
    alreadyAnsweredSchoolOrganizer() {
      let anyAnswers = this.answersSchoolOrganizer.filter(answer => {
        return answer.answer !== null
      })

      return anyAnswers.models.length !== 0
    },
    alreadyAnsweredStudent() {
      let anyAnswers = this.answersStudent.filter(answer => {
        return answer.answer !== null
      })

      return anyAnswers.models.length !== 0
    },
    alreadyAnsweredMentor() {
      let anyAnswers = this.answersMentor.filter(answer => {
        return answer.answer !== null
      })

      return anyAnswers.models.length !== 0
    },
    alreadySigned() {
      if (this.isSchoolOrganizer) {
        return !!this.internshipAgreementObject.signed_school_username
      } else if (this.isOrganizationAdmin || this.isMentor) {
        return !!this.internshipAgreementObject.signed_organization_username
      } else if (this.isStudent) {
        return !!this.internshipAgreementObject.signed_student_username
      }
      return true
    },
    studentAndMentorAlreadySigned() {
      if (!this.isSchoolOrganizer) {
        return true
      }

      return (
        !!this.internshipAgreementObject.signed_organization_username &&
        !!this.internshipAgreementObject.signed_student_username
      )
    }
  },

  async mounted() {
    await this.init()
  },
  methods: {
    gradeChange(key) {
      let grades = this.gradesCollection.models
      grades[key].grade = this.grading[key]

      this.gradesCollection = new GradeCollection(grades)

      if (this.disableGradeCommit) {
        return
      }
      this.gradeChangeDebounce()
    },
    gradeChangeDebounce: _.debounce(function(e) {
      this.saveGrades()
    }, 1000),
    async init() {
      let users = new UserCollection()
      await users.fetchInSchool()
      this.students = users.filter(user => user.roles.includes('ROLE_STUDENT'))
      this.organizationUsers = users.filter(
        user =>
          user.roles.includes('ROLE_ORGADMIN') ||
          user.roles.includes('ROLE_MENTOR')
      )
      this.schoolUsers = users.filter(
        user =>
          user.roles.includes('ROLE_SCHOOLADMIN') ||
          user.roles.includes('ROLE_SCHOOLORG')
      )

      if (!this.internshipAgreementObject.id) {
        let internshipAgreements = new InternshipAgreementCollection()
        if (this.isAdmin) {
          await internshipAgreements.fetch()
        } else if (this.isOrganizationUser) {
          await internshipAgreements.fetchOrganization()
        } else if (this.isStudent) {
          await internshipAgreements.fetchStudent()
        } else {
          await internshipAgreements.fetch()
        }
        let $this = this
        this.internshipAgreementObject = internshipAgreements.find(
          internshipAgreement => internshipAgreement.id === parseInt($this.id)
        )
      }
      this.signatureSchoolUser = this.internshipAgreementObject.signed_school_username
      this.signatureStudent = this.internshipAgreementObject.signed_student_username
      this.signatureOrganizationUser = this.internshipAgreementObject.signed_organization_username
      if (this.internshipAgreementObject.student) {
        await this.studentFiles.fetchUser(
          this.internshipAgreementObject.student.username
        )
      }
      await this.files.fetchInternshipAgreementFiles(this.id)

      if (this.$refs.myDropzoneInstance) {
        this.$refs.myDropzoneInstance.setOption(
          'maxFiles',
          (this.dropzoneOptions.maxFiles -= this.files.models.length)
        )
      }

      await this.gradesCollection.fetch(this.id)

      this.grading = this.gradesCollection.models.map(grade => grade.grade)

      let answers = new AnswerCollection()
      if (this.isSchoolOrganizer) {
        await answers.listAnswersForSchool(this.internshipAgreementObject.id)
      } else if (this.isMentor) {
        await answers.listAnswersForMentor(this.internshipAgreementObject.id)
      } else {
        await answers.listAnswersForStudent(this.internshipAgreementObject.id)
      }
      this.answers = new AnswerCollection(answers.models)
      if (this.can('viewStudentAnswers', 'InternshipAgreement')) {
        await this.answersStudent.listAnswersForStudent(
          this.internshipAgreementObject.id
        )
      }
      if (this.can('viewMentorAnswers', 'InternshipAgreement')) {
        await this.answersMentor.listAnswersForMentor(
          this.internshipAgreementObject.id
        )
      }
      if (this.can('viewSchoolOrganizerAnswers', 'InternshipAgreement')) {
        await this.answersSchoolOrganizer.listAnswersForSchool(
          this.internshipAgreementObject.id
        )
      }
      this.disableGradeCommit = false
      // setTimeout(() => {
      // }, 1000)
    },
    getQuestionType(question) {
      if (!question.options || question.options === '') {
        return 'text'
      }
      let options = JSON.parse(question.options)
      if (!options.type) {
        return 'text'
      }
      return options.type
    },
    getQuestionOptions(question) {
      if (!question.options || question.options === '') {
        return []
      }
      let options = JSON.parse(question.options)
      if (!options.options) {
        return []
      }
      return options.options
    },

    edit() {
      this.$router.push({
        name: 'internship-agreements-edit',
        params: {
          id: this.internshipAgreementObject.id,
          internshipAgreement: this.internshipAgreementObject
        }
      })
    },
    print() {
      this.$router.push({
        name: 'internship-agreements-print',
        params: {
          id: this.internshipAgreementObject.id,
          internshipAgreement: this.internshipAgreementObject
        }
      })
    },
    grade() {
      this.gradesCollection.save().then(() => {
        this.gradesCollection.fetch(this.id)
        this.$vs.notify({
          color: 'success',
          title: this.$t('GLOBALS.GRADES_SUBMITTED'),
          text: this.$t('GLOBALS.YOU_HAVE_SUCCESSFULLY_SUBMITTED_GRADES')
        })
      })
    },
    evaluationSubmit() {
      if (this.answers.find(answer => answer.answer === null)) {
        this.$vs.notify({
          color: 'danger',
          title: this.$t('GLOBALS.PLEASE_ENTER_ALL_ANSWERS')
        })
        return
      }
      this.activeEvaluatePopup = false
      let ajax = null
      if (this.can('storeAnswersForMentor', 'InternshipAgreement')) {
        ajax = this.answers.storeAnswersForMentor(this.id)
      } else if (this.can('storeAnswersForStudent', 'InternshipAgreement')) {
        ajax = this.answers.storeAnswersForStudent(this.id)
      } else {
        ajax = this.answers.storeAnswersForSchool(this.id)
      }
      ajax.then(() => {
        this.$vs.notify({
          color: 'success',
          title: this.$t('GLOBALS.EVALUATION_SUBMITTED'),
          text: this.$t('GLOBALS.YOU_HAVE_SUCCESSFULLY_SUBMITTED_EVALUATION')
        })
        let content =
          'Apprenticeship agreement ' +
          this.internshipAgreementObject.id +
          ' was evaluated by ' +
          this.getNiceName(this.activeUser)

        if (this.internshipAgreementObject.school_organizer) {
          this.sendNotification(
            [this.internshipAgreementObject.school_organizer.username],
            content
          )
        }
        this.refresh()
      })
    },

    refresh() {
      this.internshipAgreementObject = new InternshipAgreement()
      this.init()
    },
    sign() {
      let content =
        'Contract ' +
        this.internshipAgreementObject.id +
        ' was signed by ' +
        this.getNiceName(this.activeUser)
      if (this.isSchoolOrganizer) {
        this.internshipAgreementObject.signSchool().then(() => {
          this.refresh()
          this.successMessage(this.$t('GLOBALS.SIGN_SUCCESSFUL'))
        })
      } else if (this.isOrganizationAdmin || this.isMentor) {
        this.internshipAgreementObject.signOrganization().then(() => {
          this.successMessage(this.$t('GLOBALS.SIGN_SUCCESSFUL'))

          if (this.internshipAgreementObject.school_organizer) {
            this.sendNotification(
              [this.internshipAgreementObject.school_organizer.username],
              content
            )
          }
          this.refresh()
        })
      } else if (this.isStudent) {
        this.internshipAgreementObject.signStudent().then(() => {
          this.successMessage(this.$t('GLOBALS.SIGN_SUCCESSFUL'))

          if (this.internshipAgreementObject.school_organizer) {
            this.sendNotification(
              [this.internshipAgreementObject.school_organizer.username],
              content
            )
          }
          this.refresh()
        })
      }
    },
    sent() {
      this.files.fetchInternshipAgreementFiles(this.id)
      this.$vs.notify({
        color: 'success',
        title: this.$t('GLOBALS.FILE_UPLOADED'),
        text: this.$t('GLOBALS.FILE_SUCCESSFULLY_UPLOADED')
      })
    },
    error() {
      this.$vs.notify({
        color: 'danger',
        title: this.$t('GLOBALS.ERROR_ON_UPLOAD')
      })
    },
    remove(file) {
      file.delete().then(() => {
        this.$vs.notify({
          color: 'success',
          title: this.$t('GLOBALS.FILE_DELETED'),
          text: this.$t('GLOBALS.FILE_SUCCESSFULLY_DELETED')
        })
      })
      this.files.fetchInternshipAgreementFiles(this.id)
    },
    openCommentPopup(object) {
      this.activeCommentPopup = true
      this.objectToComment = object
    },
    isFile(object) {
      return !!object.filename
    },
    async sendComment() {
      let isFile = this.isFile(this.objectToComment)

      if (!this.activeUser.email) {
        this.errorMessage(this.$t('GLOBALS.YOU_MISSING_EMAIL'))
        return
      }

      let username = this.internshipAgreementObject.organization
        .contact_username

      if (isFile) {
        username = this.objectToComment.owner_username
      } else if (this.internshipAgreementObject.mentor) {
        username = this.internshipAgreementObject.mentor.username
      } else {
        this.errorMessage(this.$t('GLOBALS.MISSING_MENTOR'))
        return
      }
      let user = await this.getUserByUsername(username)

      if (!user || !user.email) {
        this.errorMessage(this.$t('GLOBALS.UPLOADER_MISSING_EMAIL'))
        return
      }

      let subject =
        'Comment to the competence grading: ' + this.objectToComment.name

      if (isFile) {
        subject =
          this.$t('GLOBALS.SUBJECT_IN_COMMENT_FOR_FILE') +
          ': ' +
          this.objectToComment.filename
      }

      subject += ' on ' + this.internshipAgreementObject.document_number

      this.sendMail(
        this.activeUser.email,
        user.email,
        subject,
        this.comment
      ).then(() => {
        this.comment = ''
        this.activeCommentPopup = false
      })
    },
    isGraded(competence) {
      let grade = this.gradesCollection.find(
        grade => grade.studyCompetence.id === competence.id
      )

      return !!grade
    },

    saveGrades() {
      this.gradesCollection.save().then(() => {
        this.$vs.notify({
          color: 'success',
          title: this.$t('GLOBALS.GRADES_SUBMITTED'),
          text: this.$t('GLOBALS.YOU_HAVE_SUCCESSFULLY_SUBMITTED_GRADES')
        })
        let content =
          'Apprenticeship agreement ' +
          this.internshipAgreementObject.id +
          ' was graded by ' +
          this.getNiceName(this.activeUser)
        let notificationUsernames = []
        if (this.internshipAgreementObject.student) {
          notificationUsernames.push(
            this.internshipAgreementObject.student.username
          )
        }
        if (this.internshipAgreementObject.school_organizer) {
          notificationUsernames.push(
            this.internshipAgreementObject.school_organizer.username
          )
        }
        this.sendNotification(notificationUsernames, content)
      })
    },
    sendNotification(usernames, content) {
      let notification = new Notification()
      notification.usernames = usernames
      notification.info = content
      notification.save()
    },
    getNiceName(user) {
      if (user.first_name) {
        return [user.first_name, user.last_name].join(' ')
      }
      return user.username
    },
    getChildObjectNiceName(key) {
      return (
        this.internshipAgreementObject[key].name ||
        this.getNiceName(this.internshipAgreementObject[key])
      )
    }
  }
}
</script>

<style scoped lang="scss">
.cuadrox {
  padding: 8px;
  text-align: center;
  background: #ffa73a;
  color: rgb(255, 255, 255);
  font-size: 16px;
  border-radius: 10px;
  width: 40px;
  float: right;
  margin-right: 7px;
}
.vs-collapse.small {
  padding: 0;

  ::v-deep .vs-collapse-item--header {
    padding: 0;
    font-size: 1em;
  }
}
</style>
