'use strict'

const actions = require('@actions/core')
const docker = require('./docker/index.js')

module.exports = publish

async function publish(opts, context) {
  const {image = docker.Image.from(opts, context)} = context

  const sha = image.sha || opts.build_id
  const sha256 = image.sha256 || opts.build_id

  actions.setOutput('docker_image', image.repo)
  actions.setOutput('docker_image_build_id', opts.build_id)
  actions.setOutput('docker_image_sha_short', sha)
  actions.setOutput('docker_image_sha_long', sha256)

  actions.exportVariable('SEMANTIC_RELEASE_DOCKER_IMAGE', image.repo)
  actions.exportVariable('SEMANTIC_RELEASE_DOCKER_IMAGE_BUILD_ID', opts.build_id)
  actions.exportVariable('SEMANTIC_RELEASE_DOCKER_IMAGE_SHA_SHORT', sha)
  actions.exportVariable('SEMANTIC_RELEASE_DOCKER_IMAGE_SHA_LONG', sha256)
  await image.push()
}
