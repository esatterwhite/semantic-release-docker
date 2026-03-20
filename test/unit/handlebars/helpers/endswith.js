import tap from 'tap'
const {test, threw} = tap
import helpers from '../../../../lib/handlebars/helpers/index.js'

const {endswith} = helpers

test('handlebars helpers', async (t) => {
  t.test('endswith', async (t) => {
    t.equal(endswith('foobar', 'bar'), true, 'foobar endswith bar')
    t.equal(endswith('foobar', 'foo'), false, 'foobar not endswith foo')
    t.equal(endswith([], 'Array]'), false, 'false with not a string')
  })
}).catch(threw)
