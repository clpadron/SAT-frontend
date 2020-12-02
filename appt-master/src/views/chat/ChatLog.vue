<!-- =========================================================================================
    File Name: ChatLog.vue
    Description: Chat Application - Log of chat
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div v-if="chatData" id="component-chat-log" class="m-8">
    <div
      v-for="(msg, index) in chatData.msg"
      :key="index"
      class="msg-grp-container"
    >
      <!-- If previous msg is older than current time -->
      <template v-if="chatData.msg[index - 1]">
        <vs-divider
          v-if="!isSameDay(msg.time, chatData.msg[index - 1].time)"
          class="msg-time"
        >
          <span>{{ toDate(msg.time) }}</span>
        </vs-divider>
        <div
          v-if="!hasSentPreviousMsg(chatData.msg[index - 1].isSent, msg.isSent)"
          class="spacer mt-8"
        ></div>
      </template>

      <div
        :class="[{ 'flex-row-reverse': msg.isSent }]"
        class="flex items-start"
      >
        <template v-if="chatData.msg[index - 1]">
          <template
            v-if="
              !hasSentPreviousMsg(chatData.msg[index - 1].isSent, msg.isSent) ||
                !isSameDay(msg.time, chatData.msg[index - 1].time)
            "
          >
            <vs-avatar
              :class="msg.isSent ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
              :src="senderImg(msg.isSent)"
              size="40px"
              class="border-2 shadow border-solid border-white m-0 flex-shrink-0"
            ></vs-avatar>
          </template>
        </template>

        <template v-if="index == 0">
          <vs-avatar
            :class="msg.isSent ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
            :src="senderImg(msg.isSent)"
            size="40px"
            class="border-2 shadow border-solid border-white m-0 flex-shrink-0"
          ></vs-avatar>
        </template>

        <template v-if="chatData.msg[index - 1]">
          <div
            v-if="
              !(
                !hasSentPreviousMsg(
                  chatData.msg[index - 1].isSent,
                  msg.isSent
                ) || !isSameDay(msg.time, chatData.msg[index - 1].time)
              )
            "
            class="mr-16"
          ></div>
        </template>

        <div
          :class="{
            'bg-primary-gradient text-white': msg.isSent,
            'border border-solid border-transparent bg-white': !msg.isSent
          }"
          class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm"
        >
          <span>{{ msg.textContent }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userId: {
      type: Number,
      required: true
    }
  },
  computed: {
    chatData() {
      return this.$store.getters['chat/chatDataOfUser'](this.userId)
    },
    activeUserImg() {
      return this.$store.state.AppActiveUser.photoURL
    },
    senderImg() {
      return isSentByActiveUser => {
        if (isSentByActiveUser) return this.$store.state.AppActiveUser.photoURL
        else return this.$store.getters['chat/contact'](this.userId).photoURL
      }
    },
    hasSentPreviousMsg() {
      return (last_sender, current_sender) => last_sender === current_sender
    }
  },
  updated() {
    this.scrollToBottom()
  },
  mounted() {
    this.scrollToBottom()
  },
  methods: {
    isSameDay(time_to, time_from) {
      const date_time_to = new Date(Date.parse(time_to))
      const date_time_from = new Date(Date.parse(time_from))
      return (
        date_time_to.getFullYear() === date_time_from.getFullYear() &&
        date_time_to.getMonth() === date_time_from.getMonth() &&
        date_time_to.getDate() === date_time_from.getDate()
      )
    },
    toDate(time) {
      const locale = 'en-us'
      const date_obj = new Date(Date.parse(time))
      const monthName = date_obj.toLocaleString(locale, {
        month: 'short'
      })
      return `${date_obj.getDate()} ${monthName}`
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight
      })
    }
  }
}
</script>
