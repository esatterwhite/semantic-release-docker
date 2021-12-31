'use strict'

const handlebars = require('../../handlebars')

module.exports = template

function template(str) {
  if (typeof str !== 'string') return echo(str)
  return handlebars.compile(str)
}

function echo(input) {
  return () => {
    return input
  }
}
