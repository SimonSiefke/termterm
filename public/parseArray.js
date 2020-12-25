const State = {
  TopLevelContent: 'TopLevelContent',
  AfterEscape1: 'AfterEscape1',
  AfterEscape2: 'AfterEscape2',
  AfterEscape3: 'AfterEscape3',
  AfterEscape4: 'AfterEscape4',
  AfterEscape3AfterSemicolon: 'AfterEscape3AfterSemicolon',
  AfterEscape3AfterSemicolon2: 'AfterEscape3AfterSemicolon2',
  Print: 'Print',
}

const special = new Set([
  /* \u001b */ 27,
  /* \u0007 */ 7,
  /* \u0008 */ 8,
  /* \r */ 13,
  undefined,
])

export const parseArray = (
  array,
  {
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
  } = {},
) => {
  let state = State.TopLevelContent
  let i = 0
  // let output = ``
  let currentParam
  let params = []
  // let printed = -1
  let printStartIndex = -1
  while (i < array.length) {
    state
    // console.log(array[i])
    switch (state) {
      case State.TopLevelContent:
        middle: switch (array[i]) {
          case /* \u001b */ 27:
            state = State.AfterEscape1
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
          case /* \r */ 13:
            // console.log('newline')
            // print(array[i])
            // output += '\n'
            state = State.TopLevelContent
            i++
            break
          default:
            const printStartIndex = i++
            while (i < array.length) {
              switch (array[i]) {
                case /* \u001b */ 27:
                  print(printStartIndex, i)
                  state = State.AfterEscape1
                  i++
                  break middle
                case /* \u0007 */ 7:
                  print(printStartIndex, i)
                  bell()
                  state = State.TopLevelContent
                  i++
                  break middle
                case /* \u0008 */ 8:
                  print(printStartIndex, i)
                  backspace()
                  state = State.TopLevelContent
                  i++
                  break middle
                case /* \r */ 13:
                  print(printStartIndex, i)
                  newline()
                  state = State.TopLevelContent
                  i++
                  break middle
                default:
                  i++
                  break
              }
            }
            print(printStartIndex, i)
            // console.log('out')
            break
        }
        // console.log(array[i])
        break
      // case State.Print:
      //   switch (array[i]) {
      //     case /* \u001b */ 27:
      //       print(printStartIndex, i)
      //       state = State.AfterEscape1
      //       i++
      //       break
      //     case /* \u0007 */ 7:
      //       print(printStartIndex, i)
      //       bell()
      //       state = State.TopLevelContent
      //       i++
      //       break
      //     case /* \u0008 */ 8:
      //       print(printStartIndex, i)
      //       backspace()
      //       state = State.TopLevelContent
      //       i++
      //       break
      //     case /* \r */ 13:
      //       print(printStartIndex, i)
      //       state = State.TopLevelContent
      //       i++
      //       break
      //     default:
      //       i++
      //       break
      //   }
      //   break
      case State.AfterEscape1:
        switch (array[i]) {
          case /* [ */ 91:
            state = State.AfterEscape2
            i++
            break
          case /* ( */ 40:
            state = State.AfterEscape4
            i++
            break
          default:
            state = State.TopLevelContent
            i++
            break
        }
        break
      case State.AfterEscape4:
        switch (array[i]) {
          case /* B */ 66:
            // TODO do something
            state = State.TopLevelContent
            i++
            break
          default:
            i++
            break
        }
        break
      case State.AfterEscape2:
        switch (array[i]) {
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
            currentParam = array[i] - 48
            state = State.AfterEscape3
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
            eraseInDisplay2()
            i++
            break
          case /* m */ 109:
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
          default:
            array[i] //?
            i++
            break
        }
        break
      default:
        i++
        break
    }
  }
  if (printStartIndex !== -1) {
    print(printStartIndex, i)
  }
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

const print = (startIndex, endIndex) => {
  startIndex
  endIndex
  array
  output += decodeString(array.slice(startIndex, endIndex))
}

const input = `\u001b[0m  server.js\r\n`

// const array = encodeString(input)

// parseArray(array, {
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
// }) //?

// output
