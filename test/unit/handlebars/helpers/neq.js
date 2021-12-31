'use strict'

const {test, threw} = require('tap')
const {neq} = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  t.test('neq', async (t) => {
    t.equal(neq(30, 30), false, '30 is not equal to 30)')
    t.equal(neq(40, 30), true, '40 is equal to 30)')
  })
}).catch(threw)
