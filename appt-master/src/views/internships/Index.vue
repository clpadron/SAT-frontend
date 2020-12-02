<template>
  <vx-card>
    <vs-button
      v-if="can('create', 'Internship')"
      class="mb-3 float-right"
      icon="add"
      type="border"
      to="/internships/create"
    />
    <vs-row>
      <vs-col>
        <vs-input
          :placeholder="$t('GLOBALS.SEARCH')"
          v-model="tableSearch"
          class="float-right"
        />
      </vs-col>
    </vs-row>

    <vs-row>
      <vs-col>
        <ag-grid-vue
          :column-defs="headerColumns"
          :row-data="internships.models"
          :grid-options="gridOptions"
          :default-col-def="defaultColDef"
          :context="context"
          :pagination="true"
          :pagination-page-size="10"
          class="ag-theme-material w-100 my-4 ag-grid-table"
        />
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

import { Internship, InternshipCollection } from '../../models/Internship'
import { InternshipAgreementCollection } from '../../models/InternshipAgreement'
import CellRendererActions from './CellRendererActions'
import { AgGridVue } from 'ag-grid-vue'
import tableMixin from '../../mixins/tableMixin'

export default {
  components: {
    AgGridVue
  },
  mixins: [tableMixin],
  data() {
    return {
      internshipAgreements: new InternshipAgreementCollection(),
      internships: new InternshipCollection(),
      context: { componentParent: this }
    }
  },
  computed: {
    headerColumns() {
      return this.getTableHeaderColumns(new Internship(), CellRendererActions)
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      if (this.$acl.check('student')) {
        let activeUser = this.$store.state.AppActiveUser
        if (activeUser.studyprogram) {
          await this.internships.fetchForStudyProgram(
            activeUser.studyprogram.id
          )
        }
      } else {
        await this.internships.fetch()
      }

      if (this.can('apply', 'Internship')) {
        await this.internshipAgreements.fetchStudent()
      }

      this.resizeFit()
    }
  }
}
</script>
