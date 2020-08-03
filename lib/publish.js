'use strict'

const semver = require('semver')
const docker = require('./docker/index.js')
const string = require('./lang/string/index.js')

module.exports = publish

async function publish(opts, context) {
  const {lastRelease, nextRelease, cwd, logger} = context
  const versions = {
    next: semver.parse(nextRelease.version)
  , previous: semver.parse(lastRelease.version)
  }

  const image = new docker.Image({
    registry: opts.registry
  , project: opts.project
  , name: opts.name
  , dockerfile: opts.dockerfile
  , build_id: opts.build
  , cwd: cwd
  })

  const vars = {
    ...versions.next
  , ...versions
  }

  const tags = opts.tags.map((template) => {
    return string.template(template)(vars)
  })

  logger.info('tagging docker image', image.id)
  for (const tag of tags) {
    console.log(`pushing image: ${image.repo} tag: ${tag}`)
    await image.tag(tag)
  }

  await image.clean()
}
