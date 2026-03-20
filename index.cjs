'use strict'

let _module

function loadModule() {
  if (!_module) _module = import('./index.js')
  return _module
}

module.exports = {
  buildConfig: async function(...args) {
    const m = await loadModule()
    return m.buildConfig(...args)
  }
, fail: async function(...args) {
    const m = await loadModule()
    return m.fail(...args)
  }
, prepare: async function(...args) {
    const m = await loadModule()
    return m.prepare(...args)
  }
, publish: async function(...args) {
    const m = await loadModule()
    return m.publish(...args)
  }
, success: async function(...args) {
    const m = await loadModule()
    return m.success(...args)
  }
, verifyConditions: async function(...args) {
    const m = await loadModule()
    return m.verifyConditions(...args)
  }
}
