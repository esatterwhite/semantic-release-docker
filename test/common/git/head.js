import execa from 'execa'

export default head

async function head(cwd) {
  const {stdout} = await execa('git', ['rev-parse', 'HEAD'], {cwd: cwd})
  return stdout
}
