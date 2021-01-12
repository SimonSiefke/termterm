import { jest } from '@jest/globals'
import { StringDecoder } from 'string_decoder'
import { createParse } from './parseArray.js'

const noop = () => {}

const encodeText = (input) => {
  return new Uint8Array(Buffer.from(input, 'utf-8'))
}

const decodeText = (text) => {
  const decode = new StringDecoder('utf8')
  return decode.write(text)
}

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
    newline = noop,
    setGLevel = noop,
    saveCursor = noop,
    restoreCursor = noop,
    nextLine = noop,
    index = noop,
    tabSet = noop,
    deleteChars = noop,
    setWindowTitle = noop,
    lineFeed = noop,
    carriageReturn = noop,
  } = {},
) => {
  const parse = createParse({
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
    newline,
    setGLevel,
    saveCursor,
    restoreCursor,
    nextLine,
    index,
    tabSet,
    deleteChars,
    setWindowTitle,
    carriageReturn,
    lineFeed,
  })
  const array = new Uint8Array(input.split('').map((x) => x.charCodeAt()))
  return parse(array)
}

const getOutputLines = (input) => {
  const chunks = []
  const array = encodeText(input)
  const parse = createParse({
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
    print: (array, startIndex, endIndex) => {
      chunks.push(decodeText(array.slice(startIndex, endIndex)))
    },
    newline: () => {
      chunks.push('\n')
    },
    lineFeed: () => {
      chunks.push('\n')
    },
    carriageReturn: noop,
  })
  parse(array)
  return chunks.join('').split('\n')
}

const operations = (input) => {
  const calls = []
  const terminal = {
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
    print: (startIndex, endIndex) => calls.push(['print']),
    lineFeed: () => calls.push(['lineFeed']),
    carriageReturn: () => calls.push(['carriageReturn']),
    setWindowTitle: (array, startIndex, endIndex) =>
      calls.push([
        'setWindowTitle',
        decodeText(array.slice(startIndex, endIndex)),
      ]),
    setCursor(params) {
      calls.push(['setCursor', params])
    },
  }
  const parse = createParse(terminal)
  const array = encodeText(input)
  parse(array)
  return calls
}

test('function - bell', () => {
  const bell = jest.fn()
  runTest('\u0007', { bell })
  expect(bell).toHaveBeenCalledTimes(1)
})

test('function - bell (with text)', () => {
  const lines = getOutputLines('sample \u0007 text')
  expect(lines).toEqual(['sample  text'])
})

test('function - cursorUp', () => {
  const cursorUp = jest.fn()
  runTest('\u001b[A', { cursorUp })
  expect(cursorUp).toHaveBeenCalledTimes(1)
})

test('function - cursorUp (with text)', () => {
  const lines = getOutputLines('sample \u001b[A text')
  expect(lines).toEqual(['sample  text'])
})

test('function - cursorUp (multiple)', () => {
  const cursorUp = jest.fn()
  runTest('\u001b[2A', { cursorUp })
  expect(cursorUp).toHaveBeenCalledTimes(1)
})

test('function - cursorUp (multiple, with text)', () => {
  const lines = getOutputLines('sample \u001b[2A text')
  expect(lines).toEqual(['sample  text'])
})

test('function - cursorDown', () => {
  const cursorDown = jest.fn()
  runTest('\u001b[B', { cursorDown })
  expect(cursorDown).toHaveBeenCalledTimes(1)
})

test('function - cursorDown (with text)', () => {
  const lines = getOutputLines('sample \u001b[B text')
  expect(lines).toEqual(['sample  text'])
})

test('function - cursorDown (multiple)', () => {
  const cursorDown = jest.fn()
  runTest('\u001b[2B', { cursorDown })
  expect(cursorDown).toHaveBeenCalledTimes(1)
})

test('function - cursorDown (multiple, with text)', () => {
  const lines = getOutputLines('sample \u001b[2B text')
  expect(lines).toEqual(['sample  text'])
})

