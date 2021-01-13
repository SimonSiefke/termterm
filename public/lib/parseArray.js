const State = {
  TopLevelContent: 'TopLevelContent',
  Escaped: 'Escaped',
  Csi: 'Csi',
  AfterEscape3: 'AfterEscape3',
  Charset: 'Charset',
  AfterEscape3AfterSemicolon: 'AfterEscape3AfterSemicolon',
  AfterEscape3AfterSemicolon2: 'AfterEscape3AfterSemicolon2',
  Osc: 'Osc',
  Dcs: 'Dcs',
  AfterOscAfter0: 'AfterOscAfter0',
  AfterOscAfter0AfterSemicolon: 'AfterOscAfter0AfterSemicolon',
  AfterCsiAfterQuestionMark: 'AfterCsiAfterQuestionMark',
  AfterCsiAfterQuestionMarkAfter2: 'AfterCsiAfterQuestionMarkAfter2',
  AfterCsiAfterQuestionMarkAfter25: 'AfterCsiAfterQuestionMarkAfter25',
  AfterCsiAfterExclamationMark: 'AfterCsiAfterExclamationMark',
}

export const createParse = ({
  eraseInDisplay,
  eraseToEndOfLine,
  goToHome,
  setCharAttributes,
  bell,
  cursorUp,
  cursorDown,
  cursorRight,
  cursorLeft,
  backspace,
  print,
  setGLevel,
  saveCursor,
  restoreCursor,
  index,
  tabSet,
  reverseIndex,
  keypadApplicationMode,
  keypadNumericMode,
  fullReset,
  nextLine,
  lineFeed,
  newline,
  carriageReturn,
  deleteCharacters,
  setWindowTitle,
  setCursor,
  cursorHide,
  cursorShow,
  softTerminalReset,
  cursorNextLine,
  cursorPrecedingLine,
  cursorCharacterAbsolute,
  cursorForwardTabulation,
}) => {
  let state = State.TopLevelContent
  let i = 0
  let currentParam
  let params = []
  let printStartIndex = -1
  const parse = (array) => {
    state = State.TopLevelContent
    i = 0
    printStartIndex = -1

    while (i < array.length) {
      switch (state) {
        case State.TopLevelContent:
          middle: switch (array[i]) {
            case /* \u001b */ 27:
              state = State.Escaped
              i++
              break
            case /* \u0007 */ 7:
              bell()
              state = State.TopLevelContent
              i++
              break
            case /* \u0008 */ 8:
              backspace()
              state = State.TopLevelContent
              i++
              break
            case /* \n */ 10:
              lineFeed()
              state = State.TopLevelContent
              i++
              break
            case /* \r */ 13:
              carriageReturn()
              state = State.TopLevelContent
              i++
              break
            default:
              printStartIndex = i++
              while (i < array.length) {
                switch (array[i]) {
                  case /* \u001b */ 27:
                    print(array, printStartIndex, i)
                    state = State.Escaped
                    i++
                    break middle
                  case /* \u0007 */ 7:
                    print(array, printStartIndex, i)
                    bell()
                    state = State.TopLevelContent
                    i++
                    break middle
                  case /* \u0008 */ 8:
                    print(array, printStartIndex, i)
                    backspace()
                    state = State.TopLevelContent
                    i++
                    break middle
                  case /* \n */ 10:
                    print(array, printStartIndex, i)
                    lineFeed()
                    state = State.TopLevelContent
                    i++
                    break middle
                  case /* \r */ 13:
                    print(array, printStartIndex, i)
                    carriageReturn()
                    state = State.TopLevelContent
                    i++
                    break middle

                  default:
                    // console.log(String.fromCharCode(array[i]) === '\r')
                    // console.log(String.fromCharCode(array[i]) === '\n')
                    // console.log(String.fromCharCode(array[i]) === '\f')
                    i++
                    break
                }
              }
              // for (let j = printStartIndex; j < i; j++) {
              //   if (/\s/.test(String.fromCharCode(array[i]))) {
              //     throw new Error('impossible')
              //   }
              // }
              // console.log('default print')
              print(array, printStartIndex, i)
              break
          }
          break
        case State.Escaped:
          switch (array[i]) {
            // ESC [ Control Sequence Introducer ( CSI is 0x9b).
            case /* [ */ 91:
              params = []
              state = State.Csi
              i++
              break
            // ESC ] Operating System Command ( OSC is 0x9d).
            case /* ] */ 93:
              state = State.Osc
              i++
              break
            // ESC P Device Control String ( DCS is 0x90).
            case /* P */ 80:
              state = State.Dcs
              i++
              break
            // ESC _ Application Program Command ( APC is 0x9f).
            case /* _ */ 95:
              i++
              break
            // ESC ^ Privacy Message ( PM is 0x9e).
            case /* ^ */ 94:
              i++
              break
            // ESC c Full Reset (RIS).
            case /* c */ 99:
              i++
              break
            // ESC E Next Line ( NEL is 0x85).
            case /* E */ 69:
              nextLine()
              i++
              break
            // ESC D Index ( IND is 0x84).
            case /* D */ 68:
              index()
              i++
              break
            // ESC M Reverse Index ( RI is 0x8d).
            case /* M */ 77:
              i++
              break
            // ESC % Select default/utf-8 character set.
            // @ = default, G = utf-8
            case /* % */ 37:
              setGLevel(0)
              state = State.TopLevelContent
              i++
              break
            // ESC (,),*,+,-,. Designate G0-G2 Character Set.
            case /* ( */ 40:
              state = State.Charset
              i++
              break
            case /* ) */ 41:
              state = State.Charset
              i++
              break
            case /* * */ 42:
              state = State.Charset
              i++
              break
            case /* + */ 43:
              state = State.Charset
              i++
              break
            case /* - */ 44:
              state = State.Charset
              i++
              break
            case /* . */ 45:
              state = State.Charset
              i++
              break
            // ESC > Normal Keypad (DECPNM).
            case /* > */ 62:
              state = State.TopLevelContent
              i++
              break
            // ESC N
            // Single Shift Select of G2 Character Set
            // ( SS2 is 0x8e). This affects next character only.
            case /* N */ 78:
              i++
              break
            // ESC O
            // Single Shift Select of G3 Character Set
            // ( SS3 is 0x8f). This affects next character only.
            case /* O */ 79:
              i++
              break
            // ESC n
            // Invoke the G2 Character Set as GL (LS2).
            case /* n */ 110:
              setGLevel(2)
              i++
              break
            // ESC o
            // Invoke the G3 Character Set as GL (LS3).
            case /* o */ 111:
              setGLevel(3)
              i++
              break
            // ESC |
            // Invoke the G3 Character Set as GR (LS3R).
            case /* | */ 124:
              setGLevel(3)
              i++
              break
            // ESC }
            // Invoke the G2 Character Set as GR (LS2R).
            case /* } */ 125:
              setGLevel(2)
              i++
              break
            // ESC ~
            // Invoke the G1 Character Set as GR (LS1R).
            case /* ~ */ 126:
              setGLevel(1)
              i++
              break
            // ESC 7 Save Cursor (DECSC).
            case /* 7 */ 55:
              saveCursor()
              state = State.TopLevelContent
              i++
              break
            // ESC 8 Restore Cursor (DECRC).
            case /* 8 */ 56:
              restoreCursor()
              state = State.TopLevelContent
              i++
              break
            // ESC # 3 DEC line height/width
            case /* # */ 35:
              state = State.TopLevelContent
              i++
              break
            // ESC H Tab Set (HTS is 0x88).
            case /* H */ 72:
              tabSet()
              i++
              break
            // ESC = Application Keypad (DECPAM).
            case /* = */ 61:
              state = State.TopLevelContent
              i++
              break
            // ESC > Normal Keypad (DECPNM).
            case /* > */ 62:
              state = State.TopLevelContent
              i++
              break
            default:
              state = State.TopLevelContent
              i++
              break
          }
          break
        case State.AfterCsiAfterQuestionMark:
          switch (array[i]) {
            case /* 2 */ 50:
              state = State.AfterCsiAfterQuestionMarkAfter2
              i++
              break
            default:
              i++
              break
          }
          break
        case State.AfterCsiAfterQuestionMarkAfter2:
          switch (array[i]) {
            case /* 5 */ 53:
              state = State.AfterCsiAfterQuestionMarkAfter25
              i++
              break
            default:
              i++
              break
          }
          break
        case State.AfterCsiAfterQuestionMarkAfter25:
          switch (array[i]) {
            case /* l */ 108:
              cursorHide()
              i++
              state = State.TopLevelContent
              break
            case /* h */ 104:
              cursorShow()
              i++
              state = State.TopLevelContent
              break
            default:
              i++
              break
          }
          break
        case State.Charset:
          switch (array[i]) {
            // DEC Special Character and Line Drawing Set.
            case /* 0 */ 48:
              state = State.TopLevelContent
              i++
              break
            // UK
            case /* A */ 65:
              state = State.TopLevelContent
              i++
              break
            // United States (USASCII).
            case /* B */ 66:
              // TODO do something
              state = State.TopLevelContent
              i++
              break
            // Dutch
            case /* 4 */ 52:
              state = State.TopLevelContent
              i++
              break
            // Finnish
            case /* C */ 67:
            case /* 5 */ 53:
              state = State.TopLevelContent
              i++
              break
            // French
            case /* R */ 82:
              state = State.TopLevelContent
              i++
              break
            // FrenchCanadian
            case /* Q */ 81:
              state = State.TopLevelContent
              i++
              break
            // German
            case /* K */ 75:
              state = State.TopLevelContent
              i++
              break
            // Italian
            case /* Y */ 89:
              state = State.TopLevelContent
              i++
              break
            // NorwegianDanish
            case /* E */ 69:
            case /* 6 */ 54:
              state = State.TopLevelContent
              i++
              break
            // Spanish
            case /* Z */ 90:
              state = State.TopLevelContent
              i++
              break
            // Swedish
            case /* H */ 72:
            case /* 7 */ 55:
              state = State.TopLevelContent
              i++
              break
            // Swiss
            case /* = */ 61:
              state = State.TopLevelContent
              i++
              break
            // ISOLatin (actually /A)
            case /* / */ 47:
              state = State.TopLevelContent
              i++
              break
            default:
              state = State.TopLevelContent
              i++
              break
          }
          break
        case State.Csi:
          switch (array[i]) {
            case /* ! */ 33:
              state = State.AfterCsiAfterExclamationMark
              i++
              break
            case /* 0 */ 48:
            case /* 1 */ 49:
            case /* 2 */ 50:
            case /* 3 */ 51:
            case /* 4 */ 52:
            case /* 5 */ 53:
            case /* 6 */ 54:
            case /* 7 */ 55:
            case /* 8 */ 56:
            case /* 9 */ 57:
              params = []
              currentParam = array[i] - 48
              state = State.AfterEscape3
              i++
              break
            case /* ? */ 63:
              state = State.AfterCsiAfterQuestionMark
              i++
              break
            case /* A */ 65:
              cursorUp(1)
              state = State.TopLevelContent
              i++
              break
            case /* B */ 66:
              cursorDown(1)
              state = State.TopLevelContent
              i++
              break
            case /* C */ 67:
              cursorRight(1)
              state = State.TopLevelContent
              i++
              break
            case /* D */ 68:
              cursorLeft(1)
              state = State.TopLevelContent
              i++
              break
            case /* E */ 69:
              cursorNextLine()
              state = State.TopLevelContent
              i++
              break
            case /* F */ 70:
              cursorPrecedingLine()
              state = State.TopLevelContent
              i++
              break
            case /* G */ 71:
              cursorCharacterAbsolute()
              state = State.TopLevelContent
              i++
              break
            case /* H */ 72:
              goToHome()
              state = State.TopLevelContent
              i++
              break
            case /* I */ 73:
              cursorForwardTabulation()
              state = State.TopLevelContent
              i++
              break
            case /* J */ 74:
              eraseInDisplay(params)
              state = State.TopLevelContent
              i++
              break
            case /* P */ 80:
              deleteCharacters(1)
              state = State.TopLevelContent
              i++
              break
            case /* f */ 102:
              goToHome()
              state = State.TopLevelContent
              i++
              break
            case /* m */ 109:
              setCharAttributes([])
              i++
              state = State.TopLevelContent
              break
            case /* K */ 75:
              eraseToEndOfLine()
              state = State.TopLevelContent
              i++
              break
            case /* u */ 117:
              restoreCursor()
              state = State.TopLevelContent
              i++
              break
            default:
              i++
              break
          }
          break
        case State.AfterEscape3:
          switch (array[i]) {
            case /* ; */ 59:
              params.push(currentParam)
              state = State.AfterEscape3AfterSemicolon
              i++
              break
            case /* A */ 65:
              cursorUp(1)
              state = State.TopLevelContent
              i++
              break
            case /* B */ 66:
              cursorDown(1)
              state = State.TopLevelContent
              i++
              break
            case /* C */ 67:
              cursorRight(1)
              state = State.TopLevelContent
              i++
              break
            case /* D */ 68:
              cursorLeft(1)
              state = State.TopLevelContent
              i++
              break
            case /* J */ 74:
              params.push(currentParam)
              eraseInDisplay(params)
              state = State.TopLevelContent
              i++
              break
            case /* P */ 80:
              deleteCharacters(1)
              state = State.TopLevelContent
              i++
              break
            case /* 0 */ 48:
            case /* 1 */ 49:
            case /* 2 */ 50:
            case /* 3 */ 51:
            case /* 4 */ 52:
            case /* 5 */ 53:
            case /* 6 */ 54:
            case /* 7 */ 55:
            case /* 8 */ 56:
            case /* 9 */ 57:
              currentParam = currentParam * 10 + array[i] - 48
              i++
              break

            case /* m */ 109:
              params
              setCharAttributes([currentParam])
              state = State.TopLevelContent
              i++
              break
            default:
              i++
              break
          }
          break
        case State.AfterEscape3AfterSemicolon:
          switch (array[i]) {
            case /* 0 */ 48:
            case /* 1 */ 49:
            case /* 2 */ 50:
            case /* 3 */ 51:
            case /* 4 */ 52:
            case /* 5 */ 53:
            case /* 6 */ 54:
            case /* 7 */ 55:
            case /* 8 */ 56:
            case /* 9 */ 57:
              currentParam = array[i] - 48
              state = State.AfterEscape3AfterSemicolon2
              currentParam
              i++
              break
            default:
              i++
              break
          }
          break
        case State.AfterEscape3AfterSemicolon2:
          switch (array[i]) {
            case /* 0 */ 48:
            case /* 1 */ 49:
            case /* 2 */ 50:
            case /* 3 */ 51:
            case /* 4 */ 52:
            case /* 5 */ 53:
            case /* 6 */ 54:
            case /* 7 */ 55:
            case /* 8 */ 56:
            case /* 9 */ 57:
              currentParam = currentParam * 10 + array[i] - 48
              state = State.AfterEscape3AfterSemicolon2
              i++
              break
            case /* m */ 109:
              params.push(currentParam)
              setCharAttributes(params)
              state = State.TopLevelContent
              i++
              break
            case /* H */ 72:
              params.push(currentParam)
              setCursor(params)
              state = State.TopLevelContent
              i++
              break
            default:
              array[i] //?
              i++
              break
          }
          break
        case State.Osc:
          middle: switch (array[i]) {
            case /* 0 */ 48:
              state = State.AfterOscAfter0
              i++
              break
            // printStartIndex = i++
            // while (i < array.length) {
            //   switch (array[i]) {
            //     case /* \u0007 */ 7:
            //       setWindowTitle(array, printStartIndex, i)
            //       state = State.TopLevelContent
            //       i++
            //       break middle
            //     default:
            //       i++
            //       break
            //   }
            // }
            // setWindowTitle(array, printStartIndex, i)
            // break
            default:
              i++
              break
          }
          break
        case State.AfterOscAfter0:
          switch (array[i]) {
            case /* ; */ 59:
              state = State.AfterOscAfter0AfterSemicolon
              i++
              printStartIndex = i
              break
            default:
              i++
              break
          }
          break
        case State.AfterOscAfter0AfterSemicolon:
          switch (array[i]) {
            case /* \u0007 */ 7:
              setWindowTitle(array, printStartIndex, i)
              state = State.TopLevelContent
              i++
              break
            default:
              i++
              break
          }
          break
        case State.AfterCsiAfterExclamationMark:
          switch (array[i]) {
            case /* p */ 112:
              softTerminalReset()
              i++
              state = State.TopLevelContent
              break
            default:
              i++
              break
          }
          break
        default:
          i++
          console.warn('invalid state')
          break
      }
    }
    // if (printStartIndex !== -1) {
    //   console.log('printing end')
    //   print(array, printStartIndex, i)
    // }
  }
  return parse
}

