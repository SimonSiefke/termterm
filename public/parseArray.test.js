import { jest } from '@jest/globals'
import { parseArray } from './parseArray.js'

const noop = () => {}

const runTest = (
  input,
  {
    bell = noop,
    eraseInDisplay2 = noop,
    eraseToEndOfLine = noop,
    goToHome = noop,
    setCharAttributes = noop,
    cursorUp = noop,
    cursorDown = noop,
    cursorRight = noop,
    cursorLeft = noop,
    backspace = noop,
    print = noop,
  } = {},
) => {
  const array = new Uint8Array(input.split('').map((x) => x.charCodeAt()))
  return parseArray(array, {
    eraseInDisplay2,
    eraseToEndOfLine,
    goToHome,
    setCharAttributes,
    cursorUp,
    cursorDown,
    cursorRight,
    cursorLeft,
    bell,
    backspace,
    print,
  })
}

const getOutputLines = (input) => {
  const lines = []
  let line = ''
  const array = new Uint8Array(input.split('').map((x) => x.charCodeAt()))
  parseArray(array, {
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
    print: (chars) => {
      const char = String.fromCharCode(chars)
      if (char === '\n') {
        lines.push(line)
        line = ''
      } else if (char === '\r') {
        lines.push(line)
        line = ''
      } else {
        line += char
      }
    },
  })
  lines.push(line)
  return lines
}

test('bell', () => {
  const bell = jest.fn()
  runTest('\u0007', { bell })
  expect(bell).toHaveBeenCalledTimes(1)
})

test('cursorUp', () => {
  const cursorUp = jest.fn()
  runTest('\u001b[A', { cursorUp })
  expect(cursorUp).toHaveBeenCalledTimes(1)
})

test('cursorDown', () => {
  const cursorDown = jest.fn()
  runTest('\u001b[B', { cursorDown })
  expect(cursorDown).toHaveBeenCalledTimes(1)
})

test('cursorRight', () => {
  const cursorRight = jest.fn()
  runTest('\u001b[C', { cursorRight })
  expect(cursorRight).toHaveBeenCalledTimes(1)
})

test('cursorLeft', () => {
  const cursorLeft = jest.fn()
  runTest('\u001b[D', { cursorLeft })
  expect(cursorLeft).toHaveBeenCalledTimes(1)
})

test('goToHome', () => {
  const goToHome = jest.fn()
  runTest('\u001b[H', { goToHome })
  expect(goToHome).toHaveBeenCalledTimes(1)
})

test('eraseToEndOfLine', () => {
  const eraseToEndOfLine = jest.fn()
  runTest('\u001b[K', { eraseToEndOfLine })
  expect(eraseToEndOfLine).toHaveBeenCalledTimes(1)
})

test('backspace', () => {
  const backspace = jest.fn()
  runTest('\u0008', { backspace })
  expect(backspace).toHaveBeenCalledTimes(1)
})

test('setCharAttributes', () => {
  const setCharAttributes = jest.fn()
  runTest('\u001b[0;7m', { setCharAttributes })
  expect(setCharAttributes).toHaveBeenCalledTimes(1)
})

test('program nano', () => {
  const lines = getOutputLines(
    `\u001b[22;16H\u001b(B\u001b[0;7m[ Welcome to nano.  For basic help, type Ctrl+G. ]\u001b(B\u001b[m\r\u001b[23d\u001b(B\u001b[0;7m^G\u001b(B\u001b[m Get Help  \u001b(B\u001b[0;7m^O\u001b(B\u001b[m Write Out \u001b(B\u001b[0;7m^W\u001b(B\u001b[m Where Is  \u001b(B\u001b[0;7m^K\u001b(B\u001b[m Cut Text  \u001b(B\u001b[0;7m^J\u001b(B\u001b[m Justify   \u001b(B\u001b[0;7m^C\u001b(B\u001b[m Cur Pos\r\u001b[24d\u001b(B\u001b[0;7m^X\u001b(B\u001b[m Exit\u001b[14G\u001b(B\u001b[0;7m^R\u001b(B\u001b[m Read File \u001b(B\u001b[0;7m^\\\u001b(B\u001b[m Replace   \u001b(B\u001b[0;7m^U\u001b(B\u001b[m Paste Text\u001b(B\u001b[0;7m^T\u001b(B\u001b[m To Spell  \u001b(B\u001b[0;7m^_\u001b(B\u001b[m Go To Line\r\u001b[22d\u001b[2d\u001b[39;49m\u001b(B\u001b[m\u001b[?12l\u001b[?25h`,
  )
  expect(lines).toEqual([
    '[ Welcome to nano.  For basic help, type Ctrl+G. ]',
    '^G Get Help  ^O Write Out ^W Where Is  ^K Cut Text  ^J Justify   ^C Cur Pos',
    '^X Exit^R Read File ^\\ Replace   ^U Paste Text^T To Spell  ^_ Go To Line',
    '',
  ])
})

test('program ls', () => {
  const lines = getOutputLines(
    `\u001b[0m\u001b[01;34mnode_modules\u001b[0m  package.json  package-lock.json  \u001b[01;34mpublic\u001b[0m  server.js\r\n`,
  )
  expect(lines).toEqual([
    'node_modules  package.json  package-lock.json  public  server.js',
    '',
    '',
  ])
})
