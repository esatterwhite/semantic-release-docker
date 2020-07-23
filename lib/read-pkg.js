'use strict'

const path = require('path')
const {promises: fs} = require('fs')

module.exports = getPkg

async function getPkg(opts) {
  const {cwd = process.cwd()} = opts || {}
  const pkg = await fs.readFile(path.join(cwd, 'package.json'), 'utf8')
  return JSON.parse(pkg)
}
