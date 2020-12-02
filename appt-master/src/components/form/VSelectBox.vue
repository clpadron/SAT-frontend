<template>
  <div class="vx-row mb-6">
    <div class="vx-col  w-full">
      <vs-select
        v-model="selectedValue"
        :danger="hasErrors(object, field)"
        :danger-text="errorText(object, field)"
        :label="getLabel"
        :multiple="settings.multiple"
        :disabled="disabled"
        :clearable="true"
        width="100%"
        autocomplete
      >
        <vs-select-item
          v-for="(item, index) in items"
          :key="index"
          :value="getValue(item)"
          :text="getDisplayValue(item, displayField)"
        />
      </vs-select>
    </div>
  </div>
</template>

<script>
import { Collection } from 'vue-mc'
import { mapGetters } from 'vuex'
import { User } from '../../models/User'
import { EnterpriseCollection } from '../../models/Enterprise'
import { SchoolCollection } from '../../models/School'

export default {
  name: 'VSelectBox',
  props: {
    object: {
      type: Object,
      required: true
    },
    values: {
      type: Array,
      required: false,
      default() {
        return null
      }
    },
    label: {
      type: String,
      default: null
    },
    field: {
      type: String,
      required: true
    },
    settings: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      displayField: 'name',
      fieldKey: 'id',
      actualValues: [],
      selectedValue: this.object[this.field]
    }
  },
  computed: {
    ...mapGetters([
      'AppActiveUser'
      // ...
    ]),
    items() {
      return this.actualValues
    },
    getLabel() {
      let label = ''
      if (this.label) {
        label = this.label
      } else {
        label = this.settings.label
      }

      label = this.$t(label)

      if (this.isRequired) {
        label += '*'
      }
      return label
    },
    isCollection() {
      return this.settings.values instanceof Collection
    },
    isRequired() {
      return !!this.object.validation()[this.field]
    }
  },
  watch: {
    selectedValue() {
      this.updateValues()
    },
    object() {
      this.setSelectedValues()
      if (this.field === 'organization' && this.object instanceof User) {
        let roles = this.object.roles
        if (
          roles.includes('ROLE_ORGADMIN') ||
          roles.includes('ROLE_ORGADMIN')
        ) {
          let collection = new EnterpriseCollection()
          collection.fetch().then(() => {
            this.actualValues = collection.models
          })
        }
        if (
          roles.includes('ROLE_SCHOOLADMIN') ||
          roles.includes('ROLE_SCHOOLORG')
        ) {
          let collection = new SchoolCollection()
          collection.fetch().then(() => {
            this.actualValues = collection.models
          })
        }
      }
    }
  },
  mounted() {
    let empty = {}
    empty[this.displayField] = ''
    empty[this.fieldKey] = null
    if (this.values) {
      this.actualValues = this.values

      this.setSelectedValues()
    } else {
      if (Array.isArray(this.settings.values)) {
        this.actualValues = this.settings.values

        this.setSelectedValues()
      }
      if (this.isCollection) {
        let actualValuesCollection = this.settings.values
        let model = actualValuesCollection.model()
        model = new model()

        this.fieldKey = model.getOptions().identifier
        this.displayField = model.displayField()

        let response

        if (
          this.field === 'contact_username' ||
          this.field === 'student' ||
          this.field === 'mentor' ||
          this.field === 'school_organizer'
        ) {
          if (this.$acl.check('admin')) {
            response = actualValuesCollection.fetch()
          } else if (this.isSchoolUser) {
            response = actualValuesCollection.fetchInSchool()
          } else {
            response = actualValuesCollection.fetchInOrganization()
          }
        } else {
          response = actualValuesCollection.fetch()
        }

        // user organization odvisn od role...za podjetja al šole
        if (this.field === 'organization' && this.object instanceof User) {
          if (
            this.object.roles.includes('ROLE_SCHOOLADMIN') ||
            this.object.roles.includes('ROLE_SCHOOLORG') ||
            this.object.roles.includes('ROLE_STUDENT')
          ) {
            actualValuesCollection = new SchoolCollection()
          } else {
            actualValuesCollection = new EnterpriseCollection()
          }
          response = actualValuesCollection.fetch()
        }
        response.then(() => {
          this.actualValues = actualValuesCollection.models

          if (this.settings.filterRole) {
            this.actualValues = this.actualValues.filter(user =>
              user.roles.includes(this.settings.filterRole)
            )
          }

          // this.actualValues.unshift(empty)
          this.setSelectedValues()
        })
      }
    }
  },
  methods: {
    updateValues() {
      let $this = this
      if (this.settings.sendOnlyIds) {
        if (this.selectedValue) {
          this.object[this.field] = this.selectedValue
        }
        return true
      }
      if (Array.isArray(this.selectedValue)) {
        this.object[this.field] = this.items.filter(item =>
          this.selectedValue.includes($this.getValue(item))
        )
      } else {
        this.object[this.field] = this.items.find(
          item => $this.getValue(item) === this.selectedValue
        )
      }
    },
    setSelectedValues() {
      if (this.settings.multiple) {
        this.selectedValue = this.object[this.field].map(item => item.id)
      } else {
        if (this.object[this.field]) {
          if (typeof this.object[this.field] === 'object') {
            if (
              this.field === 'student' ||
              this.field === 'mentor' ||
              this.field === 'school_organizer'
            ) {
              this.selectedValue = this.object[this.field].username
            } else {
              this.selectedValue = this.object[this.field].id
            }
          } else {
            this.selectedValue = this.object[this.field]
          }
        }
      }
      this.updateValues()
    },
    getValue(item) {
      return item[this.fieldKey]
    },
    getDisplayValue(item, displayField) {
      if (typeof displayField === 'string') {
        return item[displayField]
      }
      if (displayField instanceof Array) {
        let string = ''
        for (let field of displayField) {
          string += item[field] + ' '
        }
        return string
      }

      return 'No display field'
    }
  }
}
</script>
