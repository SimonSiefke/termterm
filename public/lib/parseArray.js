// DEPRECATED
const State = {
  TopLevelContent: 'TopLevelContent',
  Escaped: 'Escaped',
  Csi: 'Csi',
  AfterEscape3: 'AfterEscape3',
  AfterEscape3AfterSemicolon: 'AfterEscape3AfterSemicolon',
  AfterEscape3AfterSemicolon2: 'AfterEscape3AfterSemicolon2',
  Osc: 'Osc',
  Dcs: 'Dcs',
}

export const createParse = ({
  eraseInDisplay2,
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
  newline,
  saveCursor,
  restoreCursor,
  index,
  tabSet,
  reverseIndex,
  keypadApplicationMode,
  keypadNumericMode,
  fullReset,
  nextLine,
}) => {
  console.log('hello')
  const parse = (array) => {
    let state = State.TopLevelContent
    let i = 0
    let currentParam
    let params = []
    let printStartIndex = -1
    let element = -1
    while (i < array.length) {
      element = array[i]
      switch (state) {
        case State.TopLevelContent:
          middle: switch (element) {
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
              newline()
              state = State.TopLevelContent
              i++
              break
            case /* \r */ 13:
              state = State.TopLevelContent
              i++
              break
            case /* \u001b */ 27:
              state = State.Escaped
              i++
              break
            default:
              const printStartIndex = i++
              while (i < array.length) {
                element = array[i]
                switch (element) {
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
                  case /* \r */ 13:
                    print(array, printStartIndex, i)
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
          switch (element) {
            case /* [ */ 91:
              params = []
              state = State.Csi
              i++
              break
            case /* ] */ 93:
              state = State.Osc
              i++
              break
            case /* P */ 80:
              state = State.Dcs
              i++
              break
            case /* _ */ 95:
              i++
              break
            case /* ^ */ 94:
              i++
              break
            case /* c */ 99:
              i++
              break
            case /* E */ 69:
              nextLine()
              i++
              break
            case /* D */ 68:
              index()
              i++
              break
            case /* M */ 77:
              i++
              break
            case /* > */ 62:
              state = State.TopLevelContent
              i++
              break
            case /* 7 */ 55:
              saveCursor()
              state = State.TopLevelContent
              i++
              break
            case /* 8 */ 56:
              restoreCursor()
              state = State.TopLevelContent
              i++
              break
            case /* # */ 35:
              state = State.TopLevelContent
              i++
              break
            case /* H */ 72:
              tabSet()
              i++
              break
            case /* = */ 61:
              state = State.TopLevelContent
              i++
              break
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
        case State.Csi:
          switch (element) {
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
            case /* H */ 72:
              goToHome()
              state = State.TopLevelContent
              i++
              break
            case /* f */ 102:
              goToHome()
              state = State.TopLevelContent
              i++
              break
            case /* m */ 109:
              // TODO do something
              i++
              state = State.TopLevelContent
              break
            case /* K */ 75:
              eraseToEndOfLine()
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
              params = []
              currentParam = element - 48
              state = State.AfterEscape3
              i++
              break
            default:
              i++
              break
          }
          break
        case State.AfterEscape3:
          switch (element) {
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
              eraseInDisplay2()
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
              currentParam = currentParam * 10 + element - 48
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
          switch (element) {
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
              currentParam = element - 48
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
          switch (element) {
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
              currentParam = currentParam * 10 + element - 48
              state = State.AfterEscape3AfterSemicolon2
              i++
              break
            case /* m */ 109:
              params.push(currentParam)
              setCharAttributes(params)
              state = State.TopLevelContent
              i++
              break
            default:
              array[i] //?
              i++
              break
          }
          break
        default:
          throw new Error('invalid state')
      }
    }
  }
  return parse
}

const eraseInDisplay2 = () => {
  console.log('erase in display 2')
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

let output = ''

const decodeString = (string) => {
  const { StringDecoder } = require('string_decoder')
  const decoder = new StringDecoder('utf8')
  return decoder.write(string)
}

const encodeString = (input) => {
  return new Uint8Array(Buffer.from(input, 'utf-8'))
}

const print = (array, startIndex, endIndex) => {
  startIndex
  endIndex
  array
  output += decodeString(array.slice(startIndex, endIndex))
}

const input = `sample \u0007 text`

// const array = encodeString(input)

// createParser({
//   eraseInDisplay2,
//   eraseToEndOfLine,
//   goToHome,
//   setCharAttributes,
//   cursorUp,
//   cursorDown,
//   cursorRight,
//   cursorLeft,
//   print,
//   newline,
//   bell,
// })(array) //?

// output
