'use strict'

const execa = require('execa')
const head = require('./head.js')

module.exports = commit

async function commit(cwd, message) {
  await execa('git', ['commit', '-m', message], {cwd: cwd})
  return head(cwd)
}
