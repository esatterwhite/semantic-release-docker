'use strict'

const path = require('path')
const crypto = require('crypto')
const execa = require('execa')

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
    } = opts || {}

    if (!name || typeof name !== 'string') {
      const error = new TypeError('Docker Image "name" is required and must be a string')
      throw error
    }

    this.sha = sha
    this.opts = {
      args: new Map()
    , registry: registry
    , project: project
    , name: name
    , build_id: build_id
    , dockerfile: dockerfile
    , context: context
    , cwd: cwd
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

  arg(key, val) {
    this.opts.args.set(key, val)
    return this
  }

  get build_cmd() {
    const args = []
    for (const [name, value] of this.opts.args.entries()) {
      if (value === true || value == null) { // eslint-disable-line no-eq-null
        args.push('--build-arg', name)
      } else {
        args.push('--build-arg', `${name}=${value}`)
      }
    }
    const cmd = [
      'build'
    , '--quiet'
    , '--tag'
    , this.name
    , ...args
    , '-f'
    , this.dockerfile
    , this.context
    ]
    return cmd
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
