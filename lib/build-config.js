'use strict'

const path = require('path')
const readPkg = require('./read-pkg.js')
const object = require('./lang/object/index.js')
const parsePkgName = require('./parse-pkg-name.js')
const PWD = '.'

module.exports = buildConfig

async function buildConfig(build_id, config, context) {
  const {
    dockerfile = 'Dockerfile'
  , nocache = false
  , tags = ['latest', '{major}-latest', '{version}']
  , args = {}
  , registry = null
  , login = true
  , image
  } = (object.get(config, 'docker') || {})

  let name = null
  let scope = null
  let pkg = {}
  try {
    pkg = await readPkg({cwd: context.cwd})
    const parsed = parsePkgName(pkg.name)
    name = parsed.name
    scope = parsed.scope
  } catch (_) {}

  const project = object.has(config.docker, 'project') ? config.docker.project : scope
  const root = object.get(context, 'options.root')
  const target = path.relative(root || context.cwd, context.cwd) || PWD

  return {
    tags
  , registry
  , dockerfile
  , nocache
  , pkg
  , project
  , args: {
      SRC_DIRECTORY: path.basename(context.cwd)
    , TARGET_PATH: target
    , NPM_PACKAGE_NAME: object.get(pkg, 'name')
    , NPM_PACKAGE_SCOPE: scope
    , CONFIG_NAME: image || name
    , CONFIG_PROJECT: project
    , ...args
    }
  , name: image || name
  , build: build_id
  , login: login
  , context: config.context || '.'
  }
}
