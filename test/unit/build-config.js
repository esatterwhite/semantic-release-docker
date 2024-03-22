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
  , workspace: {
      one: {
        'package.json': JSON.stringify({name: '@internal/package'})
      }
    }
  })

  t.test('standard package', async (tt) => {
    const config = await buildConfig('id', {
    }, {
      cwd: path.join(t.testdirName, 'standard')
    })
    tt.match(config, {
      dockerfile: 'Dockerfile'
    , publish: true
    , nocache: false
    , tags: ['latest', '{{major}}-latest', '{{version}}']
    , args: {
        SRC_DIRECTORY: 'standard'
      , TARGET_PATH: '.'
      , NPM_PACKAGE_NAME: 'this-is-not-scoped'
      , NPM_PACKAGE_SCOPE: null
      , CONFIG_NAME: 'this-is-not-scoped'
      , CONFIG_PROJECT: null
      }
    , pkg: Object
    , registry: null
    , name: 'this-is-not-scoped'
    , project: null
    , build: 'id'
    , context: '.'
    , quiet: true
    , clean: true
    , dry_run: false
    })
  })

  t.test('nested workspace: target resolution', async (tt) => {
    const config = await buildConfig('id', {
      dryRun: true
    }, {
      options: {
        root: t.testdirName
      }
    , cwd: path.join(t.testdirName, 'workspace', 'one')
    })
    tt.match(config, {
      dockerfile: 'Dockerfile'
    , nocache: false
    , publish: true
    , tags: ['latest', '{{major}}-latest', '{{version}}']
    , platform: []
    , args: {
        SRC_DIRECTORY: 'one'
      , TARGET_PATH: 'workspace/one'
      , NPM_PACKAGE_NAME: 'package'
      , NPM_PACKAGE_SCOPE: 'internal'
      , CONFIG_NAME: 'package'
      , CONFIG_PROJECT: 'internal'
      }
    , pkg: Object
    , registry: null
    , name: 'package'
    , project: 'internal'
    , build: 'id'
    , context: '.'
    , quiet: true
    , dry_run: true
    , clean: true
    })
  })

  t.test('scoped package', async (tt) => {
    {
      const config = await buildConfig('id', {
      }, {
        cwd: path.join(t.testdirName, 'scoped')
      })
      tt.match(config, {
        dockerfile: 'Dockerfile'
      , nocache: false
      , platform: []
      , tags: ['latest', '{{major}}-latest', '{version}']
      , args: {
          SRC_DIRECTORY: 'scoped'
        , TARGET_PATH: '.'
        , NPM_PACKAGE_NAME: '@scope/this-is-scoped'
        , NPM_PACKAGE_SCOPE: 'scope'
        , CONFIG_NAME: 'this-is-scoped'
        , CONFIG_PROJECT: 'scope'
        }
      , pkg: Object
      , registry: null
      , name: 'this-is-scoped'
      , project: 'scope'
      , build: 'id'
      , context: '.'
      , clean: true
      , quiet: true
      })
    }

    {
      const config = await buildConfig('id', {
        dockerProject: 'kittens'
      , dockerImage: 'override'
      , dockerFile: 'Dockerfile.test'
      , dockerPublish: false
      , dockerPlatform: 'linux/amd64'
      , dockerBuildQuiet: 'false'
      }, {
        cwd: path.join(t.testdirName, 'scoped')
      })
      tt.match(config, {
        dockerfile: 'Dockerfile.test'
      , publish: false
      , nocache: false
      , platform: ['linux/amd64']
      , tags: ['latest', '{{major}}-latest', '{{version}}']
      , args: {
          SRC_DIRECTORY: 'scoped'
        , TARGET_PATH: '.'
        , NPM_PACKAGE_NAME: '@scope/this-is-scoped'
        , NPM_PACKAGE_SCOPE: 'scope'
        , CONFIG_NAME: 'override'
        , CONFIG_PROJECT: 'kittens'
        }
      , pkg: Object
      , registry: null
      , name: 'override'
      , project: 'kittens'
      , build: 'id'
      , context: '.'
      , clean: true
      , quiet: false
      })
    }

    {
      const config = await buildConfig('id', {
        dockerProject: null
      , dockerImage: 'override'
      , dockerFile: 'Dockerfile.test'
      , dockerTags: 'latest,{{major}}-latest , fake, {{version}}'
      , dockerAutoClean: false
      , dockerPlatform: ['linux/amd64', 'linux/arm64']
      , dockerBuildQuiet: 'false'
      }, {
        cwd: path.join(t.testdirName, 'scoped')
      })
      tt.match(config, {
        dockerfile: 'Dockerfile.test'
      , nocache: false
      , platform: ['linux/amd64', 'linux/arm64']
      , tags: ['latest', '{{major}}-latest', 'fake', '{{version}}']
      , args: {
          SRC_DIRECTORY: 'scoped'
        , TARGET_PATH: '.'
        , NPM_PACKAGE_NAME: '@scope/this-is-scoped'
        , NPM_PACKAGE_SCOPE: 'scope'
        , CONFIG_NAME: 'override'
        , CONFIG_PROJECT: null
        }
      , pkg: Object
      , registry: null
      , name: 'override'
      , project: null
      , build: 'id'
      , context: '.'
      , quiet: false
      , clean: false
      })
    }
  })
}).catch(threw)
