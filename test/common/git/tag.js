'use strict'

const execa = require('execa')

module.exports = tag

async function tag(cwd, name, hash) {
  const args = hash
    ? ['tag', '-f', name, hash]
    : ['tag', name]

  await execa('git', args, {cwd: cwd})
}
