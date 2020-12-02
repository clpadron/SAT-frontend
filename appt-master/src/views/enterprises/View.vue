<template>
  <div class="vx-row">
    <!-- HORIZONTAL LAYOUT -->
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card :title="enterpriseObject.name.toUpperCase()">
        <template v-for="(settings, key) in enterpriseObject.fieldsSettings()">
          <div v-if="settings.showInView" :key="key" class="mb-5">
            <small>{{ $t(settings.label) }}:</small>
            <h4>{{ enterpriseObject[key] }}</h4>
          </div>
        </template>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card :title="$t('STUDY_PROGRAMS.TITLE')">
        <template v-for="(studyProgram, key) in enterpriseObject.studyPrograms">
          <div :key="key" class="mb-5">
            <h6>
              {{ studyProgram.name }}
              <vs-button
                v-if="can('view', 'StudyProgram')"
                class="float-right"
                size="small"
                type="border"
                icon="remove_red_eye"
                @click="viewStudyProgram(studyProgram)"
              />
            </h6>
          </div>
        </template>
      </vx-card>
    </div>
    <div v-if="can('update', 'Enterprise')" class="vx-col text-right w-full">
      <vs-button @click="edit()">{{ $t('GLOBALS.EDIT') }} </vs-button>
    </div>
  </div>
</template>

<script>
import { Enterprise, EnterpriseCollection } from '../../models/Enterprise'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

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
      required: true
    }
  },
  data() {
    return {
      enterpriseObject: this.enterprise
    }
  },

  async mounted() {
    if (!this.enterpriseObject.id) {
      let enterprises = new EnterpriseCollection()
      await enterprises.fetch()
      this.enterpriseObject = enterprises.find(
        enterprise => enterprise.id === parseInt(this.id)
      )
    }
  },
  methods: {
    viewStudyProgram(studyProgram) {
      this.$router.push({
        name: 'study-programs-view',
        params: {
          id: studyProgram.id,
          studyProgram: studyProgram
        }
      })
    },
    edit() {
      this.$router.push({
        name: 'enterprises-edit',
        params: {
          id: this.enterpriseObject.id,
          enterprise: this.enterpriseObject
        }
      })
    }
  }
}
</script>
