<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base">
      <div class="vx-row">
        <div class="vx-col md:w-1/2 w-full mb-base">
          <vx-card :title="$t('GLOBALS.DETAILS')">
            <template
              v-for="(settings, key) in studyProgramObject.fieldsSettings()"
            >
              <template v-if="isVisible(settings)">
                <v-select-box
                  v-if="settings.type === 'select'"
                  :key="key"
                  :settings="settings"
                  :object="studyProgramObject"
                  :disabled="!can('create', 'StudyProgram')"
                  :field="key"
                />
                <v-sub-form
                  v-else-if="settings.type === 'subForm'"
                  :key="key"
                  :object="studyProgramObject"
                  :disabled="!can('create', 'StudyProgram')"
                  :field="key"
                />
                <v-text-area
                  v-else-if="settings.type === 'textarea'"
                  :key="key"
                  :object="studyProgramObject"
                  :disabled="!can('create', 'StudyProgram')"
                  :field="key"
                />
                <v-text-box
                  v-else
                  :key="key"
                  :object="studyProgramObject"
                  :disabled="!can('create', 'StudyProgram')"
                  :field="key"
                />
              </template>
            </template>
          </vx-card>
        </div>
        <div class="vx-col md:w-1/2 w-full mb-base">
          <vx-card :title="$t('COMPETENCES.TITLE')">
            <div
              v-for="(studyCompetence, index) in studyCompetences.models"
              :key="index"
            >
              <div class="vx-row mb-6">
                <div class="vx-col sm:w-2/3 w-full">
                  <v-text-box :object="studyCompetence" field="name" />
                </div>
                <div class="vx-col sm:w-1/3 w-full">
                  <vs-button
                    class="float-right"
                    size="small"
                    type="border"
                    icon="delete"
                    @click="removeStudyCompetence(studyCompetence)"
                  />
                </div>
              </div>
              <div class="vx-row mb-6">
                <div class="vx-col w-full">
                  <v-text-area :object="studyCompetence" field="description" />
                </div>
              </div>
              <vs-divider />
            </div>
            <div class="vx-row mt-5">
              <div class="vx-col w-full ml-auto">
                <vs-button
                  type="border"
                  class="mb-2 float-right"
                  @click="addEmptyStudyCompetence"
                >
                  Add competence
                </vs-button>
              </div>
            </div>
          </vx-card>
        </div>
      </div>
      <vs-divider />

      <div class="vx-row">
        <div class="vx-col w-full mb-base">
          <h3 class="m-3">{{ $t('STUDY_MODULES.TITLE') }}</h3>

          <div
            v-for="(studyModule, index) in studyModules.models"
            :key="index"
            class="vx-row"
          >
            <div class="vx-col md:w-1/2 w-full mb-base">
              <vx-card :title="$t('GLOBALS.DETAILS')">
                <div class="vx-row mb-6">
                  <div class="vx-col sm:w-2/3 w-full">
                    <v-text-box :object="studyModule" field="name" />
                  </div>
                  <div class="vx-col sm:w-1/3 w-full">
                    <vs-button
                      class="float-right"
                      size="small"
                      type="border"
                      icon="delete"
                      @click="removeStudyModule(studyModule)"
                    />
                  </div>
                </div>
                <div class="vx-row mb-6">
                  <div class="vx-col w-full">
                    <v-text-area :object="studyModule" field="description" />
                  </div>
                </div>
              </vx-card>
            </div>
            <div class="vx-col md:w-1/2 w-full mb-base">
              <vx-card :title="$t('COMPETENCES.TITLE')">
                <div
                  v-for="(studyCompetence, index) in studyModule
                    .studyCompetences.models"
                  :key="index"
                >
                  <div class="vx-row mb-6">
                    <div class="vx-col  sm:w-2/3 w-full">
                      <vs-input
                        :label="$t('GLOBALS.NAME')"
                        v-model="studyCompetence.name"
                        class="w-full"
                        type="text"
                      />
                    </div>

                    <div class="vx-col  sm:w-1/3 w-full">
                      <vs-button
                        class="float-right"
                        size="small"
                        type="border"
                        icon="delete"
                        @click="
                          removeStudyCompetenceInModule(
                            studyModule,
                            studyCompetence
                          )
                        "
                      />
                    </div>
                  </div>
                  <div class="vx-row mb-6">
                    <div class="vx-col w-full">
                      <v-text-area
                        :object="studyCompetence"
                        field="description"
                      />
                    </div>
                  </div>
                  <vs-divider />
                </div>
                <div class="vx-row mt-5">
                  <div class="vx-col w-full text-right ml-auto">
                    <vs-button
                      class=""
                      @click="addEmptyStudyModuleCompetence(studyModule)"
                    >
                      Add competence
                    </vs-button>
                  </div>
                </div>
              </vx-card>
            </div>
          </div>
        </div>
      </div>

      <div class="vx-row mt-5">
        <div class="vx-col w-full text-right ml-auto">
          <vs-button class="mb-2 float-right" @click="addEmptyStudyModule">
            Add Module
          </vs-button>
        </div>
      </div>

      <vs-divider />
      <div class="vx-row mt-5">
        <div class="vx-col text-right w-full ml-auto">
          <vs-button class="mr-3 mb-2" @click="submit">{{
            $t('GLOBALS.SUBMIT')
          }}</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { StudyProgram, StudyProgramCollection } from '../../models/StudyProgram'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import VSubForm from '../../components/form/VSubForm'
