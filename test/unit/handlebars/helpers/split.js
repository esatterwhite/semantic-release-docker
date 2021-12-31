'use strict'

const {test, threw} = require('tap')
const {split} = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  const ret = split('10.10.10.10:400', ':')
  t.deepEqual('10.10.10.10', ret[0], 'ip address is 10.10.10.10')
  t.deepEqual('400', ret[1], 'port is 400')

  t.deepEqual(
    split('10.10.10.10:400', '')
  , ['1', '0', '.', '1', '0', '.', '1', '0', '.', '1', '0', ':', '4', '0', '0']
  , 'should split on every character'
  )

  t.deepEqual(
    split('10.10.10.10:400', 10)
  , ['', '.', '.', '.', ':400']
  , 'split on 10'
  )

  t.deepEqual(
    split(1000, '')
  , [1000]
  , 'there is no split'
  )

  t.deepEqual(
    split('10.10.10.10:400', undefined)
  , ['10.10.10.10:400']
  , 'there is no split'
  )

  t.deepEqual(
    split(undefined, ':')
  , []
  , 'there is no split'
  )
}).catch(threw)
