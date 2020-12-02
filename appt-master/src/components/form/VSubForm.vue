<template>
  <div class="vx-row mb-6">
    <div class="vx-col sm:w-1/3 w-full">
      <span>{{ getLabel }}</span>
    </div>
    <div class="vx-col sm:w-2/3 w-full"></div>
  </div>
</template>

<script>
import { Collection } from 'vue-mc'

export default {
  name: 'VSubForm',
  props: {
    object: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      default: null
    },
    field: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      displayField: 'name',
      fieldKey: 'id',
      values: []
    }
  },
  computed: {
    fieldSettings() {
      return this.object.fieldsSettings()[this.field]
    },
    getLabel() {
      if (!this.label) {
        return this.fieldSettings.label
      }
      return this.label
    },
    isCollection() {
      return this.fieldSettings.values instanceof Collection
    }
  },
  mounted() {
    if (Array.isArray(this.fieldSettings.values)) {
      this.values = this.fieldSettings.values
    }
    if (this.isCollection) {
      this.values = this.fieldSettings.values
      let model = this.values.model()
      model = new model()

      this.fieldKey = model.getOptions().identifier
      this.displayField = model.displayField()

      this.values.fetch()
    }
  }
}
</script>
