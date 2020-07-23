'use strict'

const NAME_EXP = /^(?:@([^/]+?)[/])?([^/]+?)$/

module.exports = parsePkgName

function parsePkgName(pkgname) {
  if (!pkgname) return {scope: null, name: null}
  const [_, scope = null, name = null] = (NAME_EXP.exec(pkgname) || [])
  return {scope, name}
}

