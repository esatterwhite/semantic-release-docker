import docker from './docker/index.js'

export default async function postPublish(opts, context) {
  const {logger} = context
  const image = docker.Image.from(opts, context)
  if (!opts.clean) return

  logger.info(`removing images for ${image.repo}`)
  await image.clean()
}