import VTextArea from '../../components/form/VTextArea'
import {
  StudyCompetence,
  StudyCompetenceCollection
} from '../../models/StudyCompetence'
import { StudyModule, StudyModuleCollection } from '../../models/StudyModule'

export default {
  components: {
    VTextBox,
    VSelectBox,
    VSubForm,
    VTextArea
  },

  props: {
    studyProgram: {
      type: Object,
      default: () => new StudyProgram()
    },
    id: {
      type: [Number, String],
      default: () => null
    }
  },
  data() {
    return {
      studyProgramObject: this.studyProgram,
      studyCompetences: new StudyCompetenceCollection(),
      studyModules: new StudyModuleCollection()
    }
  },

  async mounted() {
    if (!this.studyProgramObject.id && this.id) {
      let studyPrograms = new StudyProgramCollection()
      await studyPrograms.fetch()
      this.studyProgramObject = studyPrograms.find(
        studyProgram => studyProgram.id === parseInt(this.id)
      )
    }
    this.studyCompetences = new StudyCompetenceCollection(
      this.studyProgramObject.studyCompetences
    )
    this.studyModules = new StudyModuleCollection(
      this.studyProgramObject.studyModules
    )
    for (let studyModule of this.studyModules.models) {
      studyModule.studyCompetences = new StudyCompetenceCollection(
        studyModule.studyCompetences
      )
    }
  },
  methods: {
    isVisible(settings) {
      if (this.studyProgramObject.id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },
    addEmptyStudyCompetence() {
      this.studyCompetences.add(new StudyCompetence())

      this.studyCompetences = new StudyCompetenceCollection(
        this.studyCompetences.models
      )
    },
    addEmptyStudyModule() {
      let studyModule = new StudyModule()
      studyModule.studyCompetences = new StudyCompetenceCollection()
      this.studyModules.add(studyModule)
      this.studyModules = new StudyModuleCollection(this.studyModules.models)
    },
    addEmptyStudyModuleCompetence(studyModule) {
      studyModule.studyCompetences.add(new StudyCompetence())
      studyModule.studyCompetences = new StudyCompetenceCollection(
        studyModule.studyCompetences.models
      )
    },
    removeStudyModule(studyModule) {
      this.studyModules.remove(studyModule)
      this.studyModules = new StudyModuleCollection(this.studyModules.models)
    },
    removeStudyCompetence(studyCompetence) {
      this.studyCompetences.remove(studyCompetence)
      this.studyCompetences = new StudyCompetenceCollection(
        this.studyCompetences.models
      )
    },
    removeStudyCompetenceInModule(studyModule, studyCompetence) {
      studyModule.studyCompetences.remove(studyCompetence)
      studyModule.studyCompetences = new StudyCompetenceCollection(
        studyModule.studyCompetences.models
      )
    },
    async submit() {
      this.studyProgramObject.studyCompetences = this.studyCompetences
      this.studyProgramObject.studyModules = this.studyModules
      let action = 'save'
      if (this.studyProgramObject.id) {
        action = 'patch'
      }
      this.studyProgramObject[action]()
        .then(() => {
          this.$router.push({ name: 'study-programs' })
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(this.studyProgramObject)
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
