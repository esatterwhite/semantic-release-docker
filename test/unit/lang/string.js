'use strict'

const {test, threw} = require('tap')
const string = require('../../../lib/lang/string/index.js')

test('string', async (t) => {
  t.test('template', async (t) => {
    const cases = [
      {
        input: 'hello {{value}}'
      , values: {value: 'world'}
      , expected: 'hello world'
      , message: 'single value lookup'
      }, {
        input: 'hello {{value}}'
      , values: {}
      , expected: 'hello '
      , message: 'missing imput values'
      }, {
        input: 'hello {{place.name}}'
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
      t.equal(tpl(tcase.values), tcase.expected, tcase.message)
    }
  })

  t.test('typecast', async (t) => {
    t.type(string.typecast, 'function', 'typecast is a function')
    t.same(string.typecast({x: 1}), {x: 1}, 'non string value')
    const cases = [{
      value: 'foo'
    , expected: 'foo'
    }, {
      value: 'true'
    , expected: true
    }, {
      value: 'false'
    , expected: false
    }, {
      value: true
    , expected: true
    }, {
      value: false
    , expected: false
    }, {
    }, {
      value: '123'
    , expected: 123
    , message: 'integer value'
    }, {
      value: '123.45'
    , expected: 123.45
    , message: 'float value'
    }, {
      value: 'null'
    , expected: null
    , message: 'null string value'
    }, {
      value: null
    , expected: null
    , message: 'null literal value'
    }, {
      value: 'undefined'
    , expected: undefined
    , message: 'undefined string value'
    }, {
      value: undefined
    , expected: undefined
    , message: 'undefined literal value'
    }, {
      value: ''
    , expected: ''
    , message: 'empty string value'
    }, {
      value: Infinity
    , expected: Infinity
    , message: 'Infinity returns input'
    }]

    for (const current of cases) {
      t.equal(
        string.typecast(current.value)
      , current.expected
      , current.message || `camelCase(${current.value}) == ${current.expected}`
      )
    }
  })
}).catch(threw)
