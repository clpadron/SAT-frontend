<template>
  <div>
    <vs-progress :height="12" :percent="getOverallProgress" :color="color">{{
      color
    }}</vs-progress>
  </div>
</template>

<script>
import Vue from 'vue'
import { GradeCollection } from '../../models/Grade'

export default Vue.extend({
  data() {
    return {
      gradesCollection: new GradeCollection()
    }
  },
  computed: {
    object() {
      return this.params.data
    },
    color() {
      let progress = this.getOverallProgress
      if (progress <= 33) {
        return 'danger'
      }
      if (progress <= 66) {
        return 'primary'
      } else {
        return 'success'
      }
    },
    getOverallProgress() {
      let progress = 0
      for (let grade of this.gradesCollection.models) {
        progress += grade.grade || 1
      }

      if (!this.gradesCollection.models.length) {
        return 0
      }

      progress = progress / this.gradesCollection.models.length
      progress = ((progress - 1) * 100) / (5 - 1)

      return progress
    }
  },

  mounted() {
    this.gradesCollection.fetch(this.object.id)
  },
  methods: {}
})
</script>
