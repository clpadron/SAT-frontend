<template>
  <div>
    <template v-for="(settings, key) in object.fieldsSettings()">
      <div v-if="settings.showInView" :key="key" class="mb-5 ml-5">
        <p>{{ $t(settings.label) }}:</p>
        <p>{{ object[key] }}</p>
      </div>
    </template>
  </div>
</template>

<script>
import { Enterprise } from '../../models/Enterprise'
import { User } from '../../models/User'

export default {
  props: {
    enterprise: {
      type: Object,
      default: () => new Enterprise()
    },
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      object: new Enterprise()
    }
  },

  async mounted() {
    if (this.data) {
      if (this.data instanceof Enterprise) {
        this.object = new Enterprise(this.data)
      } else {
        this.object = new User(this.data)
      }
    } else {
      this.object = this.enterprise
    }
  },
  methods: {}
}
</script>
