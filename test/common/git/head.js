'use strict'

const execa = require('execa')

module.exports = head

async function head(cwd) {
  const {stdout} = await execa('git', ['rev-parse', 'HEAD'], {cwd: cwd})
  return stdout
}
