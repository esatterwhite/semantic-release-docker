'use strict'

const {promises: fs} = require('fs')
const execa = require('execa')
const debug = require('debug')('semantic-release:semantic-release-docker:verify')
const SemanticError = require('@semantic-release/error')
const prepare = require('./prepare.js')
const docker = require('./docker/index.js')

module.exports = verify

async function verify(opts, context) {
  const {env, cwd} = context
  const PASSWORD = env.DOCKER_REGISTRY_PASSWORD || env.GITHUB_TOKEN
  const USERNAME = env.DOCKER_REGISTRY_USER

  if (!opts.name) {
    const error = new SemanticError(
      'Docker image name not found'
    , 'EINVAL'
    , 'Image name parsed from package.json name if possible. '
        + 'Or via the "dockerImage" option.'
    )
    throw error
  }

  const image = new docker.Image({
    registry: opts.registry
  , project: opts.project
  , name: opts.name
  , dockerfile: opts.dockerfile
  , build_id: opts.build
  , cwd: cwd
  , context: opts.context
  })

  debug('docker options', opts)

  try {
    await fs.readFile(image.dockerfile)
  } catch (err) {
    const error = new SemanticError(
      `Unable to locate Dockerfile: ${image.dockerfile}`
    , err.code
    , 'Docker file is read from a local relative to PWD. Make sure the "dockerfile"'
        + ' option is set to the desired location'
    )

    throw error
  }

  debug('image to build', image.repo)
  if (!USERNAME && !PASSWORD) {
    debug('No docker credentials found.  Skipping login')
  } else {
    await doLogin({...opts, USERNAME, PASSWORD}, context)
  }

  if (!opts.verifycmd) return true

  const img = await prepare(opts, context)
  const output = await img.run(opts.verifycmd)
  if (opts.dryRun) await img.clean()
  return output
}

async function doLogin(opts, context) {
  const {USERNAME, PASSWORD} = opts
  const {logger} = context

  if (opts.login === false) {
    debug('docker login === false. Skipping login')
  } else {
    let set = 0
    if (USERNAME) set += 1
    if (PASSWORD) set += 1

    if (set !== 2) {
      const error = new SemanticError(
        'Docker authentication failed'
      , 'EAUTH'
      , 'Both ENV vars DOCKER_REGISTRY_USER and DOCKER_REGISTRY_PASSWORD must be set'
      )
      throw error
    }

    const passwd = execa('echo', [PASSWORD])
    const login = execa('docker', [
      'login'
    , opts.registry || ''
    , '-u', USERNAME
    , '--password-stdin'
    ])

    passwd.stdout.pipe(login.stdin)

    try {
      await login
    } catch (err) {
      logger.fatal(err)
      const error = new SemanticError(
        'Docker authentication failed'
      , 'EAUTH'
      , `Authentication to ${opts.registry || 'dockerhub'} failed`
      )
      throw error
    }
    logger.success('docker login successful')
  }
}
