'use strict'

const postPublish = require('./post-publish.js')

module.exports = fail

function fail(opts, context) {
  return postPublish(opts, context)
}
