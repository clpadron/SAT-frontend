import { Model } from 'vue-mc'
import CustomRequest from './CustomRequest'

export default class BaseModel extends Model {
  createRequest(config) {
    return new CustomRequest(config)
  }

  patch() {
    let method = 'POST'
    let route = this.getRoute('patch')
    let url = this.getURL(route)
    let params = this.attributes

    return this.createRequest({ method, url, data: params }).send()
  }
}
