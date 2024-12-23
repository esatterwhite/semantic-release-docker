'use strict'

const os = require('os')
const path = require('path')
const crypto = require('crypto')
const execa = require('execa')
const buildTemplateVars = require('../build-template-vars.js')
const array = require('../lang/array/index.js')
const string = require('../lang/string/index.js')
const SHA_REGEX = /(?:writing image\s)?[^@]?(?:sha\d{3}):(?<sha>\w+)/i

function render(item, vars) {
  if (Array.isArray(item)) {
    return item.map((element) => {
      return string.template(element)(vars)
    })
  }
  return string.template(item)(vars)
}

class Image {
  constructor(opts) {
    const {
      registry = null
    , project = null
    , name = null
    , sha = null
    , build_id = crypto.randomBytes(10).toString('hex')
    , dockerfile = 'Dockerfile'
    , cwd = process.cwd()
    , context = '.'
    , network = 'default'
    , publish = true
    , quiet = true
    , dry_run = false
    , tags = []
    , platform = []
    } = opts || {}

    if (!name || typeof name !== 'string') {
      const error = new TypeError('Docker Image "name" is required and must be a string')
      throw error
    }

    this.sha = sha
    this.sha256 = null
    this.opts = {
      build_id: build_id
    , args: new Map()
    , context: context
    , cwd: cwd
    , dockerfile: dockerfile
    , flags: new Map()
    , name: name
    , tags: tags
    , network: network
    , project: project
    , registry: registry
    , dry_run: dry_run
    , publish: publish
    , platform: array.toArray(platform)
    }

    if (quiet) this.flag('quiet', null)

    for (const tag of this.tags) {
      this.flag('tag', tag)
    }
  }

  static from(opts, context) {
    const vars = buildTemplateVars(opts, context)
    const tags = opts.tags.map((template) => {
      return string.template(template)(vars)
    }).filter(Boolean)

    const image = new(this)({
      registry: opts.registry
    , project: opts.project
    , name: opts.name
    , dockerfile: opts.dockerfile
    , build_id: opts.build
    , cwd: context.cwd
    , tags: tags
    , context: opts.context
    , network: opts.network
    , quiet: opts.quiet
    , publish: opts.publish
    , platform: opts.platform
    , dry_run: !!opts.dry_run
    })
    for (const [key, value] of Object.entries(opts.args)) {
      image.arg(key, string.template(value)(vars))
    }

    for (const [key, value] of Object.entries(opts.build_flags)) {
      image.flag(key, render(value, vars))
    }

    return image
  }

  get id() {
    if (this.sha) return this.sha
    return `${this.opts.name}:${this.opts.build_id}`
  }

  get repo() {
    const parts = []
    if (this.opts.registry) parts.push(this.opts.registry)
    if (this.opts.project) parts.push(this.opts.project)
    parts.push(this.opts.name)
    return parts.join('/')
  }

  get is_buildx() {
    return !!this.opts.platform?.length
  }

  get name() {
    return `${this.repo}:${this.opts.build_id}`
  }

  get context() {
    return path.resolve(this.opts.cwd, this.opts.context)
  }

  set context(ctx) {
    this.opts.context = ctx
    return this.opts.context
  }

  get dockerfile() {
    return path.resolve(this.opts.cwd, this.opts.dockerfile)
  }

  get network() {
    return this.opts.network
  }

  get flags() {
    const output = []

    for (const [key, value] of this.opts.flags.entries()) {
      let normalized = key
      if (!key.startsWith('-')) {
        normalized = (key.length === 1 ? `-${key}` : `--${key}`)
          .toLowerCase()
          .replace(/_/g, '-')
      }

      if (value === null) {
        output.push(normalized)
        continue
      }

      for (const item of value) {
        output.push(normalized, item)
      }
    }

    return output
  }

  get tags() {
    const output = []
    if (this.opts.dry_run) return output
    for (const tag of this.opts.tags) {
      output.push(
        `${this.repo}:${tag}`
      )
    }

    return output
  }

  get build_cmd() {
    return this.opts.platform.length
      ? this.buildx_cmd
      : this.docker_cmd
  }
  get docker_cmd() {
    return [
      'build'
    , `--network=${this.network}`
    , '--tag'
    , this.name
    , ...this.flags
    , '-f'
    , this.dockerfile
    , this.context
    ].filter(Boolean)
  }

  get buildx_cmd() {
    if (!this.is_buildx) return
    this.opts.flags.delete('provenance') // incompatible with load/push
    this.opts.flags.delete('output') // alias of load/push
    this.opts.flags.delete('load')
    this.opts.flags.set('platform', [this.opts.platform.join(',')])

    this.flag('pull', null)
    if (this.opts.dry_run || !this.opts.publish) {
      this.opts.flags.delete('push')
    } else {
      this.flag('push', null)
    }

    const cmd = this.docker_cmd
    cmd.unshift('buildx')

    this.opts.flags.delete('platform')
    this.opts.flags.delete('push')
    this.opts.flags.delete('pull')
    // remove the build id tag
    cmd.splice(cmd.indexOf(this.name) - 1, 2)
    return cmd
  }

  arg(key, val = null) {
    if (val === true || val == null) { // eslint-disable-line no-eq-null
      this.flag('build-arg', key)
    } else {
      this.flag('build-arg', `${key}=${val}`)
    }
    this.opts.args.set(key, val)
    return this
  }

  flag(key, val) {
    if (val === null) {
      this.opts.flags.set(key, val)
      return this
    }

    let value = this.opts.flags.get(key) || []

    if (Array.isArray(val)) {
      value = value.concat(val)
    } else {
      value.push(val)
    }

    this.opts.flags.set(key, value)
    return this
  }

  async run(cmd) {
    if (this.is_buildx) return
    const stream = execa('docker', [
      'run'
    , '--rm'
    , this.name
    , ...array.toArray(cmd)
    ], {all: true})

    stream.stdout.pipe(process.stdout)
    stream.stderr.pipe(process.stderr)

    const {all} = await stream
    return all
  }

  async build() {
    const stream = execa('docker', this.build_cmd)
    stream.stdout.pipe(process.stdout)
    stream.stderr.pipe(process.stderr)
    const {stdout, stderr} = await stream
    const lines = (stdout || stderr).split(os.EOL)
    const len = lines.length - 1

    for (let x = len; x >= 0; x--) {
      const line = lines[x]
      const match = SHA_REGEX.exec(line)
      if (match) {
        this.sha256 = match.groups.sha
        this.sha = this.sha256.substring(0, 12)
        return this.sha
      }
    }
    this.sha = this.opts.build_id
    return this.sha
  }

  async tag(tag, push = true) {
    await execa('docker', ['tag', this.name, `${this.repo}:${tag}`])
    if (!push) return

    const stream = execa('docker', ['push', `${this.repo}:${tag}`])
    stream.stdout.pipe(process.stdout)
    stream.stderr.pipe(process.stderr)
    await stream
  }

  async push() {
    // push is a part of the buildx build operation
    // At this point the tags have already been pushed.
    // re-pushing manually is considered destructive
    if (this.is_buildx) return
    if (!this.opts.publish) return

    for (const tag of this.opts.tags) {
      await this.tag(tag)
    }
  }

  async clean() {
    const {stdout: images} = await execa('docker', ['images', this.repo, '-q'])
    if (!images) return
    await execa('docker', ['rmi', '-f', ...images.split(os.EOL)])
  }
}

module.exports = Image
