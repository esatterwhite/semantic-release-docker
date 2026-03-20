import execa from 'execa'

export default add

async function add(cwd, file = '.') {
  await execa('git', ['add', file], {cwd: cwd})
}
