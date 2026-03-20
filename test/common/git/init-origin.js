import execa from 'execa'
import initRemote from './init-remote.js'

export default initOrigin

async function initOrigin(cwd) {
  const origin = await initRemote()
  await execa('git', ['remote', 'add', 'origin', origin], {cwd: cwd})
  await execa('git', ['push', '--all', 'origin'], {cwd: cwd})
  return origin
}
