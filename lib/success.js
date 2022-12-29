'use strict'

const postPublish = require('./post-publish.js')

module.exports = success

function success(opts, context) {
  return postPublish(opts, context)
}
