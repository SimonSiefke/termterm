const State = {
  TopLevelContent: 1,
  Escaped: 2,
  Csi: 3,
  AfterEscape3: 4,
  Charset: 5,
  AfterEscape3AfterSemicolon: 6,
  // CsiAfterQuestionMark1: 7,
  // CsiAfterQuestionMark2: 10,
  Osc: 8,
  Dcs: 9,
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
  carriageReturn,
  deleteCharacters,
  setWindowTitle,
  cursorPosition,
  cursorHide,
  cursorShow,
  softTerminalReset,
  cursorNextLine,
  cursorPrecedingLine,
  cursorCharacterAbsolute,
  cursorForwardTabulation,
  cursorBackwardTabulation,
  insertLines,
  deleteLines,
  scrollUp,
  scrollDown,
  eraseCharacters,
  characterPositionAbsolute,
  characterPositionRelative,
  repeatPrecedingGraphicCharacter,
  sendDeviceAttributesPrimary,
  sendDeviceAttributesTertiary,
  linePositionAbsolute,
  eraseInLine,
  linePositionRelative,
  horizontalAndVerticalPosition,
  tabClear,
  setMode,
  resetMode,
  lineFeed,
}) => {
  const parse = (array) => {
    let state = State.TopLevelContent
    let i = 0
    let currentParam
    let params = []
    let printStartIndex = -1
    const paramsPush = () => params.push(currentParam)
    while (i < array.length) {
      switch (state) {
        case State.TopLevelContent:
          middle: switch (array[i]) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
              i++
              break
            case /* \u0007 */ 7:
              bell()
              i++
              break
            case /* \u0008 */ 8:
              backspace()
              i++
              break
            case /* \t */ 9:
              i++
              break
            case /* \n */ 10:
              lineFeed()
              i++
              break
            case 11:
            case 12:
              i++
              break
            case /* \r */ 13:
              carriageReturn()
              i++
              break
            case 14:
            case 15:
            case 16:
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
            case 25:
            case 26:
              i++
              break
            case /* \u001b */ 27:
              state = State.Escaped
              i++
              break
            case 28:
            case 29:
            case 30:
            case 31:
              i++
              break
            case 32:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            case 38:
            case 39:
            case 40:
            case 41:
            case 42:
            case 43:
            case 44:
            case 45:
            case 46:
            case 47:
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 58:
            case 59:
            case 60:
            case 61:
            case 62:
            case 63:
            case 64:
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 91:
            case 92:
            case 93:
            case 94:
            case 95:
            case 96:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
            case 123:
            case 124:
            case 125:
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
                    carriageReturn()
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
            default:
              // TODO this is slow
              throw new Error('no')
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
              currentParam = array[i] - 48
              state = State.AfterEscape3
              break
            // case /* ? */ 63:
            //   state = State.CsiAfterQuestionMark1
            //   break
            case /* A */ 65:
              cursorUp(params)
              state = State.TopLevelContent
              break
            case /* B */ 66:
              cursorDown(params)
              state = State.TopLevelContent
              break
            case /* C */ 67:
              cursorRight(params)
              state = State.TopLevelContent
              break
            case /* D */ 68:
              cursorLeft(params)
              state = State.TopLevelContent
              break
            case /* E */ 69:
              cursorNextLine(params)
              state = State.TopLevelContent
              break
            case /* F */ 70:
              cursorPrecedingLine(params)
              state = State.TopLevelContent
              break
            case /* G */ 71:
              cursorCharacterAbsolute(params)
              state = State.TopLevelContent
              break
            case /* H */ 72:
              cursorPosition(params)
              state = State.TopLevelContent
              break
            case /* I */ 73:
              cursorForwardTabulation(params)
              state = State.TopLevelContent
              break
            case /* J */ 74:
              eraseInDisplay(params)
              state = State.TopLevelContent
              break
            case /* K */ 75:
              eraseInLine(params)
              state = State.TopLevelContent
              break
            case /* L */ 76:
              insertLines(params)
              state = State.TopLevelContent
              break
            case /* M */ 77:
              deleteLines(params)
              state = State.TopLevelContent
              break
            case /* P */ 80:
              deleteCharacters(params)
              state = State.TopLevelContent
              break
            case /* S */ 83:
              scrollUp(params)
              state = State.TopLevelContent
              break
            case /* T */ 84:
              scrollDown(params)
              state = State.TopLevelContent
              break
            case /* X */ 88:
              eraseCharacters(params)
              state = State.TopLevelContent
              break
            case /* Z */ 90:
              cursorBackwardTabulation(params)
              state = State.TopLevelContent
              break
            case /* ` */ 96:
              characterPositionAbsolute(params)
              state = State.TopLevelContent
              break
            case /* a */ 97:
              characterPositionRelative(params)
              state = State.TopLevelContent
              break
            case /* b */ 98:
              repeatPrecedingGraphicCharacter(params)
              state = State.TopLevelContent
              break
            case /* d */ 100:
              linePositionAbsolute(params)
              state = State.TopLevelContent
              break
            case /* e */ 101:
              linePositionRelative(params)
              state = State.TopLevelContent
              break
            case /* f */ 102:
              horizontalAndVerticalPosition(params)
              state = State.TopLevelContent
              break
            case /* g */ 103:
              tabClear(params)
              state = State.TopLevelContent
              break
            case /* h */ 104:
              setMode(params)
              state = State.TopLevelContent
              break
            case /* l */ 108:
              resetMode(params)
              state = State.TopLevelContent
              break
            case /* m */ 109:
              setCharAttributes(params)
              state = State.TopLevelContent
              break
          }
          i++
          break
        case State.AfterEscape3:
          switch (array[i]) {
            case /* ; */ 59:
              paramsPush()
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
              paramsPush()
              cursorUp(params)
              state = State.TopLevelContent
              break
            case /* B */ 66:
              paramsPush()
              cursorDown(params)
              state = State.TopLevelContent
              break
            case /* C */ 67:
              paramsPush()
              cursorRight(params)
              state = State.TopLevelContent
              break
            case /* D */ 68:
              paramsPush()
              cursorLeft(params)
              state = State.TopLevelContent
              break
            case /* E */ 69:
              paramsPush()
              cursorNextLine(params)
              state = State.TopLevelContent
              break
            case /* F */ 70:
              paramsPush()
              cursorPrecedingLine(params)
              state = State.TopLevelContent
              break
            case /* G */ 71:
              paramsPush()
              cursorCharacterAbsolute(params)
              state = State.TopLevelContent
              break
            case /* H */ 72:
              paramsPush()
              cursorPosition(params)
              state = State.TopLevelContent
              break
            case /* I */ 73:
              paramsPush()
              cursorForwardTabulation(params)
              state = State.TopLevelContent
              break
            case /* J */ 74:
              paramsPush()
              eraseInDisplay(params)
              state = State.TopLevelContent
              break
            case /* K */ 75:
              paramsPush()
              eraseInLine(params)
              state = State.TopLevelContent
              break
            case /* L */ 76:
              paramsPush()
              insertLines(params)
              state = State.TopLevelContent
              break
            case /* M */ 77:
              paramsPush()
              deleteLines(params)
              state = State.TopLevelContent
              break
            case /* P */ 80:
              paramsPush()
              deleteCharacters(params)
              state = State.TopLevelContent
              break
            case /* S */ 83:
              paramsPush()
              scrollUp(params)
              state = State.TopLevelContent
              break
            case /* T */ 84:
              paramsPush()
              scrollDown(params)
              state = State.TopLevelContent
              break
            case /* X */ 88:
              paramsPush()
              eraseCharacters(params)
              state = State.TopLevelContent
              break
            case /* Z */ 90:
              paramsPush()
              cursorBackwardTabulation(params)
              state = State.TopLevelContent
              break
            case /* ` */ 96:
              paramsPush()
              characterPositionAbsolute(params)
              state = State.TopLevelContent
              break
            case /* a */ 97:
              paramsPush()
              characterPositionRelative(params)
              state = State.TopLevelContent
              break
            case /* b */ 98:
              paramsPush()
              repeatPrecedingGraphicCharacter(params)
              state = State.TopLevelContent
              break
            case /* d */ 100:
              paramsPush()
              linePositionAbsolute(params)
              state = State.TopLevelContent
              break
            case /* e */ 101:
              paramsPush()
              linePositionRelative(params)
              state = State.TopLevelContent
              break
            case /* f */ 102:
              paramsPush()
              horizontalAndVerticalPosition(params)
              state = State.TopLevelContent
              break
            case /* g */ 103:
              paramsPush()
              tabClear(params)
              state = State.TopLevelContent
              break
            case /* h */ 104:
              paramsPush()
              setMode(params)
              state = State.TopLevelContent
              break
            case /* l */ 108:
              paramsPush()
              resetMode(params)
              state = State.TopLevelContent
              break
            case /* m */ 109:
              paramsPush()
              setCharAttributes(params)
              state = State.TopLevelContent
              break
            default:
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
              state = State.AfterEscape3
              break
          }
          i++
          break
      }
    }
  }
  return parse
}

// const demo = () => {
//   const input = `\x1B[?25h`
//   createParse({
//     cursorDown: () => console.log('cursor down'),
//     cursorNextLine: () => console.log('cursor next line'),
//     cursorCharacterAbsolute: () => console.log('cursor character absolute'),
//     setCharAttributes: (params) => console.log('set char attributes', params),
//     cursorShow: () => console.log('cursor show'),
//   })(new Uint8Array(Buffer.from(input, 'utf-8')))
// }

// demo()
