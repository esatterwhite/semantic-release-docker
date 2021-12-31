'use strict'

module.exports = endsWith

function endsWith(str, ...args) {
  if (typeof str !== 'string') return false
  return args.some((arg) => {
    return str.endsWith(arg)
  })
}
