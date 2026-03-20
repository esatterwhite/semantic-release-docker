import execa from 'execa'

export default tag

async function tag(cwd, name, hash) {
  const args = hash
    ? ['tag', '-f', name, hash]
    : ['tag', name]

  await execa('git', args, {cwd: cwd})
}
