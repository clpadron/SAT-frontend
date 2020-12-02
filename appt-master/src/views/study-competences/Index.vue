<template>
  <vx-card>
    <vs-table :data="studyCompetences.models" stripe>
      <template slot="header">
        <vs-button
          class="mb-3 float-right"
          icon="add"
          type="border"
          to="/study-competences/create"
        ></vs-button>
      </template>
      <template slot="thead">
        <template v-for="(fieldSettings, field) in fieldsSettings">
          <vs-th v-if="fieldSettings.showInList" :key="field"
            >{{ $t(fieldSettings.label) }}
          </vs-th>
        </template>
        <vs-th class="w-48">{{ $t('GLOBALS.ACTIONS') }}</vs-th>
      </template>

      <template slot-scope="{ data }">
        <vs-tr v-for="(object, index) in data" :key="index">
          <template v-for="(fieldSettings, field) in fieldsSettings">
            <vs-td
              v-if="fieldSettings.showInList"
              :key="field"
              :data="object[field]"
            >
              {{ object[field] }}
            </vs-td>
          </template>

          <vs-td>
            <vs-button
              class="inline-block mr-2"
              size="small"
              type="border"
              icon="edit"
              @click="edit(object)"
            ></vs-button>
            <vx-tooltip
              :title="$t('GLOBALS.ARE_YOU_SURE')"
              class="inline-block mr-2"
              color="danger"
            >
              <vs-button
                class=""
                size="small"
                color="danger"
                type="border"
                icon="delete"
                @click="deleteStudyCompetence(object)"
              ></vs-button>
            </vx-tooltip>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import {
  StudyCompetence,
  StudyCompetenceCollection
} from '../../models/StudyCompetence'

export default {
  data() {
    return {
      studyCompetences: new StudyCompetenceCollection(),
      activeConfirm: false
    }
  },
  computed: {
    fieldsSettings() {
      let studyCompetence = new StudyCompetence()
      return studyCompetence.fieldsSettings()
    },
    identifier() {
      let studyCompetence = new StudyCompetence()
      return studyCompetence.getOptions().identifier
    }
  },
  mounted() {
    this.studyCompetences.fetch()
  },
  methods: {
    deleteStudyCompetence(studyCompetence) {
      studyCompetence
        .delete()
        .then(() => {
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
    },
    edit(studyCompetence) {
      this.$router.push({
        name: 'study-competences-edit',
        params: {
          id: studyCompetence.id,
          studyCompetence: studyCompetence
        }
      })
    }
  }
}
</script>
