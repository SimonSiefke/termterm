import fs from 'fs'
import { dirname } from 'path'
import { performance } from 'perf_hooks'
import { StringDecoder } from 'string_decoder'
import { fileURLToPath } from 'url'
// import { createParse } from './parseArrayFaster.js'
import { createParse } from '../../dist/termterm.modern.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const noop = () => {}

const getBinarySize = (string) => {
  return Buffer.byteLength(string, 'utf8')
}

const decodeText = (text) => {
  const decode = new StringDecoder('utf8')
  return decode.write(text)
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
  print: (startIndex, endIndex) =>
    calls.push(['print', decodeText(array.slice(startIndex, endIndex))]),
  lineFeed: () => calls.push(['lineFeed']),
  carriageReturn: () => calls.push(['carriageReturn']),
  setCursor: () => calls.push(['setCursor']),
}

const noop_terminal = {
  bell: noop,
  eraseInDisplay: noop,
  eraseToEndOfLine: noop,
  goToHome: noop,
  setCharAttributes: noop,
  cursorUp: noop,
  cursorDown: noop,
  cursorRight: noop,
  cursorLeft: noop,
  backspace: noop,
  print: noop,
  lineFeed: noop,
  cursorPosition: noop,
  eraseInLine: noop,
}

const fixtureLs = fs
  .readFileSync(`${__dirname}/../../fixtures/ls.txt`)
  .toString()
const array = new Uint8Array(fixtureLs.split('').map((x) => x.charCodeAt()))

const parse = createParse(noop_terminal)
let total = 0
for (let i = 0; i < 5; i++) {
  calls.length = 0
  parse(array)
}

for (let i = 0; i < 1000; i++) {
  calls.length = 0
  console.log(bytesToSize(fixtureLs.length))
  const start = performance.now()
  parse(array)
  // optimizedParseArray(array, noop_terminal)
  const end = performance.now()
  console.log(`took ${end - start}ms`)
  total += end - start
  console.log(calls.length)
}
console.log(`average of 1000: ${total / 1000}`)
