<template>
  <div>
    <div class="actions">
      <vs-button
        v-if="isOwner && can('create', 'Assignment')"
        class="mb-2 small"
        type="border"
        icon="add"
        @click="activeAddAssignmentPopup = true"
        >{{ $t('ASSIGNMENTS.ADD') }}</vs-button
      >
    </div>
    <vs-collapse icon-arrow="grade">
      <vs-collapse-item
        v-for="(assignment, index) in assignments.models"
        :key="assignment.id"
      >
        <div slot="header">
          {{ $t('GLOBALS.WEEK') }} {{ index + 1 }} -
          {{
            assignment.study_competences
              .map(competence => competence.name)
              .join(', ')
          }}
          <vs-button
            v-if="isOwner && can('delete', 'Assignment')"
            class="mr-5 small float-right"
            type="border"
            icon="remove"
            @click="deleteAssignment(assignment)"
            >{{ $t('GLOBALS.DELETE') }}</vs-button
          >
        </div>
        <div v-html="assignment.description" />

        <h5 class="mt-5">
          {{ $t('WORKLOG.TITLE') }}:
          <vs-button
            v-if="isOwner && can('create', 'Worklog')"
            class="mb-2 small float-right"
            type="border"
            icon="add"
            @click="openAddWorklogPopup(assignment)"
            >{{ $t('WORKLOG.ADD') }}</vs-button
          >
        </h5>
        <div
          v-for="worklog in assignment.student_worklog"
          :key="worklog.id"
          class="ml-2 mt-5"
        >
          <div class="mt-1">
            <p v-html="$options.filters.beautifyText(worklog.student_log)"></p>
            <p class="text-right">
              {{
                new Date(worklog.date_studentlog) | moment('DD.MM.YYYY hh:mm')
              }}
            </p>
          </div>
          <div v-if="worklog.mentor_log" class="clearfix mt-4">
            <small
              ><strong>{{ $t('GLOBALS.MENTOR_COMMENT') }}:</strong>
              <p v-html="$options.filters.beautifyText(worklog.mentor_log)"></p>
              <p class="text-right">
                {{
                  new Date(worklog.date_mentorlog) | moment('DD.MM.YYYY hh:mm')
                }}
              </p>
            </small>
          </div>
          <div v-else class="text-right">
            <vs-button
              v-if="isOwner && can('addComment', 'Worklog')"
              class="mb-2 small"
              type="border"
              icon="add"
              @click="openAddWorklogCommentPopup(worklog)"
            >
              {{ $t('WORKLOG.COMMENT') }}
            </vs-button>
          </div>
          <vs-divider></vs-divider>
        </div>
        <div v-if="!assignment.student_worklog.length">
          {{ $t('GLOBALS.NO_ENTRIES') }}
        </div>
      </vs-collapse-item>
    </vs-collapse>

    <vs-popup
      :active.sync="activeAddAssignmentPopup"
      :title="$t('ASSIGNMENTS.ADD')"
    >
      <div class="inner-popup ml-3 ml-r">
        <template v-for="(settings, key) in newAssignment.fieldsSettings()">
          <template v-if="isVisible(settings)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="newAssignment"
              :values="getValues(key)"
              :field="key"
            />
            <v-text-area
              v-else-if="settings.type === 'textarea'"
              :key="key"
              :object="newAssignment"
              :field="key"
              height="300px"
              class="w-full height-300"
            />
            <v-text-box
              v-else
              :key="key"
              :object="newAssignment"
              :field="key"
            />
          </template>
        </template>
        <vs-button class="mt-5 float-right" @click="addAssignment()"
          >{{ $t('ASSIGNMENTS.ADD') }}
        </vs-button>
      </div>
    </vs-popup>
    <vs-popup :active.sync="activeAddWorklogPopup" :title="$t('WORKLOG.ADD')">
      <div class="inner-popup ml-3 ml-r">
        <vs-textarea
          v-model="worklogText"
          height="300px"
          class="w-full height-300"
        />
        <vs-button class="mt-5 float-right" @click="addWorkLog()"
          >{{ $t('WORKLOG.ADD') }}
        </vs-button>
      </div>
    </vs-popup>
    <vs-popup
      :active.sync="activeAddWorklogCommentPopup"
      :title="$t('WORKLOG.COMMENT')"
    >
      <div class="inner-popup ml-3 ml-r">
        <vs-textarea
          v-model="commentText"
          height="300px"
          class="w-full height-300"
        />
        <vs-button class="mt-5 float-right" @click="addWorkLogComment()"
          >{{ $t('WORKLOG.COMMENT') }}
        </vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { Assignment, AssignmentCollection } from '../../models/Assignment'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import VTextArea from '../../components/form/VTextArea'
