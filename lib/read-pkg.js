import path from 'path'
import fs from 'node:fs/promises'

export default async function getPkg(opts) {
  const {cwd = process.cwd()} = opts || {}
  const pkg = await fs.readFile(path.join(cwd, 'package.json'), 'utf8')
  return JSON.parse(pkg)
}
