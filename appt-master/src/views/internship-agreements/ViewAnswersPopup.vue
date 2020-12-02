<template>
  <vs-popup :active.sync="open" :title="$t('GLOBALS.EVALUATE')">
    <div class="inner-popup ml-3 ml-r">
      <template v-for="(answer, index) in answers.models">
        <div :key="index" class="vx-row">
          <div class="vx-col w-full ">
            <h4>{{ answer.question.question }}</h4>
            <p class="mb-5">{{ answer.answer }}</p>
          </div>
        </div>
      </template>
    </div>
  </vs-popup>
</template>

<script>
import { AnswerCollection } from '../../models/Answer'

export default {
  name: 'ViewAnswersPopup',
  props: {
    answers: {
      type: Object,
      default: () => new AnswerCollection()
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      open: this.visible
    }
  },
  watch: {
    open() {
      if (!this.open) {
        this.$emit('close')
      }
    },
    visible() {
      this.open = this.visible
    }
  },
  async mounted() {},
  methods: {}
}
</script>
