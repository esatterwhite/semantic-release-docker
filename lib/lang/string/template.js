import handlebars from '../../handlebars/index.js'

export default function template(str) {
  if (typeof str !== 'string') return echo(str)
  return handlebars.compile(str)
}

function echo(input) {
  return () => {
    return input
  }
}
