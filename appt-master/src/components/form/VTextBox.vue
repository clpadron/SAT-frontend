<template>
  <div class="vx-row mb-6">
    <div class="vx-col w-full">
      <vs-input
        :danger="hasErrors(object, field)"
        :danger-text="errorText(object, field)"
        :type="fieldSettings.type"
        :label="getLabel"
        v-model="object[field]"
        :disabled="disabled"
        class="w-full"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'VTextBox',
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
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    fieldSettings() {
      return this.object.fieldsSettings()[this.field]
    },
    isRequired() {
      return !!this.object.validation()[this.field]
    },
    getLabel() {
      let label = ''
      if (this.label) {
        label = this.label
      } else {
        label = this.fieldSettings.label
      }

      label = this.$t(label)

      if (this.isRequired) {
        label += ' *'
      }
      return label
    }
  }
}
</script>
