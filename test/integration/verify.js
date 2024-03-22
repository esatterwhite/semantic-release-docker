'use strict'

const crypto = require('crypto')
const sinon = require('sinon')
const {test, threw} = require('tap')

const buildConfig = require('../../lib/build-config.js')
const verify = require('../../lib/verify.js')
const DOCKER_REGISTRY_HOST = process.env.TEST_DOCKER_REGISTRY || 'localhost:5000'

const logger = {
  success: sinon.stub()
, debug: sinon.stub()
, info: sinon.stub()
, fatal: console.error
}

test('steps::verify', async (t) => {
  const build_id = crypto.randomBytes(5).toString('hex')
  t.test('docker password, no username', async (tt) => {
    const context = {
      env: {
        ...process.env
      , GITHUB_TOKEN: ''
      , DOCKER_REGISTRY_PASSWORD: 'abc123'
      }
    , cwd: process.cwd()
    , logger: logger
    }
    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    }, context)

    await tt.rejects(
      verify(config, context)
    , {
        message: /docker authentication failed/i
      , code: 'EAUTH'
      , details: /DOCKER_REGISTRY_USER AND DOCKER_REGISTRY_PASSWORD must be set/ig
      }
    )
  })

  t.test('docker username, no password', async (tt) => {
    const context = {
      env: {
        ...process.env
      , GITHUB_TOKEN: ''
      , DOCKER_REGISTRY_USER: 'abc123'
      }
    , cwd: process.cwd()
    , logger: logger
    }

    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    }, context)

    tt.rejects(
      verify(config, context)
    , {
        message: /docker authentication failed/i
      , code: 'EAUTH'
      , details: /DOCKER_REGISTRY_USER AND DOCKER_REGISTRY_PASSWORD must be set/ig
      }
    )
  })

  t.test('docker USER/PASS succeeds', async (tt) => {
    const context = {
      env: {
        ...process.env
      , DOCKER_REGISTRY_USER: 'iamweasel'
      , DOCKER_REGISTRY_PASSWORD: 'secretsquirrel'
      }
    , cwd: process.cwd()
    , logger: logger
    }
    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    }, context)

    tt.resolves(verify(config, context))
  })

  t.test('docker USER / GITHUB_TOKEN succeeds', async (tt) => {
    const context = {
      env: {
        ...process.env
      , DOCKER_REGISTRY_USER: 'iamweasel'
      , GITHUB_TOKEN: 'secretsquirrel'
      }
    , cwd: process.cwd()
    , logger: logger
    }
    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    }, context)
    tt.resolves(verify(config, context))
  })

  t.test('docker no login', async (tt) => {
    const context = {
      env: {
        ...process.env
      , DOCKER_REGISTRY_USER: 'iamweasel'
      }
    , cwd: process.cwd()
    , logger: logger
    }
    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    , dockerLogin: false
    }, context)
    tt.resolves(verify(config, context))
  })

  t.test('docker password, no username', async (tt) => {
    const context = {
      env: {
        ...process.env
      , DOCKER_REGISTRY_PASSWORD: 'abc123'
      , DOCKER_REGISTRY_USER: 'abc123'
      }
    , cwd: process.cwd()
    , logger: logger
    }
    const config = await buildConfig(build_id, {}, context)
    tt.rejects(
      verify(config, context)
    , {
        message: /docker authentication failed/i
      , code: 'EAUTH'
      , details: /authentication to dockerhub failed/ig
      }
    )
  })

  t.test('No auth provided succeed', async (tt) => {
    const context = {
      env: {
        ...process.env
      , GITHUB_TOKEN: ''
      }
    , cwd: process.cwd()
    , logger: logger
    }

    const config = await buildConfig(build_id, {}, context)
    tt.strictEqual(await verify(config, context), true, 'auth step skipped')
  })

  t.test('unable to collect image name', async (tt) => {
    const context = {
      env: {
        ...process.env
      }
    , cwd: __dirname
    , logger: logger
    }

    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    }, context)
    tt.rejects(verify(config, context), {
      code: 'EINVAL'
    , name: 'SemanticReleaseError'
    , details: new RegExp(
        'image name parsed from package.json name if possible. '
          + 'or via the "dockerImage" option'
      , 'gi'
      )
    })
  })

  t.test('invalid docker file location', async (tt) => {
    const context = {
      env: {
        ...process.env
      }
    , cwd: process.cwd()
    , logger: logger
    }

    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    , dockerFile: 'Notafile'
    }, context)

    await tt.rejects(verify(config, context), {
      code: 'ENOENT'
    , name: 'SemanticReleaseError'
    , details: /relative to pwd/gi
    })
  })

}).catch(threw)
