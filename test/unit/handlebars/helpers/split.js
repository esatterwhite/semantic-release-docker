'use strict'

const {test, threw} = require('tap')
const {split} = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  const ret = split('10.10.10.10:400', ':')
  t.same('10.10.10.10', ret[0], 'ip address is 10.10.10.10')
  t.same('400', ret[1], 'port is 400')

  t.same(
    split('10.10.10.10:400', '')
  , ['1', '0', '.', '1', '0', '.', '1', '0', '.', '1', '0', ':', '4', '0', '0']
  , 'should split on every character'
  )

  t.same(
    split('10.10.10.10:400', 10)
  , ['', '.', '.', '.', ':400']
  , 'split on 10'
  )

  t.same(
    split(1000, '')
  , [1000]
  , 'there is no split'
  )

  t.same(
    split('10.10.10.10:400', undefined)
  , ['10.10.10.10:400']
  , 'there is no split'
  )

  t.same(
    split(undefined, ':')
  , []
  , 'there is no split'
  )
}).catch(threw)
