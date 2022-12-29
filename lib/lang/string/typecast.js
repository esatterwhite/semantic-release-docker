'use strict'

/**
 * @module lib/string/typecast
 * @author Eric Satterwhite
 **/

module.exports = function typecast(value) {
  if (value === 'null' || value === null) return null
  if (value === 'undefined' || value === undefined) return undefined
  if (value === 'true' || value === true) return true
  if (value === 'false' || value === false) return false
  if (value === '' || isNaN(value)) return value
  if (isFinite(value)) return parseFloat(value)
  return value
}

/**
 * Best effort to cast a string to its native couter part where possible
 * Supported casts are booleans, numbers, null and undefined
 * @function module:lib/string/typecast
 * @param {String} str The string value to typecast
 * @return {*} The coerced value
 * @example
 * typecast('null') // null
 * @example
 * typecast('true') // true
 * @example
 * typecast('10.01') // 10.01
 * @example
 * typecast({}) // {}
 **/
