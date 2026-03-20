import path from 'path'
import os from 'os'
import {promises as fs} from 'fs'
import execa from 'execa'

export default initRemote

async function initRemote(branch = 'main') {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), path.sep))
  await execa('git', [
    'init', '--bare', `--initial-branch=${branch}`
  ], {cwd: cwd})
  return `file://${cwd}`
}
