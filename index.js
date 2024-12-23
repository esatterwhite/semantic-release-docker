'use strict'

const crypto = require('crypto')
const docker = require('./lib/docker/index.js')
const dockerPrepare = require('./lib/prepare.js')
const dockerVerify = require('./lib/verify.js')
const dockerPublish = require('./lib/publish.js')
const buildConfig = require('./lib/build-config.js')
const dockerSuccess = require('./lib/success.js')
const dockerFail = require('./lib/fail.js')
const build_id = crypto.randomBytes(10).toString('hex')

let image
module.exports = {
  buildConfig
, fail
, prepare
, publish
, success
, verifyConditions
}

/* istanbul ignore next */
async function fail(config, context) {
  const opts = await buildConfig(build_id, config, context)
  context.image = image || docker.Image.from(opts, context)
  return dockerFail(opts, context)
}

async function prepare(config, context) {
  const opts = await buildConfig(build_id, config, context)
  image = await dockerPrepare(opts, context)
  return image
}

async function publish(config, context) {
  const opts = await buildConfig(build_id, config, context)
  context.image = image || docker.Image.from(opts, context)
  return dockerPublish(opts, context)
}

async function success(config, context) {
  const opts = await buildConfig(build_id, config, context)
  context.image = image || docker.Image.from(opts, context)
  return dockerSuccess(opts, context)
}

async function verifyConditions(config, context) {
  const opts = await buildConfig(build_id, config, context)
  context.image = image || docker.Image.from(opts, context)
  return dockerVerify(opts, context)
}
