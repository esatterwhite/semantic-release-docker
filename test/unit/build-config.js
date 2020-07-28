'use strict'

const path = require('path')
const {test, threw} = require('tap')
const buildConfig = require('../../lib/build-config.js')

test('build-config', async (t) => {
  t.testdir({
    standard: {
      'package.json': JSON.stringify({name: 'this-is-not-scoped'})
    }
  , scoped: {
      'package.json': JSON.stringify({name: '@scope/this-is-scoped'})
    }
  })

  t.test('standard package', async (tt) => {
    const config = await buildConfig('id', {
    }, {
      cwd: path.join(t.testdirName, 'standard')
    })
    tt.deepEqual(config, {
      dockerfile: 'Dockerfile'
    , nocache: false
    , tags: ['latest', '{major}-latest', '{version}']
    , args: {}
    , registry: null
    , name: 'this-is-not-scoped'
    , project: null
    , build: 'id'
    , context: '.'
    })
  })

  t.test('scoped package', async (tt) => {
    {
      const config = await buildConfig('id', {
      }, {
        cwd: path.join(t.testdirName, 'scoped')
      })
      tt.deepEqual(config, {
        dockerfile: 'Dockerfile'
      , nocache: false
      , tags: ['latest', '{major}-latest', '{version}']
      , args: {}
      , registry: null
      , name: 'this-is-scoped'
      , project: 'scope'
      , build: 'id'
      , context: '.'
      })
    }

    {
      const config = await buildConfig('id', {
        docker: {
          project: 'kittens'
        , image: 'override'
        , dockerfile: 'Dockerfile.test'
        }
      }, {
        cwd: path.join(t.testdirName, 'scoped')
      })
      tt.deepEqual(config, {
        dockerfile: 'Dockerfile.test'
      , nocache: false
      , tags: ['latest', '{major}-latest', '{version}']
      , args: {}
      , registry: null
      , name: 'override'
      , project: 'kittens'
      , build: 'id'
      , context: '.'
      })
    }

    {
      const config = await buildConfig('id', {
        docker: {
          project: null
        , image: 'override'
        , dockerfile: 'Dockerfile.test'
        }
      }, {
        cwd: path.join(t.testdirName, 'scoped')
      })
      tt.deepEqual(config, {
        dockerfile: 'Dockerfile.test'
      , nocache: false
      , tags: ['latest', '{major}-latest', '{version}']
      , args: {}
      , registry: null
      , name: 'override'
      , project: null
      , build: 'id'
      , context: '.'
      })
    }
  })
}).catch(threw)
