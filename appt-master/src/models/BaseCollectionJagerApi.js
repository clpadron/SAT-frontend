import { Collection } from 'vue-mc'
import CustomRequestJager from './CustomRequestJager'

export default class BaseCollectionJagerApi extends Collection {
  createRequest(config) {
    return new CustomRequestJager(config)
  }
}
