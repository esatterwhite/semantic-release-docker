'use strict'

const path = require('path')
const docker = require('./docker/index.js')
const buildTemplateVars = require('./build-template-vars.js')
const string = require('./lang/string/index.js')

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
  , context: opts.context
  , network: opts.network
  })

  const vars = buildTemplateVars(opts, context)

  function render(item, vars) {
    if (Array.isArray(item)) {
      return item.map((element) => {
        return string.template(element)(vars)
      })
    }
    return string.template(item)(vars)
  }

  for (const [key, value] of Object.entries(opts.args)) {
    image.arg(key, string.template(value)(vars))
  }

  for (const [key, value] of Object.entries(opts.build_flags)) {
    image.flag(key, render(value, vars))
  }

  context.logger.info('building image', image.name)
  context.logger.debug('build command: docker %s', image.build_cmd.join(' '))
  await image.build(path.join(cwd, opts.context))
  return image
}
