import execa from 'execa'

export default push

async function push(cwd, remote = 'origin', branch = 'main') {
  await execa('git', ['push', '--tags', remote, `HEAD:${branch}`], {cwd: cwd})
}
