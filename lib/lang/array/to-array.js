'use strict'

const CSV_SEP_EXP = /\s*,\s*/
module.exports = function toArray(item, sep = CSV_SEP_EXP) {
  if (!item) return []
  if (item instanceof Set) return Array.from(item)
  if (Array.isArray(item)) return item
  return typeof item === 'string' ? item.split(sep) : [item]
}
