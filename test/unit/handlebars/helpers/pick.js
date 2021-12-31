'use strict'

const {test, threw} = require('tap')
const {pick} = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  t.test('pick', async (t) => {
    t.deepEqual(pick(null, undefined, []), [], 'Should return empty array')
    t.deepEqual(pick(null, undefined, '', [], 100), [], 'Should return empty array')
    t.equal(pick(null, 0, undefined, []), 0, 'Should return 0')
    t.equal(pick(null, undefined, 'null', []), 'null', 'Should return "null"')
  })
}).catch(threw)
