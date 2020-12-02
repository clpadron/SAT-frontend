<template>
  <vx-card>
    <vs-button
      v-if="can('create', 'StudyProgram')"
      class="mb-3 float-right"
      icon="add"
      type="border"
      to="/study-programs/create"
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
          :row-data="studyPrograms.models"
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

import { StudyProgram, StudyProgramCollection } from '../../models/StudyProgram'
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
      studyPrograms: new StudyProgramCollection(),
      activeConfirm: false,
      context: { componentParent: this }
    }
  },
  computed: {
    headerColumns() {
      return this.getTableHeaderColumns(new StudyProgram(), CellRendererActions)
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      await this.studyPrograms.fetch()
      this.resizeFit()
    }
  }
}
</script>
