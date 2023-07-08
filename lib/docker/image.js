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
    } = opts || {}

    if (!name || typeof name !== 'string') {
      const error = new TypeError('Docker Image "name" is required and must be a string')
      throw error
    }

    this.sha = sha
    this.opts = {
      build_id: build_id
    , context: context
    , cwd: cwd
    , dockerfile: dockerfile
    , flags: []
    , name: name
    , network: network
    , project: project
    , registry: registry
    }
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

    for (const [key, value] of this.opts.flags) {
      let normalized = key
      if (!key.startsWith('-')) {
        normalized = (key.length === 1 ? `-${key}` : `--${key}`)
          .toLowerCase()
          .replace(/_/g, '-')
      }

      output.push(normalized)
      if (value !== null) output.push(value)
    }

    return output
  }

  arg(key, val = null) {
    if (val === true || val == null) { // eslint-disable-line no-eq-null
      this.flag('build-arg', key)
    } else {
      this.flag('build-arg', `${key}=${val}`)
    }
    return this
  }

  flag(key, val) {
    if (Array.isArray(val)) {
      for (const item of val) {
        this.opts.flags.push([key, item])
      }
      return this
    }

    this.opts.flags.push([key, val])
    return this
  }

  get build_cmd() {
    return [
      'build'
    , `--network=${this.network}`
    , '--quiet'
    , '--tag'
    , this.name
    , ...this.flags
    , '-f'
    , this.dockerfile
    , this.context
    ]
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
