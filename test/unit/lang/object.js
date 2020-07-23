'use strict'

const {test, threw} = require('tap')
const object = require('../../../lib/lang/object/index.js')

test('object', async (t) => {
  const obj = {
    foo: {
      bar: {
        baz: {
          key: 'value'
        , test: null
        }
      }
    , value: 'foobar'
    , array: [1, 2, 3]
    }
  , bar: 0
  , baz: false
  , biff: null
  }

  t.test('get', async (tt) => {
    tt.match(object.get(obj, 'foo.bar'), {
      baz: {
        key: 'value'
      , test: null
      }
    })
    tt.deepEqual(object.get(obj, 'foo.array'), [1, 2, 3], 'foo.array')
    tt.equal(object.get(obj, 'foo.bar.baz.key'), 'value', 'foo.bar.baz.key')
    tt.equal(object.get(obj, 'foo|bar|baz|key', '|'), 'value', 'foo.bar.baz.key')
    tt.equal(object.get(obj, 'does.not.exist'), undefined, 'does.not.exist')
    tt.strictEqual(object.get(obj, 'foo.bar.baz.test'), null, 'foo.bar.baz.test')
    tt.strictEqual(object.get(null, 'foo.bar.baz'), null, 'null input')
  })
}).catch(threw)