const eraseInDisplay = (params) => {
  console.log('erase in display')
  console.log(params)
}

const eraseToEndOfLine = () => {
  console.log('erase to end of line')
}

const goToHome = () => {
  console.log('go to home')
}

const setCharAttributes = () => {
  console.log('set char attributes')
}

const cursorUp = () => {
  console.log('cursor up')
}

const cursorDown = () => {
  console.log('cursor down')
}

const cursorRight = () => {
  console.log('cursor right')
}

const cursorLeft = () => {
  console.log('cursor left')
}

const bell = () => {
  console.log('bell')
}

const newline = () => {
  console.log('newline')
}

const setGLevel = () => {
  console.log('set g level')
}

const carriageReturn = () => {
  console.log('carriage return')
}

let output = ''

const decodeString = (string) => {
  const { StringDecoder } = require('string_decoder')
  const decoder = new StringDecoder('utf8')
  return decoder.write(string)
}

const setWindowTitle = (array, startIndex, endIndex) => {
  console.log(
    'set window title' + decodeString(array.slice(startIndex, endIndex)),
  )
}

const encodeString = (input) => {
  return new Uint8Array(Buffer.from(input, 'utf-8'))
}

const setCursor = (params) => {
  console.log(params)
}

const cursorHide = () => {
  console.log('cursor hide')
}

const print = (array, startIndex, endIndex) => {
  startIndex
  endIndex
  array
  output += decodeString(array.slice(startIndex, endIndex))
}

const lineFeed = () => {}

const cursorNextLine = () => {
  console.log('cursorNextLine')
}

// const input = '\x1B[3J'

// const array = encodeString(input)

// createParse({
//   eraseInDisplay,
//   eraseToEndOfLine,
//   goToHome,
//   setCharAttributes,
//   cursorUp,
//   cursorDown,
//   cursorRight,
//   cursorLeft,
//   print,
//   newline,
//   setGLevel,
//   bell,
//   backspace: () => {},
//   carriageReturn,
//   lineFeed,
//   setWindowTitle,
//   setCursor,
//   cursorHide,
//   cursorNextLine,
// })(array) //?

// output
