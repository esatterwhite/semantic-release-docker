'use strict'

const execa = require('execa')

module.exports = add

async function add(cwd, file = '.') {
  await execa('git', ['add', file], {cwd: cwd})
}
