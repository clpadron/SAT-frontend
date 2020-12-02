<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/3 w-full mb-base">
      <vx-card :title="$t('GLOBALS.DETAILS')">
        <template
          v-for="(settings, key) in studyProgramObject.fieldsSettings()"
        >
          <div v-if="settings.showInView" :key="key" class="mb-5">
            <h6>{{ $t(settings.label) }}:</h6>
            <p v-html="studyProgramObject[key]" />
          </div>
        </template>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/3 w-full mb-base">
      <vx-card :title="$t('STUDY_MODULES.TITLE')">
        <template v-for="(module, key) in studyProgramObject.studyModules">
          <div :key="key">
            <div class="mb-5">
              <h6>{{ module.name }}</h6>
              <p v-html="module.description" />
            </div>
            <h5 v-if="module.studyCompetences.length">
              {{ $t('COMPETENCES.TITLE') }}:
            </h5>
            <template v-for="(competence, keyInner) in module.studyCompetences">
              <div :key="keyInner + 1000" class="mb-5">
                <h6>{{ competence.name }}:</h6>
                <p v-html="competence.description" />
              </div>
            </template>
            <vs-divider />
          </div>
        </template>
        <span v-if="!studyProgramObject.studyModules.length">
          {{ $t('GLOBALS.NO_ITEMS') }}
        </span>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/3 w-full mb-base">
      <vx-card :title="$t('COMPETENCES.TITLE')">
        <template
          v-for="(competence, key) in studyProgramObject.studyCompetences"
        >
          <div :key="key" class="mb-5">
            <h6>{{ competence.name }}</h6>
            <p v-html="competence.description" />
            <vs-divider />
          </div>
        </template>
        <h6 v-if="!studyProgramObject.studyCompetences.length">
          {{ $t('GLOBALS.NO_ITEMS') }}
        </h6>
      </vx-card>
    </div>
    <div class="vx-col text-right w-full">
      <vs-button v-if="can('update', 'StudyProgram')" @click="edit()"
        >{{ $t('GLOBALS.EDIT') }}
      </vs-button>
    </div>
  </div>
</template>

<script>
import { StudyProgram, StudyProgramCollection } from '../../models/StudyProgram'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    studyProgram: {
      type: Object,
      default: () => new StudyProgram()
    },
    id: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      studyProgramObject: this.studyProgram
    }
  },

  async mounted() {
    if (!this.studyProgramObject.id) {
      let studyPrograms = new StudyProgramCollection()
      await studyPrograms.fetch()
      this.studyProgramObject = studyPrograms.find(
        studyProgram => studyProgram.id === parseInt(this.id)
      )
    }
  },
  methods: {
    edit() {
      this.$router.push({
        name: 'study-programs-edit',
        params: {
          id: this.studyProgramObject.id,
          studyProgram: this.studyProgramObject
        }
      })
    }
  }
}
</script>
