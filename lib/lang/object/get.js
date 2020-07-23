'use strict'

module.exports = getProperty

function getProperty(obj, str, sep = '.') {
  if (!obj || !str) return null
  const parts = str.split(sep)
  let ret = obj
  const last = parts.pop()
  let prop

  /* eslint-disable no-cond-assign */
  while (prop = parts.shift()) {
    ret = ret[prop]
    if (ret === null || ret === undefined) return ret
  }
  return ret[last]
}
