'use strict'

const hash = require('object-hash')
const path = require('path')
const readPkg = require('./read-pkg.js')
const object = require('./lang/object/index.js')
const array = require('./lang/array/index.js')
const parsePkgName = require('./parse-pkg-name.js')
const typeCast = require('./lang/string/typecast.js')
const PWD = '.'
const PID = `${process.pid}`
const TIMESTAMP = new Date().toISOString()

module.exports = buildConfig

function applyDefaults(config) {

  const {
    dockerFile: dockerfile = 'Dockerfile'
  , dockerNoCache: nocache = false
  , dockerTags: tags = ['latest', '{{major}}-latest', '{{version}}']
  , dockerArgs: args = {}
  , dockerBuildFlags: build_flags = {}
  , dockerBuildCacheFrom: cache_from
  , dockerRegistry: registry = null
  , dockerLogin: login = true
  , dockerImage: image
  , dockerPlatform: platform = null
  , dockerPublish: publish = true
  , dockerContext = '.'
  , dockerVerifyCmd: verifycmd = null
  , dockerNetwork: network = 'default'
  , dockerAutoClean: clean = true
  , dockerBuildQuiet: quiet = true
  , dryRun: dry_run = false
  } = config

  return {
    dockerfile
  , nocache
  , tags
  , args
  , build_flags
  , cache_from
  , registry
  , login
  , image
  , platform
  , publish
  , dockerContext
  , verifycmd
  , network
  , clean
  , quiet
  , dry_run
  }
}

async function buildConfig(build_id, config, context) {
  let name = null
  let scope = null
  let pkg = {}

  const normalized = applyDefaults(config)

  const {
    dockerfile
  , nocache
  , tags
  , args
  , build_flags
  , cache_from
  , registry
  , login
  , image
  , platform
  , publish
  , dockerContext
  , verifycmd
  , network
  , clean
  , quiet
  , dry_run
  } = normalized

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

  if (cache_from) build_flags.cache_from = array.toArray(cache_from)

  const configuration = {
    registry
  , dockerfile
  , nocache
  , build_flags
  , pkg
  , project
  , publish
  , tags: array.toArray(tags)
  , verifycmd
  , dry_run: !!typeCast(dry_run || context.dryRun)
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
  , build: null
  , login: login
  , env: context.env
  , context: dockerContext
  , network: network
  , quiet: typeCast(quiet) === true
  , clean: typeCast(clean) === true
  , platform: array.toArray(platform)
  }

  configuration.build = build_id || genBuildId(normalized)
  return configuration
}

function genBuildId(configuration) {
  return hash([configuration, PID, TIMESTAMP], {algorithm: 'sha256'})
}
