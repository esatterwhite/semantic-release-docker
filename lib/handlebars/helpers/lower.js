'use strict'

module.exports = lower

function lower(str) {
  if (typeof str !== 'string') return ''
  return str.toLowerCase()
}
