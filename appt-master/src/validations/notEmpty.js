// Create a rule that checks if a value is odd.
import { validation } from 'vue-mc'

let notEmpty = validation.rule({
  name: 'notEmpty',
  test: value.length
})

// Remember to add default messages for the rules.
validation.messages.set('notEmpty', 'Must be filled')

export default notEmpty
