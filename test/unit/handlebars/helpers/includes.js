'use strict'

const {test, threw} = require('tap')
const helpers = require('../../../../lib/handlebars/helpers')

test('handlebars helpers', async (t) => {
  t.test('includes', async (t) => {
    t.equal(
      helpers.includes(undefined, undefined, undefined)
    , false
    , 'includes returns false for undefined inputs'
    )

    t.equal(
      helpers.includes(['ca', 'eu', 'eq', 'us'])
    , false
    , 'includes returns false when valueToFind and indexFrom are undefined'
    )

    t.equal(
      helpers.includes(['ca', 'eu', 'eq', 'us'], 'ca')
    , true
    , 'ca in ["ca","eu","eq","us"]'
    )

    t.equal(
      helpers.includes(['ca', 'eu', 'eq', 'us'], 'ca', 0)
    , true
    , 'ca in ["ca","eu","eq","us"]'
    )

    t.equal(
      helpers.includes(['ca', 'eu', 'eq', 'us'], 'us', 0)
    , true
    , 'us in ["ca","eu","eq","us"]'
    )

    t.equal(
      helpers.includes(['ca', 'eu', 'eq', 'us'], 'CA', 0)
    , false
    , 'ca not in ["ca","eu","eq","us"]'
    )

    t.equal(
      helpers.includes(['ca', 'eu', 'eq', 'us'], 'cA', 0)
    , false
    , 'ca not in ["ca","eu","eq","us"]'
    )

    t.equal(
      helpers.includes(['ca', 'eu', 'eq', 'us'], 'ca', 1)
    , false
    , 'ca not in ["ca","eu","eq","us"] if when indexFrom = 1'
    )

    t.equal(
      helpers.includes(['ca', 'eu', 'eq', 'us'], 'ca', -4)
    , true
    , 'ca in ["ca","eu","eq","us"] when indexFrom < 0'
    )

    t.equal(
      helpers.includes([], 'us', 0)
    , false
    , 'us not in []'
    )

    t.equal(
      helpers.includes([3, 4, 50, 100], undefined, undefined)
    , false
    , 'includes returns false when valueToFind and indexFrom are undefined'
    )

    t.equal(
      helpers.includes([3, 4, 50, 100], 4, undefined)
    , true
    , '4 in [3,4,50,100]'
    )

    t.equal(
      helpers.includes([3, 4, 50, 100], 3, 0)
    , true
    , '3 in [3,4,50,100]'
    )

    t.equal(
      helpers.includes([1000, 0, 235, 65, 5], 235, 0)
    , true
    , '235 in [1000,0,235,65,5]'
    )

    t.equal(
      helpers.includes([1000, 0, 235, 65, 5], 5, 0)
    , true
    , '5 in [1000,0,235,65,5]'
    )

    t.equal(
      helpers.includes([1000, 0, 235, 65, 78], 77, 0)
    , false
    , '77 not in [1000,0,235,65,78]'
    )

    t.equal(
      helpers.includes([3, 4, 50, 100], 4, 2)
    , false
    , '4 not in [3,4,50,100] when indexFrom = 2'
    )

    t.equal(
      helpers.includes([3, 4, 50, 100], 3, -4)
    , true
    , '3 in [3,4,50,100] when indexFrom < 0'
    )

    t.equal(
      helpers.includes([], 250, 0)
    , false
    , '250 not in []'
    )

    t.equal(
      helpers.includes([11, 35, 80, 120], 80, 4)
    , false
    , '80 in [11,35,80,120] but indexFrom = arr.length'
    )

    t.equal(
      helpers.includes([11, 35, 80, 120], 11, 5)
    , false
    , '11 in [11,35,80,120] but indexFrom > arr.length'
    )
  })
}).catch(threw)
