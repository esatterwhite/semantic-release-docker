import docker from './docker/index.js'

export default async function dockerPrepare(opts, context) {
  const {image = docker.Image.from(opts, context)} = context
  context.logger.info('building image', image.name)
  context.logger.info('build command: docker %s', image.build_cmd.join(' '))
  await image.build()
  return image
}
