'use strict'

const path = require('path')
const os = require('os')
const {promises: fs} = require('fs')
const execa = require('execa')

module.exports = initRemote

async function initRemote(branch = 'main') {
  const cwd = await fs.mkdtemp(path.join(os.tmpdir(), path.sep))
  await execa('git', [
    'init', '--bare', `--initial-branch=${branch}`
  ], {cwd: cwd})
  return `file://${cwd}`
}
