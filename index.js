'use strict'

const docker = require('./lib/docker/index.js')
const dockerPrepare = require('./lib/prepare.js')
const dockerVerify = require('./lib/verify.js')
const dockerPublish = require('./lib/publish.js')
const buildConfig = require('./lib/build-config.js')
const dockerSuccess = require('./lib/success.js')
const dockerFail = require('./lib/fail.js')

// map multiple images to a unique sha
const IMAGES = new Map()
module.exports = {
  buildConfig
, fail
, prepare
, publish
, success
, verifyConditions
}

/* c8 ignore start */
async function fail(config, context) {
  const opts = await buildConfig(null, config, context)
  const image = IMAGES.get(opts.build) || docker.Image.from(opts, context)
  context.image = image // eslint-disable-line require-atomic-updates
  IMAGES.set(opts.build, image)
  return dockerFail(opts, context)
}
/* c8 ignore start */

async function prepare(config, context) {
  const opts = await buildConfig(null, config, context)
  const image = await dockerPrepare(opts, context)
  IMAGES.set(opts.build, image)
  return image
}

async function publish(config, context) {
  const opts = await buildConfig(null, config, context)
  const image = IMAGES.get(opts.build) || docker.Image.from(opts, context)
  context.image = image // eslint-disable-line require-atomic-updates
  IMAGES.set(opts.build, image)
  return dockerPublish(opts, context)
}

async function success(config, context) {
  const opts = await buildConfig(null, config, context)
  const image = IMAGES.get(opts.build) || docker.Image.from(opts, context)
  context.image = image // eslint-disable-line require-atomic-updates
  IMAGES.set(opts.build, image)
  return dockerSuccess(opts, context)
}

async function verifyConditions(config, context) {
  const opts = await buildConfig(null, config, context)
  const image = IMAGES.get(opts.build) || docker.Image.from(opts, context)
  context.image = image // eslint-disable-line require-atomic-updates
  IMAGES.set(opts.build, image)
  return dockerVerify(opts, context)
}

