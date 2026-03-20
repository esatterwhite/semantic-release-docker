import tap from 'tap'
const {test, threw} = tap
import helpers from '../../../../lib/handlebars/helpers/index.js'

const {gte} = helpers

test('handlebars helpers', async (t) => {
  t.test('gte', async (t) => {
    t.equal(gte(40, 30), true, '40 is greater than or equal to 30)')
    t.equal(gte(30, 40), false, '30 is not greater than or equal to 40)')
    t.equal(gte(50, 40), true, '40 is greater than or equal to 40)')
  })
}).catch(threw)
