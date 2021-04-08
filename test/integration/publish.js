'use strict'

const crypto = require('crypto')
const path = require('path')
const sinon = require('sinon')
const execa = require('execa')
const {test, threw} = require('tap')
const buildConfig = require('../../lib/build-config.js')
const verify = require('../../lib/verify.js')
const prepare = require('../../lib/prepare.js')
const publish = require('../../lib/publish.js')
const DOCKER_REGISTRY_HOST = process.env.TEST_DOCKER_REGISTRY || 'localhost:5000'
const fixturedir = path.join(__dirname, '..', 'fixture')

test('steps::publish', async (t) => {
  t.test('publish multi tags', async (tt) => {
    const build_id = crypto.randomBytes(5).toString('hex')
    const context = {
      env: {
        ...process.env
      , DOCKER_REGISTRY_USER: 'iamweasel'
      , DOCKER_REGISTRY_PASSWORD: 'secretsquirrel'
      }
    , cwd: fixturedir
    , nextRelease: {version: '2.0.0'}
    , lastRelease: {version: '1.5.0'}
    , logger: {
        success: sinon.stub()
      , info: sinon.stub()
      , debug: sinon.stub()
      }
    }

    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    , dockerProject: 'docker-publish'
    , dockerImage: 'real'
    , dockerTags: ['{previous.major}-previous', '{major}-foobar', '{version}']
    , dockerFile: 'docker/Dockerfile.publish'
    }, context)

    const auth = await verify(config, context)
    tt.ok(auth, `authentication to ${DOCKER_REGISTRY_HOST} suceeds`)

    const image = await prepare(config, context)
    tt.on('end', () => {
      image.clean()
    })

    // removes images when done
    await publish(config, context)

    const tags = ['1-previous', '2-foobar', '2.0.0']
    for (const tag of tags) {
      const expected = `${image.repo}:${tag}`
      const {stdout} = await execa('docker', ['pull', expected, '-q'])
      tt.equal(expected, stdout, `${expected} successfully published`)
    }
  })
}).catch(threw)
