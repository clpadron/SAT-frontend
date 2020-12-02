import { Model } from 'vue-mc'
import CustomRequestJager from './CustomRequestJager'

export default class BaseModelJagerApi extends Model {
  createRequest(config) {
    return new CustomRequestJager(config)
  }

  patch() {
    let method = 'POST'
    let route = this.getRoute('patch')
    let url = this.getURL(route)
    let params = this.attributes

    return this.createRequest({ method, url, data: params }).send()
  }
}
