'use strict'

const Handlebars = require('handlebars')
const helpers = require('./helpers')
const handlebars = Handlebars.noConflict()

handlebars.registerHelper(helpers)

module.exports = handlebars