test('function - cursorRight', () => {
  const cursorRight = jest.fn()
  runTest('\u001b[C', { cursorRight })
  expect(cursorRight).toHaveBeenCalledTimes(1)
})

test('function - cursorRight (with text)', () => {
  const lines = getOutputLines('sample \u001b[C text')
  expect(lines).toEqual(['sample  text'])
})

test('function - cursorRight (multiple)', () => {
  const cursorRight = jest.fn()
  runTest('\u001b[2C', { cursorRight })
  expect(cursorRight).toHaveBeenCalledTimes(1)
})

test('function - cursorRight (multiple, with text)', () => {
  const lines = getOutputLines('sample \u001b[2C text')
  expect(lines).toEqual(['sample  text'])
})

test('function - cursorLeft', () => {
  const cursorLeft = jest.fn()
  runTest('\u001b[D', { cursorLeft })
  expect(cursorLeft).toHaveBeenCalledTimes(1)
})

test('function - cursorLeft (with text)', () => {
  const lines = getOutputLines('sample \u001b[D text')
  expect(lines).toEqual(['sample  text'])
})

test('function - cursorLeft (multiple)', () => {
  const cursorLeft = jest.fn()
  runTest('\u001b[2D', { cursorLeft })
  expect(cursorLeft).toHaveBeenCalledTimes(1)
})

test('function - cursorLeft (multiple, with text)', () => {
  const lines = getOutputLines('sample \u001b[2D text')
  expect(lines).toEqual(['sample  text'])
})

test('function - goToHome', () => {
  const goToHome = jest.fn()
  runTest('\u001b[H', { goToHome })
  expect(goToHome).toHaveBeenCalledTimes(1)
})

test('function - deleteChars', () => {
  const deleteChars = jest.fn()
  runTest(`\x1B[1P`, { deleteChars })
  expect(deleteChars).toHaveBeenCalledWith(1)
})

test('function - eraseToEndOfLine', () => {
  const eraseToEndOfLine = jest.fn()
  runTest('\u001b[K', { eraseToEndOfLine })
  expect(eraseToEndOfLine).toHaveBeenCalledTimes(1)
})

test('function - backspace', () => {
  const backspace = jest.fn()
  runTest('\u0008', { backspace })
  expect(backspace).toHaveBeenCalledTimes(1)
})

test('function - setCharAttributes', () => {
  const setCharAttributes = jest.fn()
  runTest('\u001b[0;7m', { setCharAttributes })
  expect(setCharAttributes).toHaveBeenCalledTimes(1)
})

test('function - setCharAttributes with single param', () => {
  const setCharAttributes = jest.fn()
  runTest(`\u001b[31m Hello World`, { setCharAttributes })
  expect(setCharAttributes).toHaveBeenCalledWith([31])
})

test('function - setCharAttributes with multiple params', () => {
  const setCharAttributes = jest.fn()
  runTest(`\u001b[0;35m Hello World`, { setCharAttributes })
  expect(setCharAttributes).toHaveBeenCalledWith([0, 35])
})

test('function - setCharAttributes with white background', () => {
  expect(operations(`\x1B[0;7m^C`)).toEqual([['setCharAttributes'], ['print']])
})

test('function - setGLevel 1', () => {
  const setGLevel = jest.fn()
  runTest(`\u001b~`, { setGLevel })
  expect(setGLevel).toHaveBeenCalledWith(1)
})

test('function - setGLevel 2', () => {
  const setGLevel = jest.fn()
  runTest(`\u001b}`, { setGLevel })
  expect(setGLevel).toHaveBeenCalledWith(2)
})

test('function - setGLevel 3', () => {
  const setGLevel = jest.fn()
  runTest(`\u001b|`, { setGLevel })
  expect(setGLevel).toHaveBeenCalledWith(3)
})

test('function - saveCursor', () => {
  const saveCursor = jest.fn()
  runTest(`\u001b7`, { saveCursor })
  expect(saveCursor).toHaveBeenCalledTimes(1)
})

