
'use strict'

module.exports = upper

function upper(str) {
  if (typeof str !== 'string') return ''
  return str.toUpperCase()
}
