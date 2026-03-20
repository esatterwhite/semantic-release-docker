export default function startsWith(str, ...args) {
  if (typeof str !== 'string') return false
  return args.some((arg) => {
    return str.startsWith(arg)
  })
}
