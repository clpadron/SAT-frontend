<template>
  <vx-card>
    <vs-table :data="schools.models" stripe>
      <template slot="header">
        <vs-button
          class="mb-3 float-right"
          icon="add"
          type="border"
          to="/schools/create"
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
                @click="deleteSchool(object)"
              ></vs-button>
            </vx-tooltip>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import { School, SchoolCollection } from '../../models/School'

export default {
  data() {
    return {
      schools: new SchoolCollection(),
      activeConfirm: false
    }
  },
  computed: {
    fieldsSettings() {
      let school = new School()
      return school.fieldsSettings()
    },
    identifier() {
      let school = new School()
      return school.getOptions().identifier
    }
  },
  mounted() {
    this.schools.fetch()
  },
  methods: {
    deleteSchool(school) {
      school
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
    edit(school) {
      this.$router.push({
        name: 'schools-edit',
        params: {
          id: school.id,
          school: school
        }
      })
    }
  }
}
</script>
