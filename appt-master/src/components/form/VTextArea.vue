<template>
  <div class="vx-row mb-6">
    <div class="vx-col w-full">
      <label class="vs-input--label">
        {{ getLabel }}
      </label>
    </div>
    <div class="vx-col w-full">
      <vs-textarea
        v-if="normalTextearea"
        :danger="hasErrors(object, field)"
        :danger-text="errorText(object, field)"
        :type="fieldSettings.type"
        v-model="object[field]"
        :disabled="disabled"
        height="300px"
        class="w-full height-300"
      />
      <quill-editor
        v-else
        :options="quillOptions"
        :disabled="disabled"
        :style="
          hasErrors(object, field)
            ? 'border: 1px solid rgba(var(--vs-danger),1) !important'
            : ''
        "
        :danger-text="errorText(object, field)"
        v-model="object[field]"
        style="min-height:300px;"
      />
      <div>
        <div
          class="con-text-validation span-text-validation-danger vs-input--text-validation-span v-enter-to"
          style="height: 20px;"
        >
          <span class="span-text-validation">
            {{ errorText(object, field) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { Collection } from 'vue-mc'

export default {
  name: 'VTextArea',
  components: {
    quillEditor
  },
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
    normalTextearea: {
      type: Boolean,
      required: false,
      default: false
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
    getLabel() {
      let label = ''
      if (this.label) {
        label = this.label
      } else {
        label = this.fieldSettings.label
      }

      label = this.$t(label)

      if (this.isRequired) {
        label += '*'
      }
      return label
    },
    isRequired() {
      return !!this.object.validation()[this.field]
    }
  }
}
</script>

<style scoped lang="scss">
.height-300 {
  /deep/ textarea {
    height: 300px;
  }
}
</style>
