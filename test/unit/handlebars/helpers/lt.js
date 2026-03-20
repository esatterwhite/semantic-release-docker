import tap from 'tap'
const {test, threw} = tap
import helpers from '../../../../lib/handlebars/helpers/index.js'

const {lt} = helpers

test('handlebars helpers', async (t) => {
  t.test('lt', async (t) => {
    t.equal(lt(40, 30), false, '40 is lower than 30)')
    t.equal(lt(30, 40), true, '30 is not lower than 40)')
  })
}).catch(threw)
