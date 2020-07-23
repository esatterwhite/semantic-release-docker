'use strict'

const readPkg = require('./read-pkg.js')
const parsePkgName = require('./parse-pkg-name.js')

module.exports = buildConfig

async function buildConfig(build_id, config, context) {
  const {
    dockerfile = 'Dockerfile'
  , nocache = false
  , tags = ['latest', '{major}-latest', '{version}']
  , args = {}
  , registry = null
  , project
  , image
  } = config

  let name = null
  let scope = null
  try {
    const pkg = await readPkg({cwd: context.cwd})
    const parsed = parsePkgName(pkg.name)
    name = parsed.name
    scope = parsed.scope
  } catch (_) {}

  return {
    tags
  , registry
  , args
  , dockerfile
  , nocache
  , name: image || name
  , build: build_id
  , project: project === null ? project : scope
  , context: config.context || '.'
  }
}
