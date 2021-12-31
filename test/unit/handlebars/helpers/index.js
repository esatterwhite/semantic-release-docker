
'use strict'

const {test, threw} = require('tap')
const hbs = require('../../../../lib/handlebars')
const helpers = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  for (const [name, helper] of Object.entries(helpers)) {
    t.type(hbs.helpers[name], 'function', `handle bars has helper named ${name}`)
    t.equal(hbs.helpers[name], helper, `handlers function reference ${name} loaded`)
  }
}).catch(threw)