test('function - restoreCursor', () => {
  const restoreCursor = jest.fn()
  runTest(`\u001b8`, { restoreCursor })
  expect(restoreCursor).toHaveBeenCalledTimes(1)
})

test('function - index', () => {
  const index = jest.fn()
  runTest(`\u001bD`, { index })
  expect(index).toHaveBeenCalledTimes(1)
})

test('function - nextLine', () => {
  const nextLine = jest.fn()
  runTest(`\u001bE`, { nextLine })
  expect(nextLine).toHaveBeenCalledTimes(1)
})

test('function - tabSet', () => {
  const tabSet = jest.fn()
  runTest(`\u001bH`, { tabSet })
  expect(tabSet).toHaveBeenCalledTimes(1)
})

test('function - setWindowTitle', () => {
  expect(operations('\u001b]0;This is the window title\x07')).toEqual([
    ['setWindowTitle', 'This is the window title'],
  ])
})

test('function - reverseIndex', () => {})
test('function - keypadApplicationMode', () => {})
test('function - keypadNumericMode', () => {})
test('function - fullReset', () => {})
test('function - selectDefaultCharset', () => {})

test.skip('function - auxPortOn', () => {
  const auxPortOn = jest.fn()
  runTest(`\u001b[5i`, { auxPortOn })
  expect(auxPortOn).toHaveBeenCalledTimes(1)
})

test.skip('function - auxPortOff', () => {
  const auxPortOff = jest.fn()
  runTest(`\u001b[4i`, { auxPortOff })
  expect(auxPortOff).toHaveBeenCalledTimes(1)
})

test('function - carriage return', () => {
  const carriageReturn = jest.fn()
  runTest('\r', { carriageReturn })
  expect(carriageReturn).toHaveBeenCalledTimes(1)
})

test('function - setCursor', () => {
  expect(operations(`\x1B[22;16H`)).toEqual([['setCursor', [22, 16]]])
})

// test.only('function - newline 2', () => {
//   const newline = jest.fn()
//   runTest('\n', { newline })
//   expect(newline).toHaveBeenCalledTimes(1)
// })

test('text - hello world!', () => {
  const lines = getOutputLines('hello world!')
  expect(lines).toEqual([`hello world!`])
})

test('text - prompt', () => {
  const lines = getOutputLines(
    `\u001b[0;35msimon\u001b[0;32m (master *)\u001b[0;34m termterm $ \u001b[0m`,
  )
  expect(lines).toEqual([`simon (master *) termterm $ `])
})

test('special - csi with print and execute', () => {
  const lines = getOutputLines('\u001b[<31;5mHello World! öäü€\nabc')
  expect(lines).toEqual([`Hello World! öäü€`, `abc`])
})

test.skip('special - single DCS', () => {
  const lines = getOutputLines(`\x1bP1;2;3+$aäbc;däe\x9c`)
  expect(lines).toEqual([])
})

test.skip('special - multi DCS', () => {
  const lines = getOutputLines(`\x1bP1;2;3+$abc;de`)
  expect(lines).toEqual([])
})

test.skip('special - print + DCS(C1)', () => {
  const lines = getOutputLines(`abc\x901;2;3+$abc;de\x9c`)
  expect(lines).toEqual(['abc'])
})

test.skip('special - print + PM(C1) + print', () => {
  const lines = getOutputLines(`abc\x98123tzf\x9cdefg`)
  expect(lines).toEqual(['abcdefg'])
})

test.skip('special - print + OSC(C1) + print', () => {
  const lines = getOutputLines(`abc\x9d123;tzf\x9cdefg`)
  expect(lines).toEqual(['abcdefg'])
})

test.skip('special - error recovery', () => {
  const lines = getOutputLines(`\x1b[1€abcdefg\x9b<;c`)
  expect(lines).toEqual(['abcdefg'])
})

test.skip('special - 7bit ST should be swallowed', () => {
  const lines = getOutputLines(`abc\x9d123;tzf\x1b\\defg`)
  expect(lines).toEqual(['abcdefg'])
})

