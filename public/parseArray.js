const State = {
  TopLevelContent: 'TopLevelContent',
  AfterEscape1: 'AfterEscape1',
  AfterEscape2: 'AfterEscape2',
  AfterEscape3: 'AfterEscape3',
  AfterEscape4: 'AfterEscape4',
  AfterEscape3AfterSemicolon: 'AfterEscape3AfterSemicolon',
  AfterEscape3AfterSemicolon2: 'AfterEscape3AfterSemicolon2',
}

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
  } = {},
) => {
  let state = State.TopLevelContent
  let i = 0
  // let output = ``
  let currentParam
  let params = []
  // let printed = -1
  while (i < array.length) {
    // console.log(state)
    // console.log(array[i])
    switch (state) {
      case State.TopLevelContent:
        switch (array[i]) {
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
            print(array[i])
            // output += '\n'
            state = State.TopLevelContent
            i++
            break
          default:
            // if (printed === 0) {
            //   printed = i
            // } else {
            //   printed++
            // }
            // console.log('default')
            // output += String.fromCharCode(array[i])
            print(array[i])
            i++
            break
        }
        // console.log(array[i])
        break
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

// const input = `\u001b[0m  package.json  `

// const array = new Uint8Array(input.split('').map((x) => x.charCodeAt()))

// parseArray(array, {
//   eraseInDisplay2,
//   eraseToEndOfLine,
//   goToHome,
//   setCharAttributes,
//   cursorUp,
//   cursorDown,
//   cursorRight,
//   cursorLeft,
// }) //?
