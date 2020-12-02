<template>
  <vx-card>
    <vs-row>
      <vs-col>
        <vs-button
          v-if="can('create', 'InternshipAgreement')"
          icon="add"
          type="border"
          to="/internship-agreements/create"
          >{{ $t('GLOBALS.ADD_NEW') }}</vs-button
        >
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
          :row-data="internshipAgreements.models"
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

import {
  InternshipAgreement,
  InternshipAgreementCollection
} from '../../models/InternshipAgreement'
import { AgGridVue } from 'ag-grid-vue'
import CellRendererActions from './CellRendererActions'
import CellRendererProgress from './CellRendererProgress'
import tableMixin from '../../mixins/tableMixin'

export default {
  components: {
    AgGridVue
  },
  mixins: [tableMixin],
  data() {
    return {
      internshipAgreements: new InternshipAgreementCollection(),
      context: { componentParent: this }
    }
  },
  computed: {
    headerColumns() {
      let headers = this.getTableHeaderColumns(
        new InternshipAgreement(),
        CellRendererActions
      )

      headers.splice(5, 0, {
        headerName: 'Progress',
        field: 'transactions',
        width: 150,
        cellRendererFramework: CellRendererProgress
      })

      return headers
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      if (this.isAdmin) {
        await this.internshipAgreements.fetch()
      } else if (this.isOrganizationUser) {
        await this.internshipAgreements.fetchOrganization()
      } else if (this.isStudent) {
        await this.internshipAgreements.fetchStudent()
      } else {
        await this.internshipAgreements.fetch()
      }

      this.resizeFit()
    },
    signInternshipAgreement(internship) {
      internship
        .signInternshipAgreement()
        .then(() => {
          this.$vs.notify({
            color: 'success',
            title: this.$t('signedSuccessfulTitle'),
            text: this.$t('signedSuccessfulContent')
          })
        })
        .catch(error => {
          this.$vs.notify({
            color: 'danger',
            title: this.$t('GLOBALS.SOMETHING_WENT_WRONG'),
            text: error.message
          })
        })
    }
  }
}
</script>