test('special - colon notation in CSI params', () => {
  const lines = getOutputLines(`\x1b[<31;5::123:;8mHello World! öäü€\nabc`)
  expect(lines).toEqual(['Hello World! öäü€', 'abc'])
})

test.skip('special - colon notation in DCS params', () => {
  const lines = getOutputLines(`abc\x901;2::55;3+$abc;de\x9c`)
  expect(lines).toEqual(['abc'])
})

test.skip('special - CAN should abort DCS', () => {
  const lines = getOutputLines(`abc\x901;2::55;3+$abc;de\x18`)
  expect(lines).toEqual(['abc'])
})

test.skip('special - SUB should abort DCS', () => {
  const lines = getOutputLines(`abc\x901;2::55;3+$abc;de\x1a`)
  expect(lines).toEqual(['abc'])
})

test.skip('special - CAN should abort OSC', () => {
  const lines = getOutputLines('\x1b]0;abc123€öäü\x18')
  expect(lines).toEqual([])
})

test.skip('special - SUB should abort OSC', () => {
  const lines = getOutputLines(`\x1b]0;abc123€öäü\x1a`)
  expect(lines).toEqual([])
})

test('styled text - [01;32mfastboot[0m', () => {
  const lines = getOutputLines(`[01;32mfastboot[0m`)
  expect(lines).toEqual(['fastboot'])
})

test('tab', () => {
  const lines = getOutputLines(`\t\t\t`)
  expect(lines).toEqual(['\t\t\t'])
})

// test('program nano', () => {
//   const lines = getOutputLines(
//     `\u001b[22;16H\u001b(B\u001b[0;7m[ Welcome to nano.  For basic help, type Ctrl+G. ]\u001b(B\u001b[m\r\u001b[23d\u001b(B\u001b[0;7m^G\u001b(B\u001b[m Get Help  \u001b(B\u001b[0;7m^O\u001b(B\u001b[m Write Out \u001b(B\u001b[0;7m^W\u001b(B\u001b[m Where Is  \u001b(B\u001b[0;7m^K\u001b(B\u001b[m Cut Text  \u001b(B\u001b[0;7m^J\u001b(B\u001b[m Justify   \u001b(B\u001b[0;7m^C\u001b(B\u001b[m Cur Pos\r\u001b[24d\u001b(B\u001b[0;7m^X\u001b(B\u001b[m Exit\u001b[14G\u001b(B\u001b[0;7m^R\u001b(B\u001b[m Read File \u001b(B\u001b[0;7m^\\\u001b(B\u001b[m Replace   \u001b(B\u001b[0;7m^U\u001b(B\u001b[m Paste Text\u001b(B\u001b[0;7m^T\u001b(B\u001b[m To Spell  \u001b(B\u001b[0;7m^_\u001b(B\u001b[m Go To Line\r\u001b[22d\u001b[2d\u001b[39;49m\u001b(B\u001b[m\u001b[?12l\u001b[?25h`,
//   )
//   expect(lines).toEqual([
//     '[ Welcome to nano.  For basic help, type Ctrl+G. ]',
//     '^G Get Help  ^O Write Out ^W Where Is  ^K Cut Text  ^J Justify   ^C Cur Pos',
//     '^X Exit^R Read File ^\\ Replace   ^U Paste Text^T To Spell  ^_ Go To Line',
//     '',
//   ])
// })

// test('program vim', () => {
//   const lines = getOutputLines(fs.readFileSync('fixtures/vim.txt').toString())
//   expect(lines).toEqual([])
// })

test('program ls', () => {
  const lines = getOutputLines(
    `\u001b[0m\u001b[01;34mnode_modules\u001b[0m  package.json  package-lock.json  \u001b[01;34mpublic\u001b[0m  server.js\r\n`,
  )
  expect(lines).toEqual([
    'node_modules  package.json  package-lock.json  public  server.js',
    '',
  ])
})

