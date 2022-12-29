'use strict'

const docker = require('./docker/index.js')

module.exports = postPublish

async function postPublish(opts, context) {
  const {cwd, logger} = context
  const image = new docker.Image({
    registry: opts.registry
  , project: opts.project
  , name: opts.name
  , dockerfile: opts.dockerfile
  , build_id: opts.build
  , cwd: cwd
  , context: opts.context
  })

  if (!opts.clean) return

  logger.info(`removing images for ${image.repo}`)
  await image.clean()
}
