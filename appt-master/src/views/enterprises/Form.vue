<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card>
        <template v-if="can('propose', 'Enterprise')">
          <vs-select
            v-model="schoolOrganizer"
            :label="$t('GLOBALS.ORGANIZER_FOR_PROPOSE')"
            class="w-full mb-6"
            autocomplete
          >
            <vs-select-item
              v-for="schoolOrganizerObject in schoolOrganizers.models"
              :key="schoolOrganizerObject.username"
              :value="schoolOrganizerObject"
              :text="getNiceName(schoolOrganizerObject)"
            />
          </vs-select>
          <vs-input
            :label="$t('GLOBALS.CONTACT_NAME')"
            v-model="name"
            type="text"
            class="w-full mb-6"
          />
          <vs-input
            :label="$t('GLOBALS.CONTACT_EMAIL')"
            v-model="email"
            type="email"
            class="w-full mb-6"
          />
          <vs-input
            :label="$t('GLOBALS.CONTACT_PHONE')"
            v-model="phone"
            type="text"
            class="w-full mb-6"
          />
        </template>

        <template v-for="(settings, key) in enterpriseObject.fieldsSettings()">
          <template v-if="isVisible(settings, key)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="enterpriseObject"
              :field="key"
            />
            <v-text-box
              v-else
              :key="key"
              :object="enterpriseObject"
              :field="key"
            />
          </template>
        </template>

        <div class="vx-row">
          <div class="vx-col sm:w-3/3 w-full text-right">
            <vs-button
              v-if="can('create', 'Enterprise') || can('update', 'Enterprise')"
              class="mr-3 mb-2"
              @click="submit"
            >
              {{ $t('GLOBALS.SUBMIT') }}</vs-button
            >
            <vs-button
              v-if="can('propose', 'Enterprise')"
              class="mr-3 mb-2"
              @click="propose"
              >{{ $t('GLOBALS.PROPOSE_BY_SENDING_EMAIL') }}</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { Enterprise, EnterpriseCollection } from '../../models/Enterprise'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import { StudyCompetenceCollection } from '../../models/StudyCompetence'
import { StudyProgramCollection } from '../../models/StudyProgram'
import { User, UserCollection } from '../../models/User'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    enterprise: {
      type: Object,
      default: () => new Enterprise()
    },
    id: {
      type: [Number, String],
      default: () => null
    }
  },

  data() {
    return {
      enterpriseObject: this.enterprise,
      studyCompetences: new StudyCompetenceCollection(),
      studyPrograms: new StudyProgramCollection(),
      users: new UserCollection(),
      schoolOrganizer: null,
      schoolOrganizers: new UserCollection(),
      name: '',
      phone: '',
      email: ''
    }
  },

  async mounted() {
    if (this.$acl.not.check('admin')) {
      this.enterprise.school_id = this.$store.state.AppActiveUser.school
    }
    if (!this.enterpriseObject.id && this.id) {
      let enterprises = new EnterpriseCollection()
      await enterprises.fetch().then(() => {
        this.enterpriseObject = enterprises.find(
          enterprise => enterprise.id === parseInt(this.id)
        )
      })
    }

    await this.users.fetchInSchool()
    this.schoolOrganizers = this.users.filter(user => {
      return user.roles.includes('ROLE_SCHOOLORG')
    })
  },

  methods: {
    isVisible(settings, key = null) {
      if (key === 'school_id' && this.$acl.not.check('admin')) {
        return false
      }
      if (key === 'contact_username' && this.$acl.not.check('admin')) {
        return false
      }

      if (this.enterpriseObject.id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },
    async validate() {
      let errors = await this.enterpriseObject.validate()

      if (Object.keys(errors).length !== 0) {
        this.$vs.notify({
          color: 'danger',
          title: this.$t('GLOBALS.ERROR_ON_SAVE'),
          text: this.$t('VALIDATION.ERROR')
        })
        return false
      }
      return true
    },

    findFirstAdminWithEmail() {
      return this.users.find(
        user => user.email && user.roles.includes('ROLE_SCHOOLORG')
      )
    },

    async propose() {
      if (!(await this.validate())) {
        return false
      }
      if (!this.activeUser.email) {
        this.errorMessage(this.$t('GLOBALS.YOU_MISSING_EMAIL'))
        return
      }
      if (!this.activeUser.first_name) {
        this.errorMessage(this.$t('GLOBALS.YOU_MISSING_FIRST_NAME'))
        return
      }
      if (!this.activeUser.last_name) {
        this.errorMessage(this.$t('GLOBALS.YOU_MISSING_LAST_NAME'))
        return
      }
      let content = ''
      content +=
        'Proposed by: ' +
        ' ' +
        this.activeUser.first_name +
        ' ' +
        this.activeUser.last_name +
        ' (' +
        this.activeUser.username +
        ' - ' +
        this.activeUser.email +
        ')' +
        '<br>'
      content += 'Contact name: ' + this.name + '<br>'
      content += 'Contact email: ' + this.email + '<br>'
      content += 'Contact phone: ' + this.phone + '<br>'
      content +=
        'Name of the organization: ' + this.enterpriseObject.name + '<br>'
      content += 'Street name: ' + this.enterpriseObject.streetname + '<br>'
      content += 'City: ' + this.enterpriseObject.cityname + '<br>'
      content += 'Zip: ' + this.enterpriseObject.cityzipcode + '<br>'

      content +=
        'Study programs: ' +
        this.enterpriseObject.studyPrograms
          .map(program => program.name)
          .join(', ') +
        '<br>'

      if (!this.schoolOrganizer || !this.schoolOrganizer.email) {
        this.errorMessage(this.$t('GLOBALS.ADMIN_MAIL_MISSING'))
        return
      }

      this.sendMail(
        this.activeUser.email,
        this.schoolOrganizer.email,
        this.$t('GLOBALS.NEW_ENTERPRISE_SUGGESTED') +
          ': ' +
          this.enterpriseObject.name,
        content
      ).then(() => {
        this.$router.push({ name: 'enterprises' })
      })
    },
    async submit() {
      let action = 'save'
      if (this.enterpriseObject.id) {
        action = 'patch'
      }

      this.enterpriseObject[action]()
        .then(() => {
          this.$router.push({ name: 'enterprises' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(this.enterpriseObject)
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.ERROR_ON_SAVE'),
            text: error.message
          })
        })
    },
    getNiceName(user) {
      return user.first_name + ' ' + user.last_name + ' (' + user.username + ')'
    }
  }
}
</script>
