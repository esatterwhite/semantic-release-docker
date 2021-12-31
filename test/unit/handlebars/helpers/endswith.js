'use strict'

const {test, threw} = require('tap')
const {endswith} = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  t.test('endswith', async (t) => {
    t.equal(endswith('foobar', 'bar'), true, 'foobar endswith bar')
    t.equal(endswith('foobar', 'foo'), false, 'foobar not endswith foo')
    t.equal(endswith([], 'Array]'), false, 'false with not a string')
  })
}).catch(threw)
