'use strict'

const path = require('path')
const crypto = require('crypto')
const sinon = require('sinon')
const execa = require('execa')
const {test, threw} = require('tap')
const buildConfig = require('../../lib/build-config.js')
const verify = require('../../lib/verify.js')
const prepare = require('../../lib/prepare.js')
const DOCKER_REGISTRY_HOST = process.env.TEST_DOCKER_REGISTRY || 'localhost:5000'
const fixturedir = path.join(__dirname, '..', 'fixture')

test('steps::prepare', async (t) => {
  t.test('build image created', async (tt) => {
    const build_id = crypto.randomBytes(5).toString('hex')
    const context = {
      env: {
        ...process.env
      , DOCKER_REGISTRY_USER: 'iamweasel'
      , DOCKER_REGISTRY_PASSWORD: 'secretsquirrel'
      }
    , cwd: fixturedir
    , logger: {
        success: sinon.stub()
      , info: sinon.stub()
      }
    }

    const config = await buildConfig(build_id, {
      registry: DOCKER_REGISTRY_HOST
    , project: 'docker-prepare'
    , image: 'fake'
    , args: {MY_VARIABLE: '1'}
    , dockerfile: 'docker/Dockerfile.prepare'
    }, context)

    const auth = await verify(config, context)
    tt.ok(auth, `authentication to ${DOCKER_REGISTRY_HOST} suceeds`)

    const image = await prepare(config, context)

    tt.on('end', () => {
      image.clean()
    })

    const {stdout} = await execa('docker', ['images', image.name, '-q', '--format={{ .Tag }}'])
    tt.equal(stdout, build_id, 'build image fully built')
  })
}).catch(threw)
