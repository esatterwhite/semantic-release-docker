import tap from 'tap'
const {test, threw} = tap
import helpers from '../../../../lib/handlebars/helpers/index.js'

const {startswith} = helpers

test('handlebars helpers', async (t) => {
  t.test('startswith', async (t) => {
    t.equal(startswith('foobar', 'bar'), false, 'foobar not startswith bar')
    t.equal(startswith('foobar', 'foo'), true, 'foobar startswith foo')
    t.equal(startswith([], 'Array]'), false, 'false with not a string')
  })
}).catch(threw)
