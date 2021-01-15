const State = {
  TopLevelContent: 1,
  Escaped: 2,
  Csi: 3,
  AfterEscape3: 4,
  Charset: 5,
  AfterEscape3AfterSemicolon: 6,
  AfterEscape3AfterSemicolon2: 7,
  Osc: 8,
  Dcs: 9,
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
}) => {
  const parse = (array) => {
    let state = State.TopLevelContent
    let i = 0
    let currentParam
    let params = []
    let printStartIndex = -1
    const push = () => params.push(currentParam)
    while (i < array.length) {
      state
      switch (state) {
        case State.TopLevelContent:
          middle: switch (array[i]) {
            case /* \u0007 */ 7:
              bell()
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
              printStartIndex = i++
              while (i < array.length) {
                const element = array[i]
                if (element >= 32 && element < 126) {
                  i++
                  continue
                }
                switch (element) {
                  case /* \u001b */ 27:
                    print(printStartIndex, i)
                    state = State.Escaped
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
                    state = State.TopLevelContent
                    i++
                    break middle
                  default:
                    i++
                    break
                }
              }
              print(array, printStartIndex, i)
              break
          }
          break
        case State.Escaped:
          switch (array[i]) {
            case /* ( */ 40:
              state = State.Charset
              break
            case /* [ */ 91:
              params = []
              state = State.Csi
              break
            case /* ] */ 93:
              state = State.Osc
              break
            case /* P */ 80:
              state = State.Dcs
              break
            case /* _ */ 95:
              break
            case /* ^ */ 94:
              break
            case /* c */ 99:
              break
            case /* E */ 69:
              nextLine()
            case /* D */ 68:
              index()
              break
            case /* 7 */ 55:
              saveCursor()
              state = State.TopLevelContent
              break
            case /* 8 */ 56:
              restoreCursor()
              state = State.TopLevelContent
              break
            case /* H */ 72:
              tabSet()
              break
            default:
              state = State.TopLevelContent
              break
          }
          i++
          break
        case State.Charset:
          i++
          break
        case State.Csi:
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
              params = []
              currentParam = array[i] - 48
              state = State.AfterEscape3
              break
            case /* A */ 65:
              params = []
              cursorUp(params)
              state = State.TopLevelContent
              break
            case /* B */ 66:
              params = []
              cursorDown(params)
              state = State.TopLevelContent
              break
            case /* C */ 67:
              params = []
              cursorRight(params)
              state = State.TopLevelContent
              break
            case /* D */ 68:
              params = []
              cursorLeft(params)
              state = State.TopLevelContent
              break
          }
          i++
          break
        case State.AfterEscape3:
          switch (array[i]) {
            case /* ; */ 59:
              push()
              state = State.AfterEscape3AfterSemicolon
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
              break
            case /* A */ 65:
              params.push(currentParam)
              cursorUp(params)
              state = State.TopLevelContent
              break
            case /* B */ 66:
              params.push(currentParam)
              cursorDown(params)
              state = State.TopLevelContent
              break
            case /* C */ 67:
              params.push(currentParam)
              cursorRight(params)
              state = State.TopLevelContent
              break
            case /* D */ 68:
              params.push(currentParam)
              cursorLeft(params)
              state = State.TopLevelContent
              break
            case /* m */ 109:
              setCharAttributes([currentParam])
              state = State.TopLevelContent
              break
          }
          i++
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
              break
          }
          i++
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
              break
            case /* m */ 109:
              push()
              setCharAttributes(params)
              state = State.TopLevelContent
              break
          }
          i++
          break
        default:
          throw new Error('invalid state')
      }
    }
  }
  return parse
}

// const demo = () => {
//   const input = `\u001b[0B`
//   createParse({
//     cursorDown: () => console.log('cursor down'),
//   })(new Uint8Array(Buffer.from(input, 'utf-8')))
// }

// demo()
