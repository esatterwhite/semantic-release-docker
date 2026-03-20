import tap from 'tap'
const {test, threw} = tap
import helpers from '../../../../lib/handlebars/helpers/index.js'

const {lower} = helpers

test('handlebars helpers', async (t) => {
  t.test('lower', async (t) => {
    t.equal(lower('Hello World'), 'hello world', 'lower cases input')
    t.equal(lower(null), '', 'returns empty string on non string input')
  })
}).catch(threw)
