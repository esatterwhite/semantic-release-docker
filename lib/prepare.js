'use strict'

const path = require('path')
const debug = require('debug')('semantic-release:semantic-release-docker:prepare')
const docker = require('./docker/index.js')

module.exports = dockerPrepare

async function dockerPrepare(opts, context) {
  const {cwd} = context
  const image = new docker.Image({
    registry: opts.registry
  , project: opts.project
  , name: opts.name
  , dockerfile: opts.dockerfile
  , build_id: opts.build
  , cwd: cwd
  })

  const args = {
    ...opts.args
  }
  if (args) {
    for (const [key, value] of Object.entries(args)) {
      image.arg(key, value)
    }
  }

  context.logger.info('building image', image.name)
  debug('build command', image.build_cmd)
  await image.build(path.join(cwd, opts.context))
  return image
}
