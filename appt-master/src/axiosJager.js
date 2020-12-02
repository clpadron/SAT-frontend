// axios
import axios from 'axios'
// axios.defaults.withCredentials = true
const domain = process.env.VUE_APP_JAGER_API
export default axios.create({
  headers: {
    Accept: 'application/json'
  },
  baseURL: domain,
  withCredentials: false
})
