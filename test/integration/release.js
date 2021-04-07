'use strict'

const execa = require('execa')
const {test, threw} = require('tap')
const git = require('../common/git/index.js')

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
      , docker: {
          registry: 'localhost:5000'
        , project: 'docker-release'
        , image: 'fake'
        , args: {
            SAMPLE_THING: '{type}.{version}'
          , GIT_REF: '{git_sha}-{git_tag}'
          }
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
  , Dockerfile: 'FROM debian:buster-slim\n\nRUN ls -alh'
  , '.gitignore': 'node_modules/'
  })

  await git.init(cwd)
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
    , extendEnv: false
    , env: {
        BRANCH_NAME: 'main'
      , CI_BRANCH: 'main'
      , CI: 'true'
      , GITHUB_REF: 'refs/heads/main'
      , PWD: cwd
      , DEBUG: process.env.DEBUG
      , PATH: process.env.PATH
      , HOME: process.env.HOME
      , USER: process.env.USER
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
  , extendEnv: false
  , env: {
      BRANCH_NAME: 'main'
    , CI_BRANCH: 'main'
    , CI: 'true'
    , GITHUB_REF: 'refs/heads/main'
    , PWD: cwd
    , DEBUG: process.env.DEBUG
    , PATH: process.env.PATH
    , HOME: process.env.HOME
    , USER: process.env.USER
    }
  })
  await stream

}).catch(threw)
