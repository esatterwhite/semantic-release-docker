'use strict'

const {test, threw} = require('tap')
const {upper} = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  t.test('upper', async (t) => {
    t.equal(upper('Hello World'), 'HELLO WORLD', 'upper cases input')
    t.equal(upper(null), '', 'returns empty string on non string input')
  })
}).catch(threw)
