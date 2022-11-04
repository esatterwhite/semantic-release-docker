'use strict'

const {test, threw} = require('tap')
const buildConfig = require('../../lib/build-config.js')
const buildTemplateVars = require('../../lib/build-template-vars.js')

test('buildTemplateVars', async (t) => {
  const cwd = t.testdir({
    'package.json': JSON.stringify({
      name: 'template-vars'
    })
  })
  const context = {
    cwd
  , nextRelease: {
      version: '1.0.0'
    , gitTag: 'v1.0.0'
    , gitHead: 'abcdefgh'
    , type: 'major'
    , notes: 'test it'
    }
  }
  const opts = await buildConfig('abacadaba', {
    dockerArgs: {
      TEMPLATE_VALUE: '{{type}}.{{version}}'
    , BOOLEAN_VALUE: true
    , NULL_VALUE: null
    }
  }, context)

  const vars = buildTemplateVars(opts, context)
  t.match(vars, {
    release_type: 'major'
  , release_notes: 'test it'
  , version: '1.0.0'
  , git_sha: 'abcdefgh'
  , git_tag: 'v1.0.0'
  , pkg: {name: 'template-vars'}
  , major: 1
  , minor: 0
  , patch: 0
  , version: '1.0.0'
  , network: 'default'
  , next: {
      major: 1
    , minor: 0
    , patch: 0
    , version: '1.0.0'
    }
  , args: {
      SRC_DIRECTORY: String
    , TARGET_PATH: String
    , NPM_PACKAGE_NAME: 'template-vars'
    , NPM_PACKAGE_SCOPE: null
    , CONFIG_NAME: String
    , CONFIG_PROJECT: null
    , GIT_SHA: 'abcdefgh'
    , GIT_TAG: 'v1.0.0'
    , TEMPLATE_VALUE: '{{type}}.{{version}}'
    , BOOLEAN_VALUE: true
    , NULL_VALUE: null
    }
  }, 'expected template values')
}).catch(threw)
