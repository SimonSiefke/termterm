import { parseArray } from './parseArray.js'
import { handleKeyDown } from './handleKeyDown.js'

const $Output = document.getElementById('Output')

const webSocket = new WebSocket(`ws://${location.host}`, ['tty'])
// TODO enable on prod
// webSocket.binaryType = 'arraybuffer'

webSocket.onopen = () => {
  console.log('open')
}

const goToHome = () => {
  console.warn('goToHome not implemented')
}

const eraseToEndOfLine = () => {
  console.warn('eraseToEndOfLine not implemented')
}

const eraseInDisplay2 = () => {
  $Output.textContent = ''
}

const setCharAttributes = () => {
  console.warn('setCharAttributes not implemented')
}

const cursorUp = () => {
  console.warn('cursorUp not implemented')
}

const cursorDown = () => {
  console.warn('cursorDown not implemented')
}

const cursorRight = () => {
  console.warn('cursorRight not implemented')
}

const cursorLeft = () => {
  console.warn('cursorLeft not implemented')
}

const backspace = () => {
  console.warn('backspace not implemented')
}

const bell = () => {
  alert('ding')
}

const newline = () => {
  $Output.textContent += '\n'
}

const decodeText = (text) => {
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(text)
}

const print = (startIndex, endIndex) => {
  $Output.textContent += decodeText(uint8Array.slice(startIndex, endIndex))
}

let uint8Array

webSocket.onmessage = async ({ data }) => {
  console.log({ data: await data.text() })
  console.log({ array: new Uint8Array(await data.arrayBuffer()) })
  const buffer =
    webSocket.binaryType === 'arraybuffer' ? data : await data.arrayBuffer()
  uint8Array = new Uint8Array(buffer)
  const parsed = parseArray(uint8Array, {
    goToHome,
    eraseToEndOfLine,
    eraseInDisplay2,
    setCharAttributes,
    cursorUp,
    cursorDown,
    cursorRight,
    cursorLeft,
    backspace,
    bell,
    print,
    newline,
  })
  // $Output.textContent += '\n'
  // console.log(parsed)
  // console.log(uint8Array)
  // $Output.textContent += await data.arrayBuffer()
  // $Output.textContent += '\n'
}

window.addEventListener('paste', (event) => {
  const text = event.clipboardData.getData('text')
  webSocket.send(text)
})

window.onkeydown = handleKeyDown(webSocket)
