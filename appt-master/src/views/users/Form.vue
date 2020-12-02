<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mb-base">
      <h2 v-if="id" class="mb-4">{{ userObject.username }}</h2>
      <vx-card>
        <div v-if="id" class="mb-5">
          {{ $t('GLOBALS.ROLES') }}:
          <template v-for="role in userObject.roles">
            <p :key="role"></p>
            {{ getRoleName(role) }}
          </template>
        </div>

        <template v-for="(settings, key) in fieldSettings">
          <template v-if="isVisible(settings, key)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :object="userObject"
              :settings="settings"
              :field="key"
            />
            <v-text-box v-else :key="key" :object="userObject" :field="key" />
          </template>
        </template>
        <div class="vx-row mb-6">
          <div class="vx-col  w-full">
            <vs-select
              v-model="userObject.organization"
              :danger="organizationError"
              :danger-text="organizationErrorText"
              :label="$t('GLOBALS.ORGANIZATION_OR_SCHOOL') + ' *'"
              class="w-full"
              autocomplete
            >
              <vs-select-item
                v-for="item in organizationItems"
                :key="item.id"
                :value="item.id"
                :text="item.name"
              />
            </vs-select>
          </div>
        </div>
        <div v-if="isAdmin" class="vx-row mb-6">
          <div class="vx-col  w-full">
            <vs-select
              v-model="selectedRoles"
              :label="$t('GLOBALS.ROLES') + ' *'"
              :multiple="true"
              class="w-full"
              autocomplete
            >
              <vs-select-item
                v-for="item in roles"
                :key="item.id"
                :value="item.id"
                :text="item.name"
              />
            </vs-select>
          </div>
        </div>
      </vx-card>
    </div>

    <div class="vx-col sm:w-3/3 w-full ml-auto">
      <vs-button
        v-if="!userObject.jwt"
        class="mr-3 mb-2 float-right"
        @click="changePassword"
        >{{ $t('USERS.CHANGE_PASSWORD') }}</vs-button
      >
      <vs-button class="mr-3 mb-2" @click="submit">{{
        $t('GLOBALS.SUBMIT')
      }}</vs-button>
    </div>
  </div>
</template>

<script>
import { User, UserCollection } from '../../models/User'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import { SchoolCollection } from '../../models/School'
import { EnterpriseCollection } from '../../models/Enterprise'
import { Role } from '../../models/Role'

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
    saveMethod: {
      type: String,
      default: () => 'save'
    },
    id: {
      type: [Number, String],
      default: () => null
    },
    role: {
      type: String,
      default: () => null
    }
  },
  data() {
    return {
      userObject: this.user,
      organizationItems: null,
      selectedRoles: [],
      roles: [],
      organizationError: false,
      organizationErrorText: ''
    }
  },
  computed: {
    fieldSettings() {
      return this.userObject.fieldsSettings()
    },
    redirect() {
      if (this.can('viewAll', 'User')) {
        return { name: 'users' }
      }
      return { name: 'users-in-organization' }
    },
    checkOrganizationUser() {
      if (['ROLE_ORGADMIN', 'ROLE_MENTOR'].includes(this.role)) {
        return true
      }
      if (!this.role) {
        if (this.userObject.roles.includes('ROLE_ORGADMIN')) {
          return true
        }
        if (this.userObject.roles.includes('ROLE_MENTOR')) {
          return true
        }
      }

      return false
    },
    checkSchoolUser() {
      if (
        ['ROLE_SCHOOLADMIN', 'ROLE_SCHOOLORG', 'ROLE_STUDENT'].includes(
          this.role
        )
      ) {
        return true
      }
      if (!this.role) {
        if (this.userObject.roles.includes('ROLE_SCHOOLADMIN')) {
          return true
        }
        if (this.userObject.roles.includes('ROLE_SCHOOLORG')) {
          return true
        }
        if (this.userObject.roles.includes('ROLE_STUDENT')) {
          return true
        }
      }

      return false
    }
  },
  watch: {
    role() {
      this.userObject = new User()
      this.userObject.roles.push(this.role)
      this.selectedRoles = [this.role]
      this.setUserData()
      this.updateOrganizationValues()
    },
    selectedRoles() {
      this.userObject.roles = this.selectedRoles
    }
  },

  async mounted() {
    if (this.role) {
      this.userObject = new User()
      this.userObject.roles.push(this.role)
    }
    await this.setUserData()

    let roleObject = new Role()
    this.roles = roleObject.getRoles()

    this.updateOrganizationValues()
  },
  methods: {
    async setUserData() {
      if (!this.userObject.id && this.id) {
        let users = new UserCollection()
        if (this.can('viewAll', 'User')) {
          await users.fetch().then(() => {
            this.userObject = users.find(user => user.username === this.id)
            this.selectedRoles = this.userObject.roles
          })
        } else {
          await users.fetchInSchool().then(() => {
            this.userObject = users.find(user => user.username === this.id)
            this.selectedRoles = this.userObject.roles
          })
        }
      }
    },
    updateOrganizationValues() {
      let enterpriseCollection = new EnterpriseCollection()
      let schoolCollection = new SchoolCollection()

      if (this.checkOrganizationUser) {
        enterpriseCollection.fetch().then(() => {
          this.organizationItems = enterpriseCollection.models
        })
      } else if (this.checkSchoolUser) {
        schoolCollection.fetch().then(() => {
          this.organizationItems = schoolCollection.models
        })
      }
    },
    isVisible(settings, key) {
      if (this.userObject.jwt && !['studyprogram'].includes(key)) {
        return false
      }
      if (!this.can('createAny', 'User')) {
        if (this.id) {
          return settings.showOnUpdateForNonAdmin
        }

        return settings.showOnCreateForNonAdmin
      }
      if (this.id) {
        return settings.showOnUpdate
      }

      return settings.showOnCreate
    },
    async submit() {
      let errors = await this.userObject.validate()

      if (!this.userObject.organization) {
        this.organizationError = true
        this.organizationErrorText = 'This field is required'
      }
      if (Object.keys(errors).length !== 0) {
        this.showValidationErrors(this.userObject)
        this.$vs.notify({
          color: 'danger',
          title: this.$t('GLOBALS.ERROR_ON_SAVE'),
          text: this.$t('GLOBALS.VALIDATION_ERROR')
        })
        return
      }
      if (!this.userObject.roles.length) {
        this.$vs.notify({
          color: 'danger',
          title: this.$t('GLOBALS.ERROR_ON_SAVE'),
          text: this.$t('GLOBALS.ROLE_REQUIRED')
        })
        return
      }

      if (this.id) {
        this.userObject
          .modifyUser()
          .then(() => {
            this.$router.push(this.redirect)

            this.$vs.notify({
              color: 'success',
              title: this.$t('GLOBALS.RECORD_UPDATED'),
              text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_UPDATED')
            })
          })
          .catch(error => {
            this.showValidationErrors(this.userObject)
            this.$vs.notify({
              color: 'danger',
              title: this.$t('GLOBALS.ERROR_ON_SAVE'),
              text: error.message
            })
          })
      } else {
        this.userObject[this.saveMethod]()
          .then(() => {
            this.$router.push(this.redirect)
            this.$vs.notify({
              color: 'success',
              title: this.$t('GLOBALS.RECORD_CREATED'),
              text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
            })
          })
          .catch(error => {
            this.showValidationErrors(this.userObject)
            this.errorMessageApi(error.response)
          })
      }
    },
    changePassword() {
      this.$router.push({
        name: 'users-change-password',
        params: {
          user: this.userObject
        }
      })
    }
  }
}
</script>
