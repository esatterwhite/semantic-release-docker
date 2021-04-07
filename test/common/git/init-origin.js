'use strict'

const execa = require('execa')
const initRemote = require('./init-remote.js')

module.exports = initOrigin

async function initOrigin(cwd) {
  const origin = await initRemote()
  await execa('git', ['remote', 'add', 'origin', origin], {cwd: cwd})
  await execa('git', ['push', '--all', 'origin'], {cwd: cwd})
  return origin
}