import {
  StudentWorklog,
  StudentWorklogCollection
} from '../../models/StudentWorklog'

export default {
  name: 'Assignments',
  components: {
    VTextBox,
    VTextArea,
    VSelectBox
  },
  filters: {
    beautifyText: function(value) {
      if (!value) {
        return ''
      }
      return value.replace(/\n/g, '<br>')
    }
  },
  props: {
    internshipAgreement: {
      type: Object,
      required: true
    },
    isOwner: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      activeAddAssignmentPopup: false,
      activeAddWorklogPopup: false,
      activeAddWorklogCommentPopup: false,
      worklogText: '',
      selectedAssignment: null,
      commentText: '',
      selectedWorklog: null,
      newAssignment: new Assignment(),
      assignments: new AssignmentCollection(),
      studentWorklogs: new StudentWorklogCollection()
    }
  },
  watch: {},
  async mounted() {
    await this.assignments.fetch(this.internshipAgreement.id)
  },
  methods: {
    isVisible(settings) {
      return settings.showOnCreate
    },
    getValues(key) {
      if (key === 'study_competences') {
        return this.internshipAgreement.competences
      }
      return null
    },
    addAssignment() {
      this.newAssignment.study_competences = this.newAssignment.study_competences.map(
        competence => {
          return {
            id: competence.id
          }
        }
      )

      this.newAssignment.internship_agreement = {
        id: this.internshipAgreement.id
      }

      this.newAssignment.save().then(() => {
        this.activeAddAssignmentPopup = false
        this.newAssignment = new Assignment()
        this.assignments.fetch(this.internshipAgreement.id)
        this.$vs.notify({
          color: 'success',
          title: this.$t('GLOBALS.ASSIGNMENT_ADDED'),
          text: this.$t('GLOBALS.YOU_HAVE_SUCCESSFULLY_ADDED_ASSIGNMENT')
        })
      })
    },
    openAddWorklogPopup(assignment) {
      this.selectedAssignment = assignment
      this.activeAddWorklogPopup = true
    },
    openAddWorklogCommentPopup(worklog) {
      this.selectedWorklog = worklog
      this.activeAddWorklogCommentPopup = true
    },
    addWorkLog() {
      let worklog = new StudentWorklog()
      worklog.log = this.worklogText
      worklog.date_log = this.$moment(new Date()).format('YYYY-MM-DD')
      worklog.save(this.selectedAssignment.id).then(response => {
        this.activeAddWorklogPopup = false
        this.selectedAssignment.student_worklog = response.response.data
        this.worklogText = ''
        this.$vs.notify({
          color: 'success',
          title: this.$t('GLOBALS.WORKLOG_ADDED'),
          text: this.$t('GLOBALS.YOU_HAVE_SUCCESSFULLY_ADDED_WORKLOG')
        })
      })
    },
    addWorkLogComment() {
      let worklogComment = new StudentWorklog()
      worklogComment.log = this.commentText
      worklogComment.date_log = this.$moment(new Date()).format('YYYY-MM-DD')
      worklogComment.comment(this.selectedWorklog.id).then(() => {
        this.activeAddWorklogCommentPopup = false
        this.selectedWorklog.mentor_log = this.commentText
        this.commentText = ''
        this.$vs.notify({
          color: 'success',
          title: this.$t('GLOBALS.COMMENT_ADDED'),
          text: this.$t('GLOBALS.YOU_HAVE_SUCCESSFULLY_ADDED_COMMENT')
        })
      })
    },
    deleteAssignment(assignment) {
      assignment
        .delete()
        .then(() => {
          this.assignments.fetch(this.internshipAgreement.id)
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.DELETE_SUCCESSFUL'),
            text: this.$t('GLOBALS.DELETE_SUCCESSFUL_CONTENT')
          })
        })
        .catch(error => {
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.SOMETHING_WENT_WRONG'),
            text: error.message
          })
        })
    }
  }
}
</script>
<style scoped lang="scss">
.actions {
  float: right;
  margin-top: -50px;
}
.vs-collapse.small {
  padding: 0;

  ::v-deep .vs-collapse-item--header {
    padding: 5px 10px;
    font-size: 1em;
  }
}
</style>
