'use strict'

const execa = require('execa')
const {test, threw} = require('tap')
const git = require('../common/git/index.js')
const DOCKER_REGISTRY_HOST = process.env.TEST_DOCKER_REGISTRY || 'localhost:5000'

const stringify = JSON.stringify

test('docker release', async (t) => {
  const cwd = t.testdir({
    'package.json': stringify({
      name: 'service-meta-package'
    , version: '0.0.0-development'
    , scripts: {
        'test-release': 'semantic-release'
      }
    , release: {
        ci: true
      , npmPublish: false
      , branches: ['main']
      , dockerRegistry: DOCKER_REGISTRY_HOST
      , dockerProject: 'docker-release'
      , dockerImage: 'fake'
      , dockerArgs: {
          SAMPLE_THING: '{{type}}.{{version}}'
        , GIT_REF: '{{git_sha}}-{{git_tag}}'
        , BUILD_DATE: '{{now}}'
        }
      , plugins: [
          '@semantic-release/commit-analyzer'
        , '@semantic-release/release-notes-generator'
        , '@semantic-release/npm'
        , '@codedependant/semantic-release-docker'
        ]
      }
    , devDependencies: {
        'semantic-release': '*'
      , '@semantic-release/commit-analyzer': '*'
      , '@semantic-release/release-notes-generator': '*'
      , '@semantic-release/npm': '*'
      , '@codedependant/semantic-release-docker': 'file:../../../'
      }
    })
  , Dockerfile: 'FROM debian:buster-slim\n\nCMD ["whoami"]'
  , '.gitignore': 'node_modules/'
  })

  await git.init(cwd)
  t.comment('git repo initialized')
  await git.add(cwd)
  await git.commit(cwd, 'feat: initial release')

  const origin = await git.initOrigin(cwd)
  t.comment(`repository: ${cwd}`)
  t.comment(`origin: ${origin}`)

  {
    const stream = execa('npm', [
      'install'
    ], {
      cwd: cwd
    , env: {
        BRANCH_NAME: 'main'
      , CI_BRANCH: 'main'
      , CI: 'true'
      , GITHUB_REF: 'refs/heads/main'
      }
    })

    stream.stdout.pipe(process.stdout)
    await stream
  }

  const stream = execa('npm', [
    'run'
  , 'test-release'
  , `--repositoryUrl=${origin}`], {
    cwd: cwd
  , env: {
      BRANCH_NAME: 'main'
    , CI_BRANCH: 'main'
    , CI: 'true'
    , GITHUB_REF: 'refs/heads/main'
    , DOCKER_REGISTRY_USER: 'iamweasel'
    , DOCKER_REGISTRY_PASSWORD: 'secretsquirrel'
    }
  })
  stream.stdout.pipe(process.stdout)
  await stream

}).catch(threw)
