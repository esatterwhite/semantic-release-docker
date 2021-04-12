'use strict'

const {test, threw} = require('tap')
const array = require('../../../lib/lang/array/index.js')

test('array', async (t) => {
  t.test('toArray', async (t) => {
    const cases = [
      {value: undefined, expected: [], message: 'toArray(undefined) == []'}
    , {value: null, expected: [], message: 'toArray(null) == []'}
    , {value: 1, expected: [1], message: 'toArray(1) == [1]'}
    , {value: '', expected: [], message: 'toArray(\'\') == []'}
    , {value: 'test', expected: ['test']}
    , {value: '1,2,3', expected: ['1', '2', '3']}
    , {value: '1, 2, 3', expected: ['1', '2', '3']}
    , {value: '1, 2, 3', expected: ['1', ' 2', ' 3'], sep: ','}
    , {value: '1|2|3', expected: ['1', '2', '3'], sep: '|'}
    , {value: [1, 2, 3], expected: [1, 2, 3]}
    , {value: new Set([1, null, 'test']), expected: [1, null, 'test']}
    ]
    for (const current of cases) {
      const args = [current.value]
      if (current.sep) {
        args.push(current.sep)
      }

      t.deepEqual(
        array.toArray(...args)
      , current.expected
      , current.message || `toArray(${current.value}) == ${current.expected}`
      )
    }
  })
}).catch(threw)
