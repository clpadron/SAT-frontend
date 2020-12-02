export default {
  data() {
    return {
      columnDefs: null,
      tableSearch: '',
      defaultColDef: {
        sortable: true,
        editable: true,
        resizable: true,
        suppressMenu: true
      },
      gridOptions: {
        api: {
          autoHeight: true
        }
      }
    }
  },
  computed: {},
  watch: {
    tableSearch() {
      this.gridOptions.api.setQuickFilter(this.tableSearch)
      this.resizeFit()
    }
  },
  methods: {
    resizeFit() {
      // this.gridOptions.api.sizeColumnsToFit()
      this.gridOptions.api.setDomLayout('autoHeight')
    },

    getTableHeaderColumns(object, renderer = null) {
      let columns = []
      let settings = object.fieldsSettings()

      for (let [field, setting] of Object.entries(settings)) {
        if (!setting.showInList) {
          continue
        }
        let options = {
          headerName: this.$t(setting.label),
          field: field,
          filter: setting.filter || false,
          pinned: setting.pinned || false,
          valueFormatter: this.checkValue,
          getQuickFilterText: this.checkValue
        }
        if (setting.width) {
          options.width = setting.width
        }
        columns.push(options)
      }
      if (renderer) {
        columns.push({
          headerName: 'Actions',
          field: 'transactions',
          width: 150,
          pinned: 'right',
          cellRendererFramework: renderer
        })
      }
      return columns
    },
    checkValue(params) {
      if (params.value && typeof params.value === 'object') {
        return this.getObjectDisplayValue(params.value)
      }
      let settings = params.data.fieldsSettings()[params.colDef.field]
      if (params.value && params.colDef.field === 'organization') {
        return this.getOrganizationName(params.value)
      }
      if (params.value && settings.type === 'date') {
        return this.$moment(new Date(params.value)).format('DD.MM.YYYY hh:mm')
      }
      if (params.value && settings.type === 'textarea') {
        return params.value.replace(/<\/?[^>]+(>|$)/g, '')
      }
      return params.value
    },
    getOrganizationName(organizationId) {
      if (!organizationId) {
        return ''
      }
      let organization = this.enterprises.find(
        enterprise => enterprise.id === organizationId
      )

      if (!organization) {
        organization = this.schools.find(
          enterprise => enterprise.id === organizationId
        )
      }
      if (!organization) {
        return ''
      }
      return organization.name
    },
    getObjectDisplayValue(object) {
      if (object.name) {
        return object.name
      }
      if (object.first_name) {
        return object.first_name + ' ' + object.last_name
      }
      if (object.username) {
        return object.username
      }
      return object
    }
  }
}
