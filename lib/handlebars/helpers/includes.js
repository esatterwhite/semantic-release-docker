'use strict'

module.exports = includes

function includes(input, arg, position) {
  if (!Array.isArray(input) && typeof input !== 'string') return false
  return input.includes(arg, position)
}

