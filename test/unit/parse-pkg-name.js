import tap from 'tap'
const {test, threw} = tap
import parsePkgName from '../../lib/parse-pkg-name.js'

test('parsePkgName', async (t) => {
  t.same(parsePkgName('test'), {
    scope: null
  , name: 'test'
  }, 'non-scoped package name')

  t.same(parsePkgName('@namespace/foobar'), {
    scope: 'namespace'
  , name: 'foobar'
  }, 'scoped package name')

  t.same(parsePkgName('nampace/foobar'), {
    name: null
  , scope: null
  }, 'invalid package name')

  t.same(parsePkgName(), {
    name: null
  , scope: null
  }, 'no package name')

}).catch(threw)
