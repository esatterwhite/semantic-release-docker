import Handlebars from 'handlebars'
import helpers from './helpers/index.js'
const handlebars = Handlebars.noConflict()

handlebars.registerHelper(helpers)

export default handlebars
