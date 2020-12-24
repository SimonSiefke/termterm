const State = {
  TopLevelContent: 'TopLevelContent',
  AfterEscape1: 'AfterEscape1',
  AfterEscape2: 'AfterEscape2',
  AfterEscape3: 'AfterEscape3',
  AfterEscape3AfterSemicolon: 'AfterEscape3AfterSemicolon',
  AfterEscape3AfterSemicolon2: 'AfterEscape3AfterSemicolon2',
}

export const parseArray = (
  array,
  { eraseInDisplay2, eraseToEndOfLine, goToHome, setCharAttributes } = {},
) => {
  let state = State.TopLevelContent
  let i = 0
  let output = ``
  let currentParam
  let params = []
  while (i < array.length) {
    // console.log(array[i])
    switch (state) {
      case State.TopLevelContent:
        switch (array[i]) {
          case /* \u001b */ 27:
            state = State.AfterEscape1
            i++
            break
          default:
            output += String.fromCharCode(array[i])
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
          default:
            i++
            break
        }
        break
      case State.AfterEscape2:
        switch (array[i]) {
          case /* H */ 72:
            goToHome()
            state = State.TopLevelContent
            i++
            break
          case /* f */ 102:
            goToHome()
            i++
            break
          case /* K */ 75:
            eraseToEndOfLine()
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
            console.log('default')
            i++
            break
        }
        break
      case State.AfterEscape3:
        console.log('escape')
        console.log(array[i])
        switch (array[i]) {
          case /* ; */ 59:
            params.push(currentParam)
            console.log('do something')
            state = State.AfterEscape3AfterSemicolon
            i++
            break
          case /* J */ 74:
            eraseInDisplay2()
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
  return output
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

const input = `\u001b[0;35msimon`

parseArray(new Uint8Array(input.split('').map((x) => x.charCodeAt())), {
  eraseInDisplay2,
  eraseToEndOfLine,
  goToHome,
  setCharAttributes,
}) //?
