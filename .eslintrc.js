'use strict'

module.exports = {
  root: true
, ignorePatterns: [
    'node_modules/'
  , 'test/fixture/'
  , 'coverage/'
  , '.nyc_output/'
  , 'env/'
  , 'doc/'
  ]
, extends: 'codedependant'
, parserOptions: {
    ecmaVersion: 2022
  , type: 'script'
  }
, rules: {
    'object-shorthand': 0
  , 'sensible/check-require': [2, 'always', {
      root: __dirname
    }]
  , 'no-unused-vars': [
      'error', {
        varsIgnorePattern: '_'
      }]
  , 'quote-props': [
      2
    , 'as-needed'
    ]
  }
}
