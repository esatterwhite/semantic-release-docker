'use strict'

const docker = require('./docker/index.js')

module.exports = publish

async function publish(opts, context) {
  const image = docker.Image.from(opts, context)
  await image.push()
}
