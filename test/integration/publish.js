import crypto from 'crypto'
import path from 'path'
import {fileURLToPath} from 'url'
import execa from 'execa'
import tap from 'tap'
const {test, threw} = tap
import buildConfig from '../../lib/build-config.js'
import verify from '../../lib/verify.js'
import prepare from '../../lib/prepare.js'
import publish from '../../lib/publish.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DOCKER_REGISTRY_HOST = process.env.TEST_DOCKER_REGISTRY || 'localhost:5000'
const fixturedir = path.join(__dirname, '..', 'fixture')

function noop() {}

const logger = {
  success: noop
, info: noop
, debug: noop
, warn: noop
, fatal: console.error
}

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
    , logger: logger
    }

    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    , dockerProject: 'docker-publish'
    , dockerImage: 'real'
    , dockerTags: ['{{previous.major}}-previous', '{{major}}-foobar', '{{version}}']
    , dockerFile: 'docker/Dockerfile.publish'
    }, context)

    const auth = await verify(config, context)
    tt.ok(auth, `authentication to ${DOCKER_REGISTRY_HOST} suceeds`)

    const image = await prepare(config, context)

    await publish(config, context)
    await image.clean()

    const tags = ['1-previous', '2-foobar', '2.0.0']
    for (const tag of tags) {
      const expected = `${image.repo}:${tag}`
      const {stdout} = await execa('docker', ['pull', expected, '-q'])
      tt.equal(expected, stdout, `${expected} successfully published`)
    }
  })

  t.test('publish multi tags', async (tt) => {
    const build_id = crypto.randomBytes(5).toString('hex')
    const context = {
      env: {
        ...process.env
      , DOCKER_REGISTRY_USER: 'iamweasel'
      , DOCKER_REGISTRY_PASSWORD: 'secretsquirrel'
      }
    , cwd: fixturedir
    , dockerPlatform: ['linux/amd64']
    , nextRelease: {version: '2.0.0'}
    , lastRelease: {version: '1.5.0'}
    , logger: logger
    }

    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    , dockerProject: 'docker-publish'
    , dockerImage: 'real'
    , dockerTags: ['{{previous.major}}-previous', '{{major}}-foobar', '{{version}}']
    , dockerFile: 'docker/Dockerfile.publish'
    }, context)

    const auth = await verify(config, context)
    tt.ok(auth, `authentication to ${DOCKER_REGISTRY_HOST} suceeds`)

    const image = await prepare(config, context)

    await publish(config, context)
    await image.clean()

    const tags = ['1-previous', '2-foobar', '2.0.0']
    for (const tag of tags) {
      const expected = `${image.repo}:${tag}`
      const {stdout} = await execa('docker', ['pull', expected, '-q'])
      tt.equal(expected, stdout, `${expected} successfully published`)
    }
  })
}).catch(threw)
