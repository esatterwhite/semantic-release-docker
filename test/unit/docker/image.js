'use strict'

const os = require('os')
const path = require('path')
const crypto = require('crypto')
const execa = require('execa')
const {test, threw} = require('tap')
const docker = require('../../../lib/docker/index.js')

function random() {
  return crypto.randomBytes(5).toString('hex')
}

const fixturedir = path.join(__dirname, '..', '..', 'fixture')
test('exports', async (tt) => {
  tt.match(docker, {
    Image: Function
  }, 'expected exports')
})

test('Image', async (t) => {
  const build_id = random()
  t.throws(() => {
    return new docker.Image()
  }, /docker image "name" is required and must be a string/gi)

  t.test('image defaults', async (tt) => {
    const img = new docker.Image({name: 'test'})
    tt.notOk(img.sha, 'No default sha generated')
    tt.match(img.opts, {
      build_id: String
    , registry: null
    , project: null
    , name: 'test'
    , dockerfile: 'Dockerfile'
    , cwd: process.cwd()
    , args: Map
    }, 'default image options')
  })

  test('image overrides', async (tt) => {
    const img = new docker.Image({
      name: 'test'
    , build_id: 'abc123'
    , registry: 'quay.io'
    , project: 'esatterwhite'
    , name: 'test'
    , dockerfile: 'Dockerfile.test'
    , cwd: path.join(__dirname, 'build')
    , sha: 'hello'
    , network: 'custom-network'
    })
    tt.equal(img.sha, 'hello')
    tt.match(img.opts, {
      build_id: 'abc123'
    , registry: 'quay.io'
    , project: 'esatterwhite'
    , name: 'test'
    , dockerfile: 'Dockerfile.test'
    , cwd: path.join(__dirname, 'build')
    , args: Map
    , network: 'custom-network'
    }, 'default image options')

    tt.equal(img.context, path.join(__dirname, 'build', '.'), 'default image context')
    img.context = __dirname
    tt.equal(img.context, __dirname, 'context override')
    tt.equal(
      img.dockerfile
    , path.join(__dirname, 'build', 'Dockerfile.test')
    , 'docker file path'
    )
  })

  t.test('dockerfile location resolution', async (t) => {
    t.test('relative location', async (t) => {
      const img = new docker.Image({
        name: 'test'
      , build_id: 'abc123'
      , registry: 'quay.io'
      , project: 'esatterwhite'
      , name: 'test'
      , dockerfile: '../../Dockerfile.test'
      , cwd: path.join(__dirname, 'build')
      , sha: 'hello'
      })
      t.equal(
        img.dockerfile
      , path.join(__dirname, '..', 'Dockerfile.test')
      , 'docker file path'
      )
    })

    t.test('absolute path', async (t) => {
      const img = new docker.Image({
        name: 'test'
      , build_id: 'abc123'
      , registry: 'quay.io'
      , project: 'esatterwhite'
      , name: 'test'
      , dockerfile: '/var/opt/Dockerfile.test'
      , cwd: path.join(__dirname, 'build')
      , sha: 'hello'
      })
      t.equal(
        img.dockerfile
      , '/var/opt/Dockerfile.test'
      , 'docker file path'
      )
    })
  })

  t.test('image#id()', async (tt) => {
    {
      const img = new docker.Image({
        name: 'test'
      , build_id: 'abc123'
      })

      tt.equal(img.id, 'test:abc123')
    }

    {
      const img = new docker.Image({
        name: 'test'
      , sha: 'abcdefg123456'
      , registry: 'quay.io'
      , project: 'esatterwhite'
      , build_id: 'abacadaba'
      })

      tt.equal(img.id, 'abcdefg123456', 'sha value used as image id')
    }
  })

  t.test('image#repo', async (tt) => {
    {
      const img = new docker.Image({
        name: 'test'
      })

      tt.equal(img.repo, 'test')
    }

    {
      const img = new docker.Image({
        name: 'foobar'
      , registry: 'us.gcr.io'
      })

      tt.equal(img.repo, 'us.gcr.io/foobar')
    }

    {
      const img = new docker.Image({
        name: 'test'
      , registry: 'quay.io'
      , project: 'esatterwhite'
      })

      tt.equal(img.repo, 'quay.io/esatterwhite/test', 'generated repo name')
    }
  })

  t.test('image#build_cmd', async (tt) => {
    {
      const img = new docker.Image({
        name: 'test'
      , registry: 'quay.io'
      , project: 'esatterwhite'
      , build_id: 'abacadaba'
      })

      tt.same(img.build_cmd, [
        'build'
      , '--network=default'
      , '--quiet'
      , '--tag'
      , 'quay.io/esatterwhite/test:abacadaba'
      , '-f'
      , path.join(process.cwd(), 'Dockerfile')
      , process.cwd()
      ], 'build command')
    }

    {
      const img = new docker.Image({
        name: 'foobar'
      , registry: 'us.gcr.io'
      , project: 'esatterwhite'
      , build_id: '1010101'
      , cwd: __dirname
      , context: path.join(__dirname, 'fake')
      })

      tt.same(img.build_cmd, [
        'build'
      , '--network=default'
      , '--quiet'
      , '--tag'
      , 'us.gcr.io/esatterwhite/foobar:1010101'
      , '-f'
      , path.join(__dirname, 'Dockerfile')
      , path.join(__dirname, 'fake')
      ], 'build command')
    }

    {
      const img = new docker.Image({
        name: 'foobar'
      , registry: 'us.gcr.io'
      , project: 'esatterwhite'
      , build_id: '1010101'
      , cwd: __dirname
      , context: path.join(__dirname, 'fake')
      })

      img.arg('ARG_1', 'yes')
      img.arg('VALUE_FROM_ENV', true)
      tt.same(img.build_cmd, [
        'build'
      , '--network=default'
      , '--quiet'
      , '--tag'
      , 'us.gcr.io/esatterwhite/foobar:1010101'
      , '--build-arg'
      , 'ARG_1=yes'
      , '--build-arg'
      , 'VALUE_FROM_ENV'
      , '-f'
      , path.join(__dirname, 'Dockerfile')
      , path.join(__dirname, 'fake')
      ], 'build command')
    }
  })

  t.test('image#build()', async (tt) => {
    const img = new docker.Image({
      name: 'test'
    , registry: 'quay.io'
    , project: 'esatterwhite'
    , build_id: build_id
    , cwd: fixturedir
    , dockerfile: path.join('docker', 'Dockerfile.test')
    , context: path.join(fixturedir, 'docker')
    })

    tt.notOk(img.sha, 'no show before build')
    const sha = await img.build()
    tt.equal(sha, img.sha, 'image sha set after build')
    const {stdout} = await execa('docker', ['run', '--rm', img.name, 'ls', '-1'])
    tt.same(
      stdout.split(os.EOL).sort()
    , [
        'Dockerfile.test'
      , 'Dockerfile.publish'
      , 'Dockerfile.prepare'
      , 'Dockerfile.post'
      ].sort()
    , 'files in image context')
  })

  t.test('image#tag()', async (tt) => {
    const img = new docker.Image({
      name: 'test'
    , registry: 'quay.io'
    , project: 'esatterwhite'
    , build_id: build_id
    , cwd: __dirname
    , dockerfile: path.join(fixturedir, 'docker', 'Dockerfile.test')
    , context: path.join(__dirname, 'fixture')
    })
    await img.tag('1.0.0', false)
    const {stdout} = await execa('docker', [
      'images', img.repo
    , '-q', '--format={{ .Tag }}'
    ])
    const tags = stdout.split(os.EOL)
    tt.same(tags.sort(), [build_id, '1.0.0'].sort(), 'image tags')
  })

  t.test('image#clean()', async (tt) => {
    const img = new docker.Image({
      name: 'test'
    , registry: 'quay.io'
    , project: 'esatterwhite'
    , build_id: build_id
    , cwd: __dirname
    , dockerfile: path.join('fixture', 'Dockerfile.test')
    })
    await img.clean()
    const {stdout} = await execa('docker', [
      'images', img.repo
    , '-q', '--format={{ .Tag }}'
    ])
    tt.same(stdout, '', 'all tags removed')
  })

  t.test('image.context', async (tt) => {
    const img = new docker.Image({
      name: 'test'
    , registry: 'quay.io'
    , project: 'esatterwhite'
    , build_id: build_id
    , cwd: __dirname
    , dockerfile: path.join('fixture', 'Dockerfile.test')
    , context: 'fixture'
    })

    tt.equal(img.context, path.join(__dirname, 'fixture'), 'expected image context')
  })

}).catch(threw)
