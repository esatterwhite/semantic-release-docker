'use strict'
const object = require('../object/index.js')

module.exports = template

function template(str) {
  return function interpolate(values) {
    if (typeof str !== 'string') return str
    return str.replace(/{([^{}]*)}/g, function(original, parsed) {
      const result = object.get(values, parsed)
      return typeof result === 'string' || typeof result === 'number' ? result : original
    })
  }
}
