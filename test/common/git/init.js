'use strict'

const path = require('path')
const os = require('os')
const {promises: fs} = require('fs')
const execa = require('execa')

module.exports = init

async function init(dir, branch = 'main') {
  const cwd = dir || await fs.mkdtemp(path.join(os.tmpdir(), path.sep))
  await execa('git', ['init', cwd])
  await execa('git', ['checkout', '-b', branch], {cwd: cwd})
  await execa('git', ['config', '--add', 'commit.gpgsign', false])
  await execa('git', ['config', '--add', 'pull.default', 'current'], {cwd})
  await execa('git', ['config', '--add', 'push.default', 'current'], {cwd})
  await execa('git', ['config', '--add', 'user.name', 'secretsquirrel'], {cwd})
  await execa('git', ['config', '--add', 'user.email', 'secret@mail.com'], {cwd})
  return cwd
}
