'use strict'

const path = require('path')
const readPkg = require('./read-pkg.js')
const object = require('./lang/object/index.js')
const array = require('./lang/array/index.js')
const parsePkgName = require('./parse-pkg-name.js')
const PWD = '.'

module.exports = buildConfig

async function buildConfig(build_id, config, context) {
  const {
    dockerFile: dockerfile = 'Dockerfile'
  , dockerNoCache: nocache = false
  , dockerTags: tags = ['latest', '{major}-latest', '{version}']
  , dockerArgs: args = {}
  , dockerRegistry: registry = null
  , dockerLogin: login = true
  , dockerImage: image
  , dockerPublish: publish = true
  , dockerContext = '.'
  , dockerTarget = null
  } = config

  let name = null
  let scope = null
  let pkg = {}
  try {
    pkg = await readPkg({cwd: context.cwd})
    const parsed = parsePkgName(pkg.name)
    name = parsed.name
    scope = parsed.scope
  } catch (_) {}

  const project = object.has(config, 'dockerProject') ? config.dockerProject : scope
  const root = object.get(context, 'options.root')
  const target = path.relative(root || context.cwd, context.cwd) || PWD
  const {nextRelease = {}} = context
  return {
    registry
  , dockerfile
  , nocache
  , pkg
  , project
  , publish
  , tags: array.toArray(tags)
  , args: {
      SRC_DIRECTORY: path.basename(context.cwd)
    , TARGET_PATH: target
    , NPM_PACKAGE_NAME: object.get(pkg, 'name')
    , NPM_PACKAGE_SCOPE: scope
    , CONFIG_NAME: image || name
    , CONFIG_PROJECT: project
    , GIT_SHA: nextRelease.gitHead || ''
    , GIT_TAG: nextRelease.gitTag || ''
    , ...(args || {})
    }
  , name: image || name
  , build: build_id
  , login: login
  , env: context.env
  , context: dockerContext
  , target: dockerTarget,
  }
}
