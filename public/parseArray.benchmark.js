import fs from 'fs'
import { parseArray } from './parseArray.js'
import { performance } from 'perf_hooks'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const noop = () => {}

const getBinarySize = (string) => {
  return Buffer.byteLength(string, 'utf8')
}

const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes == 0) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
}

const calls = []

const test_terminal = {
  bell: () => calls.push(['bell']),
  eraseInDisplay2: () => calls.push(['eraseInDisplay2']),
  eraseToEndOfLine: () => calls.push(['eraseToEndOfLine']),
  goToHome: () => calls.push(['goToHome']),
  setCharAttributes: () => calls.push(['setCharAttributes']),
  cursorUp: () => calls.push(['cursorUp']),
  cursorDown: () => calls.push(['cursorDown']),
  cursorRight: () => calls.push(['cursorRight']),
  cursorLeft: () => calls.push(['cursorLeft']),
  backspace: () => calls.push(['backspace']),
  print: () => calls.push(['print']),
  newline: () => calls.push(['newline']),
}

const noop_terminal = {
  bell: noop,
  eraseInDisplay2: noop,
  eraseToEndOfLine: noop,
  goToHome: noop,
  setCharAttributes: noop,
  cursorUp: noop,
  cursorDown: noop,
  cursorRight: noop,
  cursorLeft: noop,
  backspace: noop,
  print: noop,
  newline: noop,
}

const fixtureLs = fs.readFileSync(`${__dirname}/../fixtures/ls.txt`).toString()
const array = new Uint8Array(fixtureLs.split('').map((x) => x.charCodeAt()))

let total = 0
for (let i = 0; i < 1000; i++) {
  calls.length = 0
  console.log(bytesToSize(fixtureLs.length))
  const start = performance.now()
  parseArray(array, noop_terminal)
  const end = performance.now()
  console.log(`took ${end - start}ms`)
  total += end - start
  console.log(calls.length)
}
console.log(`average of 1000: ${total / 1000}`)
