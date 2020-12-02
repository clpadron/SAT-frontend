<template>
  <vx-card>
    <vs-table :data="evaluations.models" stripe>
      <template slot="header">
        <vs-button
          v-if="can('create', 'Evaluation')"
          class="mb-3 float-right"
          icon="add"
          type="border"
          to="/evaluations/create"
        />
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
              v-if="can('view', 'Evaluation')"
              class="inline-block mr-2"
              size="small"
              type="border"
              icon="remove_red_eye"
              @click="view(object)"
            />
            <vs-button
              v-if="can('update', 'Evaluation')"
              class="inline-block mr-2"
              size="small"
              type="border"
              icon="edit"
              @click="edit(object)"
            />
            <vx-tooltip
              v-if="can('delete', 'Evaluation')"
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
                @click="deleteEvaluation(object)"
              />
            </vx-tooltip>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { Evaluation, EvaluationCollection } from '../../models/Evaluation'

export default {
  data() {
    return {
      evaluations: new EvaluationCollection(),
      activeConfirm: false
    }
  },
  computed: {
    fieldsSettings() {
      let evaluation = new Evaluation()
      return evaluation.fieldsSettings()
    },
    identifier() {
      let evaluation = new Evaluation()
      return evaluation.getOptions().identifier
    }
  },
  mounted() {
    this.evaluations.fetch()
  },
  methods: {
    deleteEvaluation(evaluation) {
      evaluation
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
    edit(evaluation) {
      this.$router.push({
        name: 'evaluations-edit',
        params: {
          id: evaluation.id,
          evaluation: evaluation
        }
      })
    },
    view(evaluation) {
      this.$router.push({
        name: 'evaluations-view',
        params: {
          id: evaluation.id,
          evaluation: evaluation
        }
      })
    }
  }
}
</script>
