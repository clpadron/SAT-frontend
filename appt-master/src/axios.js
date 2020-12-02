// axios
import axios from 'axios'
// axios.defaults.withCredentials = true
const domain = process.env.VUE_APP_API_URL
export default axios.create({
  baseURL: domain,
  withCredentials: true
})
