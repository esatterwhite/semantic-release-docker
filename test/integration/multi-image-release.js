'use strict'

const {promisify} = require('util')
const exec = promisify(require('child_process').exec)
const sematicRelease = require('semantic-release')
const execa = require('execa')
const {WritableStreamBuffer} = require('stream-buffers')
const {test, threw} = require('tap')
const git = require('../common/git/index.js')
const initOrigin = require('../common/git/init-origin.js')
const DOCKER_REGISTRY_HOST = process.env.TEST_DOCKER_REGISTRY || 'localhost:5000'
const stringify = JSON.stringify



test('docker multiple image release', async (t) => {

  const stdout = new WritableStreamBuffer()
  const stderr = new WritableStreamBuffer()
  const cwd = t.testdir({
    'package.json': stringify({
      name: 'service-meta-package'
    , version: '0.0.0-development'
    , scripts: {
        'test-release': 'semantic-release'
      }
    , devDependencies: {
        'semantic-release': '^19.0.0'
      , '@semantic-release/commit-analyzer': '^9'
      , '@semantic-release/release-notes-generator': '^10'
      , '@semantic-release/npm': '^9'
      , '@codedependant/semantic-release-docker': 'file:../../../'
      }
    })
  , Dockerfile: 'FROM debian:buster-slim\n\nCMD ["whoami"]'
  , 'Dockerfile.alt': 'FROM debian:bullseye-slim\n\nCMD ["whoami"]'
  , '.gitignore': 'node_modules/'
  })


  await git.init(cwd)
  t.comment('git repo initialized')
  await git.add(cwd)
  await git.commit(cwd, 'feat: initial release')

  const origin = await git.initOrigin(cwd)
  t.comment(`repository: ${cwd}`)
  t.comment(`origin: ${origin}`)

  await exec('npm install', {
    cwd: cwd
  })

  const result = await sematicRelease({
    ci: true
  , repositoryUrl: origin
  , npmPublish: false
  , branches: ['main']
  , plugins: [
      '@semantic-release/commit-analyzer'
    , '@semantic-release/release-notes-generator'
    , '@semantic-release/npm'
    , ['@codedependant/semantic-release-docker', {
        dockerRegistry: DOCKER_REGISTRY_HOST
      , dockerProject: 'docker-release'
      , dockerImage: 'abcd'
      , dockerArgs: {
          SAMPLE_THING: '{{type}}.{{version}}'
        , GIT_REF: '{{git_sha}}-{{git_tag}}'
        , BUILD_DATE: '{{now}}'
        }
      }]
    , ['@codedependant/semantic-release-docker', {
        dockerRegistry: DOCKER_REGISTRY_HOST
      , dockerProject: 'docker-release'
      , dockerImage: 'wxyz'
      , dockerFile: 'Dockerfile.alt'
      , dockerArgs: {
          SAMPLE_THING: '{{type}}.{{version}}'
        , GIT_REF: '{{git_sha}}-{{git_tag}}'
        , BUILD_DATE: '{{now}}'
        }

      }]
    ]
  }, {
    cwd: cwd
  , stdout: stdout
  , stderr: stderr
  , env: {
      ...process.env
    , BRANCH_NAME: 'main'
    , CI_BRANCH: 'main'
    , CI: 'true'
    , GITHUB_REF: 'refs/heads/main'
    , DOCKER_REGISTRY_USER: 'iamweasel'
    , DOCKER_REGISTRY_PASSWORD: 'secretsquirrel'
    }
  })

  t.type(result, Object, 'release object returned from release process')

  const tag = result.nextRelease.version
  const images = [
    `${DOCKER_REGISTRY_HOST}/docker-release/abcd`
  , `${DOCKER_REGISTRY_HOST}/docker-release/wxyz`
  ]

  for (const image of images) {
    const expected = `${image}:${tag}`
    const {stdout} = await execa('docker', ['pull', expected, '-q'])
    t.equal(expected, stdout, `${expected} successfully published`)
    await execa('docker', ['rmi', expected])
  }
}).catch(threw)
