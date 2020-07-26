'use strict'

module.exports = hasProperty

function hasProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop)
}
