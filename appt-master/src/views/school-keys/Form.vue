<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <vx-card>
        <template v-for="(settings, key) in schoolKeyObject.fieldsSettings()">
          <template v-if="isVisible(settings)">
            <v-select-box
              v-if="settings.type === 'select'"
              :key="key"
              :settings="settings"
              :object="schoolKeyObject"
              :field="key"
            />
            <v-text-area
              v-if="settings.type === 'textarea'"
              :normal-textearea="true"
              :key="key"
              :object="schoolKeyObject"
              :field="key"
            />
            <v-text-box
              v-else
              :key="key"
              :object="schoolKeyObject"
              :field="key"
            />
          </template>
        </template>

        <div class="vx-row">
          <div class="vx-col sm:w-2/3 w-full ml-auto">
            <vs-button class="mr-3 mb-2" @click="submit">{{
              $t('GLOBALS.SUBMIT')
            }}</vs-button>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { SchoolKey } from '../../models/SchoolKey'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import { SchoolKeyCollection } from '../../models/SchoolKey'
import VTextArea from '../../components/form/VTextArea'

export default {
  components: {
    VTextArea,
    VTextBox,
    VSelectBox
  },

  props: {
    schoolKey: {
      type: Object,
      default: () => new SchoolKey()
    },
    id: {
      type: [Number, String],
      default: () => null
    }
  },

  data() {
    return {
      schoolKeyObject: this.schoolKey
    }
  },
  async mounted() {
    if (!this.schoolKeyObject.school_id && this.id) {
      let schoolKeys = new SchoolKeyCollection()
      await schoolKeys.fetch()
      this.schoolKeyObject = schoolKeys.find(
        schoolKey => schoolKey.school_id === this.id
      )
    } else {
      this.schoolKeyObject = this.schoolKey
    }
  },
  methods: {
    isVisible(settings) {
      let id = this.$route.params.id
      if (id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },
    submit() {
      let action = 'save'

      if (this.id) {
        action = 'patch'
      }
      this.schoolKeyObject[action]()
        .then(() => {
          this.$router.push({ name: 'school-keys' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(this.schoolKeyObject)
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
