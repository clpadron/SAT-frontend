<template>
  <vx-card>
    <vs-button
      v-if="can('createAny', 'User')"
      class="mb-3 float-right"
      icon="add"
      type="border"
      to="/users/create"
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
          :row-data="users.models"
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

import { User, UserCollection } from '../../models/User'
import { EnterpriseCollection } from '../../models/Enterprise'
import { SchoolCollection } from '../../models/School'
import CellRendererActions from './CellRendererActions'
import { AgGridVue } from 'ag-grid-vue'
import tableMixin from '../../mixins/tableMixin'

export default {
  components: {
    AgGridVue
  },
  mixins: [tableMixin],
  props: {
    inOrganization: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      users: new UserCollection(),
      enterprises: new EnterpriseCollection(),
      schools: new SchoolCollection(),
      activeConfirm: false,
      context: { componentParent: this }
    }
  },
  computed: {
    headerColumns() {
      return this.getTableHeaderColumns(new User(), CellRendererActions)
    }
  },
  async mounted() {
    await this.loadData()
    this.resizeFit()
  },

  methods: {
    async loadData() {
      if (this.isAdmin) {
        await this.users.fetch()
      } else if (this.isSchoolUser) {
        await this.users.fetchInSchool()
      } else {
        await this.users.fetchInOrganization()
      }
      await this.enterprises.fetch()
      await this.schools.fetch()

      let params = {
        force: true,
        suppressFlash: true
      }
      this.gridOptions.api.refreshCells(params)
    }
  }
}
</script>
