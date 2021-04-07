'use strict'

const buildTemplateVars = require('./build-template-vars.js')
const docker = require('./docker/index.js')
const string = require('./lang/string/index.js')

module.exports = publish

async function publish(opts, context) {
  const {cwd, logger} = context
  const image = new docker.Image({
    registry: opts.registry
  , project: opts.project
  , name: opts.name
  , dockerfile: opts.dockerfile
  , build_id: opts.build
  , cwd: cwd
  })

  const vars = buildTemplateVars(context, opts)
  const tags = opts.tags.map((template) => {
    return string.template(template)(vars)
  }).filter(Boolean)

  logger.info('tagging docker image', image.id)
  for (const tag of tags) {
    logger.info(`pushing image: ${image.repo} tag: ${tag}`)
    await image.tag(tag)
  }

  await image.clean()
}
