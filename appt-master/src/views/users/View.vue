<template>
  <div class="vx-row">
    <!-- HORIZONTAL LAYOUT -->
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card :title="userObject.name">
        <template v-for="(settings, key) in userObject.fieldsSettings()">
          <div v-if="isVisible(settings)" :key="key" class="mb-5">
            <h6>{{ $t(settings.label) }}:</h6>
            <p>{{ userObject[key] ? userObject[key] : '/' }}</p>
          </div>
        </template>
        <template v-if="userObject.studyprogram">
          <div class="mb-5">
            <h6>{{ $t('STUDY_PROGRAMS.TITLE_SINGLE') }}:</h6>
            <p>
              {{ userObject.studyprogram.name
              }}<vs-button
                v-if="can('view', 'StudyProgram')"
                class="inline-block mr-2 float-right"
                size="small"
                type="border"
                icon="remove_red_eye"
                @click="viewStudyProgram(userObject.studyprogram)"
              />
            </p>
          </div>
        </template>
        <template v-for="(role, key) in userObject.roles">
          <div :key="key" class="mb-5">
            <h6>{{ $t('ROLES.TITLE') }}:</h6>
            <p>{{ getRoleName(role) }}</p>
          </div>
        </template>
      </vx-card>
    </div>
    <div v-if="canEditUser(user)" class="vx-col text-right w-full">
      <vs-button @click="edit()">{{ $t('GLOBALS.EDIT') }} </vs-button>
    </div>
  </div>
</template>

<script>
import { User, UserCollection } from '../../models/User'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    user: {
      type: Object,
      default: () => new User()
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      userObject: this.user
    }
  },

  async mounted() {
    if (!this.userObject.id) {
      let users = new UserCollection()
      if (this.isAdmin) {
        await users.fetch()
      } else if (this.isSchoolUser) {
        await users.fetchInSchool()
      } else {
        await users.fetchInOrganization()
      }
      this.userObject = users.find(user => user.username === this.id)
    }
  },
  methods: {
    isVisible(settings) {
      if (settings.type === 'select') {
        return false
      }
      if (this.$acl.check('student')) {
        return settings.showInViewStudent
      }
      return settings.showInView
    },
    edit() {
      this.$router.push({
        name: 'users-edit',
        params: {
          id: this.userObject.username,
          studyProgram: this.userObject
        }
      })
    },
    viewStudyProgram(studyProgram) {
      this.$router.push({
        name: 'study-programs-view',
        params: {
          id: studyProgram.id
        }
      })
    }
  }
}
</script>
