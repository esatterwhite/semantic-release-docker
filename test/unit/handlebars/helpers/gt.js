import tap from 'tap'
const {test, threw} = tap
import helpers from '../../../../lib/handlebars/helpers/index.js'

const {gt} = helpers

test('handlebars helpers', async (t) => {
  t.test('gt', async (t) => {
    t.equal(gt(40, 30), true, '40 is greater than 30)')
    t.equal(gt(30, 40), false, '30 is not greater than 40)')
  })
}).catch(threw)
