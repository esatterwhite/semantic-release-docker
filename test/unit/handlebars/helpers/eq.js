'use strict'

const {test, threw} = require('tap')
const {eq} = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  t.test('eq', async (t) => {
    t.equal(eq(30, 30), true, '30 is equal to 30)')
    t.equal(eq(40, 30), false, '40 is not equal to 30)')
  })
}).catch(threw)
