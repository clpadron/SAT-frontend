import { Collection } from 'vue-mc'
import CustomRequest from './CustomRequest'

export default class BaseCollection extends Collection {
  createRequest(config) {
    return new CustomRequest(config)
  }
}