test('cursor left and delete', () => {
  const eraseToEndOfLine = jest.fn()
  const backspace = jest.fn()
  runTest(
    `\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008d\u001b[K`,
    { backspace, eraseToEndOfLine },
  )
  expect(backspace).toHaveBeenCalledTimes(10)
  expect(eraseToEndOfLine).toHaveBeenCalledTimes(1)
})

test.skip('delete 2', () => {
  const print = jest.fn()
  const backspace = jest.fn()
  const deleteChars = jest.fn()
  runTest(`\b\x1B[1Pbcd`, { print, backspace })
  expect(print).toHaveBeenCalledWith('bcd')
  expect(backspace).toHaveBeenCalledTimes(1)
})

test('multiple carriage return', () => {
  const carriageReturn = jest.fn()
  runTest(`Run \`unset PREFIX\` to unset it.\r\n`, { carriageReturn })
  expect(carriageReturn).toHaveBeenCalledTimes(1)
})

test('bug with carriage return', () => {
  expect(operations(`echo\r\n`)).toEqual([
    ['print'],
    ['carriageReturn'],
    ['lineFeed'],
  ])
})

test.skip('osc bug', () => {
  expect(
    operations(
      decodeText(
        new Uint8Array([
          27,
          93,
          48,
          59,
          103,
          105,
          116,
          112,
          111,
          100,
          32,
          47,
          119,
          111,
          114,
          107,
          115,
          112,
          97,
          99,
          101,
          47,
          116,
          101,
          114,
          109,
          116,
          101,
          114,
          109,
          7,
          27,
          91,
          48,
          49,
          59,
          51,
          50,
          109,
          103,
          105,
          116,
          112,
          111,
          100,
          27,
          91,
          48,
          48,
          109,
          32,
          27,
          91,
          48,
          49,
          59,
          51,
          52,
          109,
          47,
          119,
          111,
          114,
          107,
          115,
          112,
          97,
          99,
          101,
          47,
          116,
          101,
          114,
          109,
          116,
          101,
          114,
          109,
          27,
          91,
          48,
          48,
          109,
          32,
          36,
          32,
        ]),
      ),
    ).toEqual([]),
  )
})

test.skip('\x1B(B', () => {
  runTest(`\x1B(B`)
})

test('set charset uk', () => {
  expect(operations(`\x1B(A`)).toEqual([])
})

test('set charset us ascii', () => {
  expect(operations(`\x1B(B`)).toEqual([])
})

test('set charset dutch', () => {
  expect(operations(`\x1B(4`)).toEqual([])
})

test('set charset finnish', () => {
  expect(operations(`\x1B(C`)).toEqual([])
  expect(operations(`\x1B(5`)).toEqual([])
})

test('set charset french', () => {
  expect(operations(`\x1B(R`)).toEqual([])
})

test('set charset french canadian', () => {
  expect(operations(`\x1B(Q`)).toEqual([])
})

test('set charset german', () => {
  expect(operations(`\x1B(K`)).toEqual([])
})

test('set charset italian', () => {
  expect(operations(`\x1B(Y`)).toEqual([])
})

test('set charset norwegian danish', () => {
  expect(operations(`\x1B(E`)).toEqual([])
  expect(operations(`\x1B(6`)).toEqual([])
})

test('set charset norwegian spanish', () => {
  expect(operations(`\x1B(Z`)).toEqual([])
})

test('set charset norwegian swedish', () => {
  expect(operations(`\x1B(H`)).toEqual([])
  expect(operations(`\x1B(7`)).toEqual([])
})

test('set charset swiss', () => {
  expect(operations(`\x1B(=`)).toEqual([])
})

test('set charset iso latin', () => {
  expect(operations(`\x1B(/`)).toEqual([])
})

test('reset char attributes', () => {
  expect(operations(`\x1B[m;`)).toEqual([
    ['setCharAttributes'],
    // TODO should be no print
    ['print'],
  ])
})

test.skip('function hideCursor', () => {
  expect(operations(`\x1B[?25l`)).toEqual([])
})

test.skip('function showCursor', () => {
  expect(operations(`\x1B[?25r`)).toEqual([])
})
