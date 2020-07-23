'use strict'

const path = require('path')
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

  if (opts.args) {
    for (const [key, value] of Object.entries(opts.args)) {
      image.arg(key, value)
    }
  }

  context.logger.info('building image', image.name)

  await image.build(path.join(cwd, opts.context))
  return image
}
