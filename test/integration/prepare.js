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
const DATE_REGEX = new RegExp(
  '^[\\d]{4}-[\\d]{2}-[\\d]{2}T[\\d]{2}:[\\d]{2}:[\\d]{2}'
    + '(\.[\\d]{1,6})?(Z|[\\+\\-][\\d]{2}:[\\d]{2})$' // eslint-disable-line no-useless-escape
)

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
    , nextRelease: {
        version: '2.1.2'
      , gitTag: 'v2.1.2'
      , gitHead: 'abacadaba'
      }
    , logger: {
        success: sinon.stub()
      , info: sinon.stub()
      , debug: sinon.stub()
      , fatal: sinon.stub()
      }
    }


    const config = await buildConfig(build_id, {
      dockerRegistry: DOCKER_REGISTRY_HOST
    , dockerProject: 'docker-prepare'
    , dockerImage: 'fake'
    , dockerVerifyCmd: ['date', '+\'%x\'']
    , dockerBuildCacheFrom: 'test'
    , dockerArgs: {
        MY_VARIABLE: '1'
      , TAG_TEMPLATE: '{{git_tag}}'
      , MAJOR_TEMPLATE: '{{major}}'
      , GIT_REF: '{{git_sha}}'
      , BUILD_DATE: '{{now}}'
      }
    , dockerFile: 'docker/Dockerfile.prepare'
    , dockerContext: 'docker'
    }, context)

    tt.match(
      await verify(config, context)
    , /\d{2}\/\d{2}\/\d{2}/
    , 'verify command executed'
    )

    const image = await prepare(config, context)

    tt.on('end', () => {
      image.clean()
    })

    tt.equal(image.opts.args.get('TAG_TEMPLATE'), 'v2.1.2', 'TAG_TEMPLATE value')
    tt.equal(image.opts.args.get('MAJOR_TEMPLATE'), '2', 'MAJOR_TEMPLATE value')
    tt.equal(image.opts.args.get('GIT_REF'), 'abacadaba', 'GIT_REF value')
    tt.match(image.opts.args.get('BUILD_DATE'), DATE_REGEX, 'BUILD_DATE value')
    tt.match(
      image.opts.flags.get('TAG_TEMPLATE')
    , ['v2.1.2']
    , 'TAG_TEMPLATE stored as a flag'
    )
    tt.equal(image.context, path.join(context.cwd, config.context), 'docker context path')

    const {stdout} = await execa('docker', [
      'images', image.name
    , '-q', '--format={{ .Tag }}'
    ])
    tt.equal(stdout, build_id, 'build image fully built')
  })
}).catch(threw)
