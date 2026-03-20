import tap from 'tap'
const {test, threw} = tap
import helpers from '../../../../lib/handlebars/helpers/index.js'

const {upper} = helpers

test('handlebars helpers', async (t) => {
  t.test('upper', async (t) => {
    t.equal(upper('Hello World'), 'HELLO WORLD', 'upper cases input')
    t.equal(upper(null), '', 'returns empty string on non string input')
  })
}).catch(threw)
