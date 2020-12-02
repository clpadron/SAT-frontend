import { UserCollection } from '../models/User'
import axios from 'axios'

export default {
  data() {
    return {
      quillOptions: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ['clean']
          ]
        }
      }
    }
  },
  computed: {
    activeUser() {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    async getUserByUsername(username) {
      let users = new UserCollection()
      if (this.isAdmin) {
        await users.fetch()
      } else if (this.isSchoolUser) {
        await users.fetchInSchool()
      } else {
        await users.fetchInOrganization()
      }
      return users.find(user => user.username === username)
    },
    sendMail(from, to, subject, content) {
      const domain = process.env.VUE_APP_JAGER_API
      const hiddenToken = process.env.VUE_APP_HIDDEN_TOKEN
      let axios1 = axios.create({
        baseURL: domain
      })
      return axios1
        .post('send-mail', {
          hidden_token: hiddenToken,
          mail_from: from,
          mail_to: to,
          subject: subject,
          content: content
        })
        .then(() => {
          this.successMessage(this.$t('GLOBALS.MAIL_SENT') + ': ' + to)
        })
        .catch(error => {
          this.errorMessageApi(error.response)
        })
    }
  }
}
