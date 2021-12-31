'use strict'

const {test, threw} = require('tap')
const {lower} = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  t.test('lower', async (t) => {
    t.equal(lower('Hello World'), 'hello world', 'lower cases input')
    t.equal(lower(null), '', 'returns empty string on non string input')
  })
}).catch(threw)
