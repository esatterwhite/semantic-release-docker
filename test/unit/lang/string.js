'use strict'

const {test, threw} = require('tap')
const string = require('../../../lib/lang/string/index.js')

test('string', async (t) => {
  t.test('template', async (tt) => {
    const cases = [
      {
        input: 'hello {value}'
      , values: {value: 'world'}
      , expected: 'hello world'
      , message: 'single value lookup'
      }, {
        input: 'hello {value}'
      , values: {}
      , expected: 'hello {value}'
      , message: 'missing imput values'
      }, {
        input: 'hello {place.name}'
      , values: {place: {name: 'boston'}}
      , expected: 'hello boston'
      , message: 'nested values'
      }, {
        input: null
      , values: {place: {name: 'boston'}}
      , expected: null
      , message: 'non string value returns value'
      }
    ]

    for (const tcase of cases) {
      const tpl = string.template(tcase.input)
      tt.equal(tpl(tcase.values), tcase.expected, tcase.message)
    }
  })
}).catch(threw)
