<template>
  <vx-card>
    <vs-row>
      <vs-col>
        <vs-button
          v-if="can('create', 'Enterprise')"
          class="mb-3 float-left"
          icon="add"
          type="border"
          to="/enterprises/create"
        />
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
          :row-data="enterprises.models"
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

import { Enterprise, EnterpriseCollection } from '../../models/Enterprise'
import { AgGridVue } from 'ag-grid-vue'
import CellRendererActions from './CellRendererActions'
import tableMixin from '../../mixins/tableMixin'
export default {
  components: {
    AgGridVue
  },
  mixins: [tableMixin],
  data() {
    return {
      enterprises: new EnterpriseCollection(),
      activeConfirm: false,
      context: { componentParent: this }
    }
  },
  computed: {
    headerColumns() {
      return this.getTableHeaderColumns(new Enterprise(), CellRendererActions)
    }
  },
  async mounted() {
    await this.enterprises.fetch()
  },
  methods: {
    async loadData() {
      await this.enterprises.fetch()
    }
  }
}
</script>
