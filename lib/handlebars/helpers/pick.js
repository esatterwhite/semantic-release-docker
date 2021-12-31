'use strict'

module.exports = pick

function pick(...args) {
  return args.find((value) => {
    /* eslint-disable no-eq-null */
    if (value == null) return false
    /* eslint-enable no-eq-null */
    if (value === '') return false
    return true
  })
}
