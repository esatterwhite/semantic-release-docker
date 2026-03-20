import path from 'path'
import {fileURLToPath} from 'url'
import tap from 'tap'
const {test, threw} = tap
import readPkg from '../../lib/read-pkg.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const fixturedir = path.join(__dirname, '..', 'fixture')
test('read-pkg', async (t) => {
  t.test('reads cwd by default', async (tt) => {
    const pkg = await readPkg()
    tt.match(pkg, {
      name: '@codedependant/semantic-release-docker'
    , version: String
    })
  })

  t.test('reads specified directories', async (tt) => {
    const cwd = path.join(fixturedir, 'pkg', 'one')
    const pkg = await readPkg({cwd})
    tt.match(pkg, {
      name: '@fixture/one'
    , version: '0.0.0'
    , private: true
    })
  })

  t.test('throws on invalid json', async (tt) => {
    const cwd = path.join(fixturedir, 'pkg', 'two')
    tt.rejects(readPkg({cwd}), /unexpected end of json input/ig)
  })

  t.test('throws if no package.json', async (tt) => {
    const cwd = path.join(fixturedir, 'pkg', 'three')
    tt.rejects(readPkg({cwd}), {code: 'ENOENT'})
  })
}).catch(threw)
