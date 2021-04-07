'use strict'

const semver = require('semver')

module.exports = buildTemplateVars

function buildTemplateVars(context, opts) {
  const {nextRelease = {}, lastRelease = {}} = context

  const versions = {
    next: semver.parse(nextRelease.version) || {}
  , previous: semver.parse(lastRelease.version) || {}
  }

  const {tags: _, ...rest} = opts
  return {
    ...versions.next
  , ...versions
  , ...nextRelease
  , ...rest
  , git_tag: nextRelease.gitTag
  , git_sha: nextRelease.gitHead
  , release_type: nextRelease.type
  , release_notes: nextRelease.notes
  }
}
