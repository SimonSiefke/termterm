import { handleKeyDown } from './handleKeyDown.js'
import { parseArray } from './parseArray.js'

const $Output = document.getElementById('Output')

const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
const webSocket = new WebSocket(`${wsProtocol}//${location.host}`, ['tty'])
// TODO enable on prod
// webSocket.binaryType = 'arraybuffer'

webSocket.onopen = () => {
  console.log('open')
}

const goToHome = () => {
  console.warn('goToHome not implemented')
}

const eraseToEndOfLine = () => {
  $Span.textContent = $Span.textContent.slice(0, x)
}

const eraseInDisplay2 = () => {
  $Output.textContent = ''
  $Span = document.createElement('span')
  $Output.append($Span)
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
  x++
  renderCursor(x, y)
  console.warn('cursorRight not implemented')
}

const cursorLeft = () => {
  console.warn('cursorLeft not implemented')
}

const backspace = () => {
  x--
}

const bell = () => {
  alert('ding')
}

let $Span = document.createElement('span')
// $Output.append($Span)

const newline = () => {
  $Span = document.createElement('span')
  $Output.append($Span)
  // $Span.textContent += '\n'
}

const decodeText = (text) => {
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(text)
}

const print = (startIndex, endIndex) => {
  const text = decodeText(uint8Array.slice(startIndex, endIndex))
  console.log({ text })
  console.log(x)
  $Span.textContent = $Span.textContent.slice(0, x) + text
  x = $Span.textContent.length
  y = $Output.childNodes.length - 1

  // console.log({ offset })
  // window.scrollTo(0, document.body.scrollHeight)
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

  renderCursor(x, y)
  // printBuffer()
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

// const $Input = document.getElementById('Input')
// window.onclick = () => {
// $Input.focus()
// }

const $Cursor = document.getElementById('Cursor')

let x = 0
let y = 0

const columnWidth = 8.43332
const rowHeight = 14
const renderCursor = (x, y) => {
  $Cursor.style.transform = `translate(${(x - 1) * columnWidth}px, ${
    y * rowHeight
  }px)`
  $Cursor.dataset.x = x
  $Cursor.dataset.y = y
  console.log('render cursor')
}

// window.addEventListener('keydown', (event) => {
//   console.log(event)
//   switch (event.key) {
//     case 'ArrowLeft':
//       // go left
//       x--
//       renderCursor(x, y)
//       break
//     case 'ArrowRight':
//       // go right
//       x++
//       renderCursor(x, y)
//       break
//     case 'ArrowDown':
//       y++
//       renderCursor(x, y)
//       break
//     case 'ArrowUp':
//       y--
//       renderCursor(x, y)
//       break
//   }
// })

window.addEventListener('keydown', handleKeyDown(webSocket))

// $Input.onbeforeinput = handleBeforeInput(webSocket)
