'use strict'

const crypto = require('crypto')
const dockerPrepare = require('./lib/prepare.js')
const dockerVerify = require('./lib/verify.js')
const dockerPublish = require('./lib/publish.js')
const buildConfig = require('./lib/build-config.js')
const build_id = crypto.randomBytes(10).toString('hex')

module.exports = {
  prepare
, publish
, verifyConditions
, buildConfig
}

async function prepare(config, context) {
  return dockerPrepare(await buildConfig(build_id, config, context), context)
}

async function publish(config, context) {
  return dockerPublish(await buildConfig(build_id, config, context), context)
}

async function verifyConditions(config, context) {
  return dockerVerify(await buildConfig(build_id, config, context), context)
}

