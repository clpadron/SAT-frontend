<template>
  <div id="dashboard">
    <div class="vx-row">
      <!-- CARD 1: CONGRATS -->
      <div class="vx-col w-full  mb-base">
        <h2>Home</h2>

        <vx-card
          v-if="can('viewStudentUnsigned', 'InternshipAgreement')"
          class="mt-5"
        >
          <vs-row>
            <vs-col>
              <h4 v-if="$acl.check('student')" class="mb-5">
                {{ $t('GLOBALS.YOUR_UNSIGNED_AGREEMENT_CONTRACTS') }}
              </h4>
              <h4 v-else class="mb-5">
                {{ $t('GLOBALS.STUDENTS_UNSIGNED_AGREEMENT_CONTRACTS') }}
              </h4>
              <ag-grid-vue
                :column-defs="headerColumns"
                :row-data="unsignedStudentInternshipAgreement.models"
                :grid-options="gridOptions"
                :default-col-def="defaultColDef"
                :pagination="true"
                :pagination-page-size="10"
                class="ag-theme-material w-100 my-4 ag-grid-table"
              />
            </vs-col>
          </vs-row>
        </vx-card>
        <vx-card
          v-if="can('viewOrganizationUnsigned', 'InternshipAgreement')"
          class="mt-5"
        >
          <vs-row>
            <vs-col>
              <h4 class="mb-5">
                {{ $t('GLOBALS.ORGANIZATION_UNSIGNED_AGREEMENT_CONTRACTS') }}
              </h4>
              <ag-grid-vue
                :column-defs="headerColumns"
                :row-data="unsignedOrganizationInternshipAgreement.models"
                :grid-options="gridOptions"
                :default-col-def="defaultColDef"
                :pagination="true"
                :pagination-page-size="10"
                class="ag-theme-material w-100 my-4 ag-grid-table"
              />
            </vs-col>
          </vs-row>
        </vx-card>
        <vx-card
          v-if="can('viewAllUnsigned', 'InternshipAgreement')"
          class="mt-5"
        >
          <vs-row>
            <vs-col>
              <h4 class="mb-5">
                {{ $t('GLOBALS.ALL_UNSIGNED_AGREEMENT_CONTRACTS') }}
              </h4>
              <ag-grid-vue
                :column-defs="headerColumns"
                :row-data="unsignedInternshipAgreement.models"
                :grid-options="gridOptions"
                :default-col-def="defaultColDef"
                :pagination="true"
                :pagination-page-size="10"
                class="ag-theme-material w-100 my-4 ag-grid-table"
              />
            </vs-col>
          </vs-row>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import {
  InternshipAgreement,
  InternshipAgreementCollection
} from '../models/InternshipAgreement'
import axios from 'axios'
import CellRendererActions from './internship-agreements/CellRendererActions'
import CellRendererProgress from './internship-agreements/CellRendererProgress'
import tableMixin from '../mixins/tableMixin'
import { AgGridVue } from 'ag-grid-vue'

export default {
  components: {
    AgGridVue
  },
  mixins: [tableMixin],
  data() {
    return {
      unsignedStudentInternshipAgreement: new InternshipAgreementCollection(),
      unsignedOrganizationInternshipAgreement: new InternshipAgreementCollection(),
      unsignedInternshipAgreement: new InternshipAgreementCollection()
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
    await this.syncUsers()
    if (this.can('viewStudentUnsigned', 'InternshipAgreement')) {
      await this.unsignedStudentInternshipAgreement.fetchUnsignedStudent()
    }
    await this.unsignedOrganizationInternshipAgreement.fetchUnsignedOrganization()
    await this.unsignedInternshipAgreement.fetchUnsigned()

    this.resizeFit()
  },
  methods: {
    syncUsers() {
      const domain = process.env.VUE_APP_JAGER_API
      let axios1 = axios.create({
        baseURL: domain
      })
      return axios1
        .get('sync-users')
        .then(() => {})
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
