import { jest } from '@jest/globals'
import { StringDecoder } from 'string_decoder'
import { createParse } from './parseArrayFaster.js'

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
    eraseInDisplay = noop,
    eraseInLine = noop,
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
    deleteCharacters = noop,
    setWindowTitle = noop,
    lineFeed = noop,
    carriageReturn = noop,
  } = {},
) => {
  const parse = createParse({
    eraseInDisplay,
    eraseInLine,
    setCharAttributes,
    cursorUp,
    cursorDown,
    cursorRight,
    cursorLeft,
    bell,
    backspace,
    print,
    newline,
    saveCursor,
    restoreCursor,
    nextLine,
    index,
    tabSet,
    deleteCharacters,
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
    eraseInDisplay: noop,
    eraseInLine: noop,
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
    eraseInLine: (params) => calls.push(['eraseInLine', params]),
    setCharAttributes: () => calls.push(['setCharAttributes']),
    cursorUp: (params) => calls.push(['cursorUp', params]),
    cursorDown: (params) => calls.push(['cursorDown', params]),
    cursorRight: (params) => calls.push(['cursorRight', params]),
    cursorLeft: (params) => calls.push(['cursorLeft', params]),
    backspace: () => calls.push(['backspace']),
    print: (startIndex, endIndex) => calls.push(['print']),
    lineFeed: () => calls.push(['lineFeed']),
    carriageReturn: () => calls.push(['carriageReturn']),
    setWindowTitle: (array, startIndex, endIndex) =>
      calls.push([
        'setWindowTitle',
        decodeText(array.slice(startIndex, endIndex)),
      ]),
    cursorPosition(params) {
      calls.push(['cursorPosition', params])
    },
    cursorHide() {
      calls.push(['cursorHide'])
    },
    cursorShow() {
      calls.push(['cursorShow'])
    },
    deleteCharacters(params) {
      calls.push(['deleteCharacters', params])
    },
    restoreCursor() {
      calls.push(['restoreCursor'])
    },
    softTerminalReset() {
      calls.push(['softTerminalReset'])
    },
    cursorNextLine(params) {
      calls.push(['cursorNextLine', params])
    },
    cursorPrecedingLine(params) {
      calls.push(['cursorPrecedingLine', params])
    },
    cursorCharacterAbsolute(params) {
      calls.push(['cursorCharacterAbsolute', params])
    },
    cursorForwardTabulation(params) {
      calls.push(['cursorForwardTabulation', params])
    },
    cursorBackwardTabulation(params) {
      calls.push(['cursorBackwardTabulation', params])
    },
    eraseInDisplay(params) {
      calls.push(['eraseInDisplay', params])
    },
    insertLines(params) {
      calls.push(['insertLines', params])
    },
    deleteLines(params) {
      calls.push(['deleteLines', params])
    },
    scrollUp(params) {
      calls.push(['scrollUp', params])
    },
    scrollDown(params) {
      calls.push(['scrollDown', params])
    },
    eraseCharacters(params) {
      calls.push(['eraseCharacters', params])
    },
    characterPositionAbsolute(params) {
      calls.push(['characterPositionAbsolute', params])
    },
    characterPositionRelative(params) {
      calls.push(['characterPositionRelative', params])
    },
    repeatPrecedingGraphicCharacter(params) {
      calls.push(['repeatPrecedingGraphicCharacter', params])
    },
    sendDeviceAttributesPrimary(params) {
      calls.push(['sendDeviceAttributesPrimary', params])
    },
    sendDeviceAttributesTertiary(params) {
      calls.push(['sendDeviceAttributesTertiary', params])
    },
    linePositionAbsolute(params) {
      calls.push(['linePositionAbsolute', params])
    },
    linePositionRelative(params) {
      calls.push(['linePositionRelative', params])
    },
    horizontalAndVerticalPosition(params) {
      calls.push(['horizontalAndVerticalPosition', params])
    },
    tabClear(params) {
      calls.push(['tabClear', params])
    },
    setMode(params) {
      calls.push(['setMode', params])
    },
    resetMode(params) {
      calls.push(['resetMode', params])
    },
  }
  const parse = createParse(terminal)
  const array = encodeText(input)
  parse(array)
  return calls
}

/**
 * CSI Ps A
 * Cursor Up Ps Times (default = 1) (CUU).
 */
test('function - cursorUp', () => {
  expect(operations('\u001b[A')).toEqual([['cursorUp', []]])
  expect(operations('\u001b[0A')).toEqual([['cursorUp', [0]]])
  expect(operations('\u001b[1A')).toEqual([['cursorUp', [1]]])
  expect(operations('\u001b[2A')).toEqual([['cursorUp', [2]]])
  expect(operations(`sample \u001b[A text`)).toEqual([
    ['print'],
    ['cursorUp', []],
    ['print'],
  ])
  expect(operations(`sample \u001b[2A text`)).toEqual([
    ['print'],
    ['cursorUp', [2]],
    ['print'],
  ])
})

/**
 * CSI Ps B
 * Cursor Down Ps Times (default = 1) (CUD).
 */
test('function - cursorDown', () => {
  expect(operations(`\u001b[B`)).toEqual([['cursorDown', []]])
  expect(operations(`\u001b[0B`)).toEqual([['cursorDown', [0]]])
  expect(operations(`\u001b[1B`)).toEqual([['cursorDown', [1]]])
  expect(operations(`\u001b[2B`)).toEqual([['cursorDown', [2]]])
  expect(operations(`sample \u001b[B text`)).toEqual([
    ['print'],
    ['cursorDown', []],
    ['print'],
  ])
  expect(operations(`sample \u001b[2B text`)).toEqual([
    ['print'],
    ['cursorDown', [2]],
    ['print'],
  ])
})

/**
 * CSI Ps C
 * Cursor Forward Ps Times (default = 1) (CUF).
 */
test('function - cursorRight', () => {
  expect(operations(`\u001b[C`)).toEqual([['cursorRight', []]])
  expect(operations(`\u001b[0C`)).toEqual([['cursorRight', [0]]])
  expect(operations(`\u001b[1C`)).toEqual([['cursorRight', [1]]])
  expect(operations(`\u001b[2C`)).toEqual([['cursorRight', [2]]])
  expect(operations(`sample \u001b[C text`)).toEqual([
    ['print'],
    ['cursorRight', []],
    ['print'],
  ])
  expect(operations(`sample \u001b[2C text`)).toEqual([
    ['print'],
    ['cursorRight', [2]],
    ['print'],
  ])
})

/**
 * CSI Ps D
 * Cursor Backward Ps Times (default = 1) (CUB).
 */
test('function - cursorLeft', () => {
  expect(operations(`\u001b[D`)).toEqual([['cursorLeft', []]])
  expect(operations(`\u001b[0D`)).toEqual([['cursorLeft', [0]]])
  expect(operations(`\u001b[1D`)).toEqual([['cursorLeft', [1]]])
  expect(operations(`\u001b[2D`)).toEqual([['cursorLeft', [2]]])
  expect(operations(`sample \u001b[D text`)).toEqual([
    ['print'],
    ['cursorLeft', []],
    ['print'],
  ])
  expect(operations(`sample \u001b[2D text`)).toEqual([
    ['print'],
    ['cursorLeft', [2]],
    ['print'],
  ])
})

/**
 * CSI Ps E
 * Cursor Next Line Ps Times (default = 1) (CNL).
 */
test('function cursorNextLine', () => {
  expect(operations(`\x1B[E`)).toEqual([['cursorNextLine', []]])
  expect(operations(`\x1B[0E`)).toEqual([['cursorNextLine', [0]]])
  expect(operations(`\x1B[1E`)).toEqual([['cursorNextLine', [1]]])
  expect(operations(`\x1B[2E`)).toEqual([['cursorNextLine', [2]]])
})

/**
 * CSI Ps F
 * Cursor Preceding Line Ps Times (default = 1) (CPL).
 */
test('function cursorPrecedingLine', () => {
  expect(operations(`\x1B[F`)).toEqual([['cursorPrecedingLine', []]])
  expect(operations(`\x1B[0F`)).toEqual([['cursorPrecedingLine', [0]]])
  expect(operations(`\x1B[1F`)).toEqual([['cursorPrecedingLine', [1]]])
  expect(operations(`\x1B[2F`)).toEqual([['cursorPrecedingLine', [2]]])
})

/**
 * CSI Ps G
 * Cursor Character Absolute  [column] (default = [row,1]) (CHA).
 */
test('function cursorCharacterAbsolute', () => {
  expect(operations(`\x1B[G`)).toEqual([['cursorCharacterAbsolute', []]])
  expect(operations(`\x1B[0G`)).toEqual([['cursorCharacterAbsolute', [0]]])
  expect(operations(`\x1B[1G`)).toEqual([['cursorCharacterAbsolute', [1]]])
  expect(operations(`\x1B[2G`)).toEqual([['cursorCharacterAbsolute', [2]]])
})

/**
 * CSI Ps I
 * Cursor Forward Tabulation Ps tab stops (default = 1) (CHT).
 */
test('function cursorForwardTabulation', () => {
  expect(operations(`\x1B[I`)).toEqual([['cursorForwardTabulation', []]])
  expect(operations(`\x1B[0I`)).toEqual([['cursorForwardTabulation', [0]]])
  expect(operations(`\x1B[1I`)).toEqual([['cursorForwardTabulation', [1]]])
  expect(operations(`\x1B[2I`)).toEqual([['cursorForwardTabulation', [2]]])
})

/**
 * CSI Ps ; Ps H
 * Cursor Position [row;column] (default = [1,1]) (CUP).
 */
test('function cursorPosition', () => {
  expect(operations(`\x1B[H`)).toEqual([['cursorPosition', []]])
  expect(operations(`\x1B[1;1H`)).toEqual([['cursorPosition', [1, 1]]])
  expect(operations(`\x1B[22;16H`)).toEqual([['cursorPosition', [22, 16]]])
})

/**
 * CSI Ps J
 * Erase in Display (ED), VT100.
 *
 * Ps = 0  ⇒  Erase Below (default).
 * Ps = 1  ⇒  Erase Above.
 * Ps = 2  ⇒  Erase All.
 * Ps = 3  ⇒  Erase Saved Lines, xterm.
 */
test('function eraseInDisplay', () => {
  expect(operations(`\x1B[J`)).toEqual([['eraseInDisplay', []]])
  expect(operations(`\x1B[0J`)).toEqual([['eraseInDisplay', [0]]])
  expect(operations(`\x1B[1J`)).toEqual([['eraseInDisplay', [1]]])
  expect(operations(`\x1B[2J`)).toEqual([['eraseInDisplay', [2]]])
  expect(operations(`\x1B[3J`)).toEqual([['eraseInDisplay', [3]]])
})

/**
 * CSI ? Ps J
 * Erase in Display (DECSED), VT220.
 *
 * Ps = 0  ⇒  Selective Erase Below (default).
 * Ps = 1  ⇒  Selective Erase Above.
 * Ps = 2  ⇒  Selective Erase All.
 * Ps = 3  ⇒  Selective Erase Saved Lines, xterm.
 */
test.skip('function eraseInDisplay (alternative)', () => {
  expect(operations(`\x1B[?J`)).toEqual([['eraseInDisplay', []]])
  expect(operations(`\x1B[?0J`)).toEqual([['eraseInDisplay', [0]]])
  expect(operations(`\x1B[?1J`)).toEqual([['eraseInDisplay', [1]]])
  expect(operations(`\x1B[?2J`)).toEqual([['eraseInDisplay', [2]]])
  expect(operations(`\x1B[?3J`)).toEqual([['eraseInDisplay', [3]]])
})

/**
 * CSI Ps K
 * Erase in Line (EL), VT100.
 *
 * Ps = 0  ⇒  Erase to Right (default).
 * Ps = 1  ⇒  Erase to Left.
 * Ps = 2  ⇒  Erase All.
 */
test('function eraseInLine', () => {
  expect(operations(`\x1B[K`)).toEqual([['eraseInLine', []]])
  expect(operations(`\x1B[0K`)).toEqual([['eraseInLine', [0]]])
  expect(operations(`\x1B[1K`)).toEqual([['eraseInLine', [1]]])
  expect(operations(`\x1B[2K`)).toEqual([['eraseInLine', [2]]])
})

/**
 * CSI ? Ps K
 * Erase in Line (DECSEL), VT220.
 *
 * Ps = 0  ⇒  Selective Erase to Right (default).
 * Ps = 1  ⇒  Selective Erase to Left.
 * Ps = 2  ⇒  Selective Erase All.
 */
test.skip('function eraseInLine (alternative)', () => {
  expect(operations(`\x1B[?K`)).toEqual([['eraseInLine', []]])
  expect(operations(`\x1B[?0K`)).toEqual([['eraseInLine', [0]]])
  expect(operations(`\x1B[?1K`)).toEqual([['eraseInLine', [1]]])
  expect(operations(`\x1B[?2K`)).toEqual([['eraseInLine', [2]]])
})

/**
 * CSI Ps L
 * Insert Ps Line(s) (default = 1) (IL).
 */
test('function insertLines', () => {
  expect(operations(`\x1B[L`)).toEqual([['insertLines', []]])
  expect(operations(`\x1B[0L`)).toEqual([['insertLines', [0]]])
  expect(operations(`\x1B[1L`)).toEqual([['insertLines', [1]]])
  expect(operations(`\x1B[2L`)).toEqual([['insertLines', [2]]])
})

/**
 * CSI Ps M
 * Delete Ps Line(s) (default = 1) (DL).
 */
test('function deleteLines', () => {
  expect(operations(`\x1B[M`)).toEqual([['deleteLines', []]])
  expect(operations(`\x1B[0M`)).toEqual([['deleteLines', [0]]])
  expect(operations(`\x1B[1M`)).toEqual([['deleteLines', [1]]])
  expect(operations(`\x1B[2M`)).toEqual([['deleteLines', [2]]])
})

/**
 * CSI Ps P
 * Delete Ps Character(s) (default = 1) (DCH).
 */
test('function deleteCharacters', () => {
  expect(operations(`\x1B[P`)).toEqual([['deleteCharacters', []]])
  expect(operations(`\x1B[0P`)).toEqual([['deleteCharacters', [0]]])
  expect(operations(`\x1B[1P`)).toEqual([['deleteCharacters', [1]]])
  expect(operations(`\x1B[2P`)).toEqual([['deleteCharacters', [2]]])
})

/**
 * CSI Ps S
 * Scroll up Ps lines (default = 1) (SU), VT420, ECMA-48.
 */
test('function scrollUp', () => {
  expect(operations(`\x1B[S`)).toEqual([['scrollUp', []]])
  expect(operations(`\x1B[0S`)).toEqual([['scrollUp', [0]]])
  expect(operations(`\x1B[1S`)).toEqual([['scrollUp', [1]]])
  expect(operations(`\x1B[2S`)).toEqual([['scrollUp', [2]]])
})

/**
 * CSI Ps T
 * Scroll down Ps lines (default = 1) (SD), VT420.
 */
test('function scrollDown', () => {
  expect(operations(`\x1B[T`)).toEqual([['scrollDown', []]])
  expect(operations(`\x1B[0T`)).toEqual([['scrollDown', [0]]])
  expect(operations(`\x1B[1T`)).toEqual([['scrollDown', [1]]])
  expect(operations(`\x1B[2T`)).toEqual([['scrollDown', [2]]])
})

/**
 * CSI Ps X
 * Erase Ps Character(s) (default = 1) (ECH).
 */
test('function eraseCharacters', () => {
  expect(operations(`\x1B[X`)).toEqual([['eraseCharacters', []]])
  expect(operations(`\x1B[0X`)).toEqual([['eraseCharacters', [0]]])
  expect(operations(`\x1B[1X`)).toEqual([['eraseCharacters', [1]]])
  expect(operations(`\x1B[2X`)).toEqual([['eraseCharacters', [2]]])
})

/**
 * CSI Ps Z
 * Cursor Backward Tabulation Ps tab stops (default = 1) (CBT).
 */
test('function cursorBackwardTabulation', () => {
  expect(operations(`\x1B[Z`)).toEqual([['cursorBackwardTabulation', []]])
  expect(operations(`\x1B[0Z`)).toEqual([['cursorBackwardTabulation', [0]]])
  expect(operations(`\x1B[1Z`)).toEqual([['cursorBackwardTabulation', [1]]])
  expect(operations(`\x1B[2Z`)).toEqual([['cursorBackwardTabulation', [2]]])
})

/**
 * CSI Ps ^
 * Scroll down Ps lines (default = 1) (SD), ECMA-48.
 * This was a publication error in the original ECMA-48 5th edition (1991) corrected in 2003.
 */
test.skip('function scrollDown (alternative)', () => {
  expect(operations(`\x1B[^`)).toEqual([['scrollDown', []]])
  expect(operations(`\x1B[0^`)).toEqual([['scrollDown', [0]]])
  expect(operations(`\x1B[1^`)).toEqual([['scrollDown', [1]]])
  expect(operations(`\x1B[2^`)).toEqual([['scrollDown', [2]]])
})

/**
 * CSI Ps `
 * Character Position Absolute  [column] (default = [row,1])
 * (HPA).
 */
test('function characterPositionAbsolute', () => {
  expect(operations('\x1B[`')).toEqual([['characterPositionAbsolute', []]])
  expect(operations('\x1B[0`')).toEqual([['characterPositionAbsolute', [0]]])
  expect(operations('\x1B[1`')).toEqual([['characterPositionAbsolute', [1]]])
  expect(operations('\x1B[2`')).toEqual([['characterPositionAbsolute', [2]]])
})

/**
 * CSI Ps a
 * Character Position Relative  [columns] (default = [row,col+1])
 * (HPR).
 */
test('function characterPositionRelative', () => {
  expect(operations('\x1B[a')).toEqual([['characterPositionRelative', []]])
  expect(operations('\x1B[0a')).toEqual([['characterPositionRelative', [0]]])
  expect(operations('\x1B[1a')).toEqual([['characterPositionRelative', [1]]])
  expect(operations('\x1B[2a')).toEqual([['characterPositionRelative', [2]]])
})

/**
 * CSI Ps b
 * Repeat the preceding graphic character Ps times (REP).
 */
test('function repeatPrecedingGraphicCharacter', () => {
  expect(operations(`\x1B[b`)).toEqual([
    ['repeatPrecedingGraphicCharacter', []],
  ])
  expect(operations(`\x1B[0b`)).toEqual([
    ['repeatPrecedingGraphicCharacter', [0]],
  ])
  expect(operations(`\x1B[1b`)).toEqual([
    ['repeatPrecedingGraphicCharacter', [1]],
  ])
  expect(operations(`\x1B[2b`)).toEqual([
    ['repeatPrecedingGraphicCharacter', [2]],
  ])
})

/**
 * CSI Ps c
 * Send Device Attributes (Primary DA).
 *
 * Ps = 0  or omitted ⇒  request attributes from terminal.
 *
 * The response depends on the decTerminalID resource setting.
 * ⇒  CSI ? 1 ; 2 c  ("VT100 with Advanced Video Option")
 * ⇒  CSI ? 1 ; 0 c  ("VT101 with No Options")
 * ⇒  CSI ? 4 ; 6 c  ("VT132 with Advanced Video and Graphics")
 * ⇒  CSI ? 6 c  ("VT102")
 * ⇒  CSI ? 7 c  ("VT131")
 * ⇒  CSI ? 1 2 ; Ps c  ("VT125")
 * ⇒  CSI ? 6 2 ; Ps c  ("VT220")
 * ⇒  CSI ? 6 3 ; Ps c  ("VT320")
 * ⇒  CSI ? 6 4 ; Ps c  ("VT420")
 *
 * The VT100-style response parameters do not mean anything by
 * themselves.  VT220 (and higher) parameters do, telling the
 * host what features the terminal supports:
 *   Ps = 1  ⇒  132-columns.
 *   Ps = 2  ⇒  Printer.
 *   Ps = 3  ⇒  ReGIS graphics.
 *   Ps = 4  ⇒  Sixel graphics.
 *   Ps = 6  ⇒  Selective erase.
 *   Ps = 8  ⇒  User-defined keys.
 *   Ps = 9  ⇒  National Replacement Character sets.
 *   Ps = 1 5  ⇒  Technical characters.
 *   Ps = 1 6  ⇒  Locator port.
 *   Ps = 1 7  ⇒  Terminal state interrogation.
 *   Ps = 1 8  ⇒  User windows.
 *   Ps = 2 1  ⇒  Horizontal scrolling.
 *   Ps = 2 2  ⇒  ANSI color, e.g., VT525.
 *   Ps = 2 8  ⇒  Rectangular editing.
 *   Ps = 2 9  ⇒  ANSI text locator (i.e., DEC Locator mode).
 *
 * XTerm supports part of the User windows feature, providing a
 * single page (which corresponds to its visible window).  Rather
 * than resizing the font to change the number of lines/columns
 * in a fixed-size display, xterm uses the window extension
 * controls (DECSNLS, DECSCPP, DECSLPP) to adjust its visible
 * window's size.  The "cursor coupling" controls (DECHCCM,
 * DECPCCM, DECVCCM) are ignored.
 */
test('function sendDeviceAttributesPrimary', () => {
  expect(operations(`\x1B[c`)).toEqual([])
  expect(operations(`\x1B[0c`)).toEqual([])
})

/**
 * CSI = Ps c
 * Send Device Attributes (Tertiary DA).
 *   Ps = 0  ⇒  report Terminal Unit ID (default), VT400.  XTerm
 *              uses zeros for the site code and serial number in its DECRPTUI
 *              response.
 */
test.skip('function sendDeviceAttributesTertiary', () => {
  expect(operations(`\x1B[=0c`)).toEqual([['sendDeviceAttributesTertiary', []]])
})

/**
 * CSI > Ps c
 *
 * Send Device Attributes (Secondary DA).
 *   Ps = 0  or omitted ⇒  request the terminal's identification
 * code.  The response depends on the decTerminalID resource
 * setting.  It should apply only to VT220 and up, but xterm
 * extends this to VT100.
 *   ⇒  CSI  > Pp ; Pv ; Pc c
 * where Pp denotes the terminal type
 *   Pp = 0  ⇒  "VT100".
 *   Pp = 1  ⇒  "VT220".
 *   Pp = 2  ⇒  "VT240" or "VT241".
 *   Pp = 1 8  ⇒  "VT330".
 *   Pp = 1 9  ⇒  "VT340".
 *   Pp = 2 4  ⇒  "VT320".
 *   Pp = 3 2  ⇒  "VT382".
 *   Pp = 4 1  ⇒  "VT420".
 *   Pp = 6 1  ⇒  "VT510".
 *   Pp = 6 4  ⇒  "VT520".
 *   Pp = 6 5  ⇒  "VT525".
 *
 * and Pv is the firmware version (for xterm, this was originally
 * the XFree86 patch number, starting with 95).  In a DEC
 * terminal, Pc indicates the ROM cartridge registration number
 * and is always zero.
 */
test.skip('function sendDeviceAttributesSecondary', () => {})

/**
 * CSI Ps d
 * Line Position Absolute  [row] (default = [1,column]) (VPA).
 */
test('function linePositionAbsolute', () => {
  expect(operations(`\x1B[d`)).toEqual([['linePositionAbsolute', []]])
  expect(operations(`\x1B[0d`)).toEqual([['linePositionAbsolute', [0]]])
  expect(operations(`\x1B[1d`)).toEqual([['linePositionAbsolute', [1]]])
  expect(operations(`\x1B[2d`)).toEqual([['linePositionAbsolute', [2]]])
})

/**
 * CSI Ps e
 * Line Position Relative  [rows] (default = [row+1,column]) (VPR).
 */
test('function linePositionRelative', () => {
  expect(operations(`\x1B[e`)).toEqual([['linePositionRelative', []]])
  expect(operations(`\x1B[0e`)).toEqual([['linePositionRelative', [0]]])
  expect(operations(`\x1B[1e`)).toEqual([['linePositionRelative', [1]]])
  expect(operations(`\x1B[2e`)).toEqual([['linePositionRelative', [2]]])
})

/**
 * CSI Ps ; Ps f
 * Horizontal and Vertical Position [row;column] (default = [1,1]) (HVP).
 */
test.skip('function horizontalAndVerticalPosition', () => {
  expect(operations(`\x1B[1;1f`)).toEqual([['horizontalAndVerticalPosition']])
})

/**
 * CSI Ps g
 * Tab Clear (TBC).
 *
 * Ps = 0  ⇒  Clear Current Column (default).
 * Ps = 3  ⇒  Clear All.
 */
test('function tabClear', () => {
  expect(operations(`\x1B[g`)).toEqual([['tabClear', []]])
  expect(operations(`\x1B[0g`)).toEqual([['tabClear', [0]]])
  expect(operations(`\x1B[3g`)).toEqual([['tabClear', [3]]])
})

/**
 * CSI Pm h
 * Set Mode (SM).
 *
 * Ps = 2  ⇒  Keyboard Action Mode (KAM).
 * Ps = 4  ⇒  Insert Mode (IRM).
 * Ps = 1 2  ⇒  Send/receive (SRM).
 * Ps = 2 0  ⇒  Automatic Newline (LNM).
 */
test('function setMode', () => {
  expect(operations(`\x1B[2h`)).toEqual([['setMode', [2]]])
  expect(operations(`\x1B[4h`)).toEqual([['setMode', [4]]])
})

/**
 * CSI Pm l
 * Reset Mode (RM).
 *
 * Ps = 2  ⇒  Keyboard Action Mode (KAM).
 * Ps = 4  ⇒  Replace Mode (IRM).
 * Ps = 1 2  ⇒  Send/receive (SRM).
 * Ps = 2 0  ⇒  Normal Linefeed (LNM).
 */
test('function resetMode', () => {
  expect(operations(`\x1B[2l`)).toEqual([['resetMode', [2]]])
  expect(operations(`\x1B[4l`)).toEqual([['resetMode', [4]]])
  expect(operations(`\x1B[12l`)).toEqual([['resetMode', [12]]])
  expect(operations(`\x1B[20l`)).toEqual([['resetMode', [20]]])
})

/**
 * CSI Pm m
 * Character Attributes (SGR).
 */
test.skip('function setCharacterAttributes', () => {
  expect(operations(`\x1B[m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[0m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[1m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[2m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[3m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[4m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[5m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[7m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[8m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[9m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[21m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[22m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[23m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[24m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[25m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[27m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[28m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[29m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[30m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[31m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[32m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[33m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[34m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[35m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[36m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[37m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[38m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[39m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[40m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[41m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[42m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[43m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[44m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[45m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[46m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[47m`)).toEqual([['setCharacterAttributes']])
  expect(operations(`\x1B[49m`)).toEqual([['setCharacterAttributes']])
})

/**
 * CSI ! p
 * Soft terminal reset (DECSTR), VT220 and up.
 */
test.skip('function softTerminalReset', () => {
  expect(operations(`\x1B[!p`)).toEqual([['softTerminalReset']])
})

/**
 * CSI Ps SP q
 * Set cursor style (DECSCUSR), VT520.
 *
 * Ps = 0  ⇒  blinking block.
 * Ps = 1  ⇒  blinking block (default).
 * Ps = 2  ⇒  steady block.
 * Ps = 3  ⇒  blinking underline.
 * Ps = 4  ⇒  steady underline.
 * Ps = 5  ⇒  blinking bar, xterm.
 * Ps = 6  ⇒  steady bar, xterm.
 */
test.skip('function setCursorStyle', () => {
  expect(operations(``)).toEqual([[]])
})

/**
 * CSI Ps SP t
 * Set warning-bell volume (DECSWBV), VT520.
 *
 * Ps = 0  or 1  ⇒  off.
 * Ps = 2 , 3  or 4  ⇒  low.
 * Ps = 5 , 6 , 7 , or 8  ⇒  high.
 */
test.skip('function setWarningBellVolume', () => {
  expect(operations(``)).toEqual([[]])
})

/**
 * CSI u
 * Restore cursor (SCORC, also ANSI.SYS).
 */
test.skip('function restoreCursor', () => {
  expect(operations(`\x1B[u`)).toEqual([['restoreCursor']])
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

test('function - eraseInLine', () => {
  const eraseInLine = jest.fn()
  runTest('\u001b[K', { eraseInLine })
  expect(eraseInLine).toHaveBeenCalledTimes(1)
})

test('function - backspace', () => {
  const backspace = jest.fn()
  runTest('\u0008', { backspace })
  expect(backspace).toHaveBeenCalledTimes(1)
})

test('function - setGLevel 1', () => {
  expect(operations(`\u001b~`)).toEqual([])
})

test('function - setGLevel 2', () => {
  expect(operations(`\u001b}`)).toEqual([])
})

test('function - setGLevel 3', () => {
  expect(operations(`\u001b|`)).toEqual([])
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

test.skip('function - setWindowTitle', () => {
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
  const eraseInLine = jest.fn()
  const backspace = jest.fn()
  runTest(
    `\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008\u0008d\u001b[K`,
    { backspace, eraseInLine },
  )
  expect(backspace).toHaveBeenCalledTimes(10)
  expect(eraseInLine).toHaveBeenCalledTimes(1)
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

test('function cursorHide', () => {
  expect(operations(`\x1B[?25l`)).toEqual([['cursorHide']])
})

test('function cursorShow', () => {
  expect(operations(`\x1B[?25h`)).toEqual([['cursorShow']])
})

test.skip('special ', () => {
  expect(operations(`\x1B[?1049l`)).toEqual([[]])
})

test.skip('special', () => {
  expect(operations(`\x1B[23;0;0t`)).toEqual([[]])
})

test.skip('special', () => {
  expect(operations(`\x1B[?1l`)).toEqual([[]])
})

test('function - bell', () => {
  expect(operations(`\u0007`)).toEqual([['bell']])
  expect(operations(`sample \u0007 text`)).toEqual([
    ['print'],
    ['bell'],
    ['print'],
  ])
})
