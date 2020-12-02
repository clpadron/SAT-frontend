<template>
  <div>
    <div
      v-for="(evaluationTemplateObject,
      objectId) in evaluationTemplatesCollection.models"
      :key="objectId"
      class="vx-row"
    >
      <div class="vx-col md:w-6/12 w-full mb-base">
        <vs-card actionable fixed-height>
          <template
            v-for="(settings, key) in evaluationTemplateObject.fieldsSettings()"
          >
            <template v-if="isVisible(settings, evaluationTemplateObject)">
              <v-select-box
                v-if="settings.type === 'select'"
                :key="key"
                :settings="settings"
                :object="evaluationTemplateObject"
                :field="key"
              />
              <v-text-box
                v-else
                :key="key"
                :object="evaluationTemplateObject"
                :field="key"
              />
            </template>
          </template>
        </vs-card>
      </div>
      <div class="vx-col md:w-5/12 w-full mb-base">
        <vs-card fixed-height actionable>
          <vs-select
            v-model="evaluationTemplateObject.type"
            :label="$t('GLOBALS.QUESTION_TYPE')"
            class="w-full"
            autocomplete
          >
            <vs-select-item
              v-for="type in questionTypes"
              :key="type"
              :value="type"
              :text="type"
            />
          </vs-select>

          <template v-if="showOptions(evaluationTemplateObject.type)">
            <div
              v-for="(option, key) in evaluationTemplateObject.optionsArray"
              :key="key"
              class="vx-row"
            >
              <div class="vx-col md:w-12/12 w-full">
                <vs-divider />
              </div>
              <div class="vx-col md:w-11/12 w-full">
                <vs-input
                  :label="$t('GLOBALS.OPTION')"
                  v-model="option.value"
                  class="w-full"
                />
              </div>
              <div class="vx-col md:w-1/12">
                <vs-button
                  class="float-right mt-6"
                  size="small"
                  type="border"
                  icon="delete"
                  @click="removeOption(evaluationTemplateObject, key)"
                />
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-button
                  class="mt-10 float-right"
                  @click="addOption(evaluationTemplateObject)"
                  >{{ $t('GLOBALS.ADD_OPTION') }}</vs-button
                >
              </div>
            </div>
          </template>
        </vs-card>
      </div>
      <div class="vx-col md:w-1/12 w-full mb-base">
        <vs-button
          class="float-right "
          size=""
          type="border"
          icon="delete"
          @click="remove(evaluationTemplateObject)"
        />
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col sm:w-3/3 w-full ml-auto">
        <vs-button class="mr-3 mb-2" @click="addItem">{{
          $t('GLOBALS.ADD_ITEM')
        }}</vs-button>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col sm:w-3/3 w-full ml-auto">
        <vs-button class="mr-3 mb-2" @click="submit">{{
          $t('GLOBALS.SAVE_ALL')
        }}</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  EvaluationTemplate,
  EvaluationTemplateCollection
} from '../../models/EvaluationTemplate'
import VTextBox from '../../components/form/VTextBox'
import VSelectBox from '../../components/form/VSelectBox'
import axios from '../../axios'

export default {
  components: {
    VTextBox,
    VSelectBox
  },

  props: {
    saveMethod: {
      type: String,
      required: true
    },
    listMethod: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      evaluationTemplatesCollection: new EvaluationTemplateCollection(),

      selectedQuestionTypes: [],
      questionTypes: ['text', 'select', 'checkbox'],
      options: [],
      internshipAgreementObject: null,
      userid: null
    }
  },
  computed: {},
  watch: {
    saveMethod() {
      this.loadData()
    }
  },

  mounted() {
    let id = this.$route.params.id
    if (id) {
      this.id = id
    }
    this.loadData()
  },

  methods: {
    showOptions(questionType) {
      return questionType === 'select' || questionType === 'checkbox'
    },
    async loadData() {
      if (this.id) {
        let tempCollection = new EvaluationTemplateCollection()

        await tempCollection[this.listMethod](this.id)
        if (tempCollection.models.length) {
          this.internshipAgreementObject = tempCollection.models[0].organization
          this.userid = tempCollection.models[0].userid
        }
        let questions = tempCollection.models.map(
          evaluationTemplate => evaluationTemplate.question
        )
        this.evaluationTemplatesCollection = new EvaluationTemplateCollection(
          questions
        )
      } else {
        await this.evaluationTemplatesCollection[this.listMethod]()
      }
      let tmp = new EvaluationTemplateCollection()
      for (let evaluationTemplate of this.evaluationTemplatesCollection
        .models) {
        evaluationTemplate.type = this.getQuestionType(evaluationTemplate)
        evaluationTemplate.optionsArray = this.getQuestionOptions(
          evaluationTemplate
        )
        tmp.add(evaluationTemplate)
      }
      this.evaluationTemplatesCollection = new EvaluationTemplateCollection(
        tmp.models
      )
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
    isVisible(settings, evaluationTemplateObject) {
      if (evaluationTemplateObject.id) {
        return settings.showOnUpdate
      }
      return settings.showOnCreate
    },
    addItem() {
      let item = new EvaluationTemplate()
      this.evaluationTemplatesCollection.add(item)
      this.evaluationTemplatesCollection = new EvaluationTemplateCollection(
        this.evaluationTemplatesCollection.models
      )
    },

    submit() {
      let tmp = new EvaluationTemplateCollection()

      for (let evaluationTemplate of this.evaluationTemplatesCollection
        .models) {
        evaluationTemplate.options = JSON.stringify({
          type: evaluationTemplate.type,
          options: evaluationTemplate.optionsArray
        })
        tmp.add(evaluationTemplate)
      }
      this.evaluationTemplatesCollection = new EvaluationTemplateCollection(
        tmp.models
      )
      let object = this.evaluationTemplatesCollection
      if (this.id) {
        object = object[this.saveMethod](this.id)
      } else {
        object = object[this.saveMethod]()
      }
      object
        .then(() => {
          this.$vs.notify({
            color: 'success',
            title: this.$t('GLOBALS.RECORD_CREATED'),
            text: this.$t('GLOBALS.RECORD_SUCCESSFULLY_CREATED')
          })
        })
        .catch(error => {
          this.showValidationErrors(object)
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.ERROR_ON_SAVE'),
            text: error.message
          })
        })
    },
    addOption(evaluationTemplateObject) {
      let tmp = evaluationTemplateObject.optionsArray
      tmp.push({ value: '' })

      this.$set(evaluationTemplateObject, 'optionsArray', tmp)
    },

    removeOption(evaluationTemplateObject, index) {
      evaluationTemplateObject.options.splice(index, 1)
    },
    remove(object) {
      this.evaluationTemplatesCollection.remove(object)
    }
  }
}
</script>
