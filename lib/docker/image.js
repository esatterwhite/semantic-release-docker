'use strict'

const path = require('path')
const crypto = require('crypto')
const execa = require('execa')
const array = require('../lang/array/index.js')

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
    , quiet = true
    } = opts || {}

    if (!name || typeof name !== 'string') {
      const error = new TypeError('Docker Image "name" is required and must be a string')
      throw error
    }

    this.sha = sha
    this.opts = {
      build_id: build_id
    , args: new Map()
    , context: context
    , cwd: cwd
    , dockerfile: dockerfile
    , flags: new Map()
    , name: name
    , network: network
    , project: project
    , registry: registry
    }

    if (quiet) this.flag('quiet', null)
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

  get build_cmd() {
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

  async run(cmd) {
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
    const {stdout} = await stream
    const [_, sha] = stdout.split(':')
    this.sha = sha.substring(0, 12)
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
    await execa('docker', ['push', this.repo])
  }

  async clean() {
    const images = execa('docker', ['images', this.repo, '-q'])
    const rm = execa('xargs', ['docker', 'rmi', '-f'])
    images.stdout.pipe(rm.stdin)
    return rm
  }
}

module.exports = Image
