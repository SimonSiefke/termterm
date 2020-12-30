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
  tokens.push({
    type: 'eraseToEndOfLine',
  })
}

const eraseInDisplay2 = () => {
  x = 0
  y = 0
  tokens.push({
    type: 'eraseInDisplay2',
  })
}

const setCharAttributes = (params) => {
  tokens.push({
    type: 'setCharAttributes',
    params,
  })
  // console.warn('setCharAttributes not implemented')
}

const cursorUp = () => {
  console.warn('cursorUp not implemented')
}

const cursorDown = () => {
  console.warn('cursorDown not implemented')
}

const cursorRight = () => {
  x++
  // renderCursor(x, y)
  // console.warn('cursorRight not implemented')
}

const cursorLeft = () => {
  console.warn('cursorLeft not implemented')
}

const backspace = () => {
  x--
  tokens.push({
    type: 'backspace',
  })
}

const playBellAudio = () => {
  const audio = document.createElement('audio')
  audio.src = `https://raw.githubusercontent.com/ubuntu/yaru/master/sounds/src/stereo/bell.oga`
  audio.play()
}

const bell = () => {
  playBellAudio()
}

// let $Span = document.createElement('span')
// $Output.append($Span)

const newline = () => {
  x = 0
  y++
  tokens.push({
    type: 'newline',
  })
}

const decodeText = (text) => {
  const decoder = new TextDecoder('utf-8')
  return decoder.decode(text)
}

const print = (startIndex, endIndex) => {
  const text = decodeText(uint8Array.slice(startIndex, endIndex))
  tokens.push({
    type: 'print',
    text,
  })
  x += text.length
}

let uint8Array

const tokens = []

let $Span

const renderBuffer = (tokens) => {
  console.log(tokens)
  let $Rows = document.createDocumentFragment()
  for (const token of tokens) {
    switch (token.type) {
      case 'print':
        $Span = $Span || document.createElement('span')
        $Span.textContent = $Span.textContent.slice(0, x - 1) + token.text
        break
      case 'newline':
        $Rows.append($Span)
        $Span = undefined
        break
      case 'eraseInDisplay2':
        $Output.textContent = ''
        $Span = document.createElement('span')
        $Rows = document.createDocumentFragment()
        // TODO remove rows
        // TODO clear output
        break
      case 'eraseToEndOfLine':
        if ($Span) {
          $Span.textContent = $Span.textContent.slice(0, x)
        }
        break
      case 'setCharAttributes':
        $Span = $Span || document.createElement('span')
        $Span.style.color = 'red'
        console.log('set char attributes')
        console.log(token)
        break
      default:
        break
    }
  }
  if ($Span) {
    $Rows.append($Span)
  }
  tokens.length = 0
  $Output.append($Rows)
}

const columnWidth = 8.43332
const rowHeight = 14
const renderCursor = (x, y) => {
  $Cursor.style.transform = `translate(${(x - 1) * columnWidth}px,${
    y * rowHeight
  }px)`
}

const pendingBuffers = []

let scheduled = false

const scheduleUpdate = () => {
  if (scheduled) {
    return
  }
  scheduled = true
  requestIdleCallback(() => {
    const buffer = pendingBuffers.shift()
    uint8Array = new Uint8Array(buffer)

    const previousX = x
    const previousY = y
    const s = performance.now()
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
    const e = performance.now()
    console.log(`took ${e - s}ms`)

    // console.log({ x, y })
    // send to renderer: lines/tokens
    renderBuffer(tokens)
    tokens.length = 0
    if (previousX !== x || previousY !== y) {
      // send to renderer: x,y
      renderCursor(x, y)
    }
    scheduled = false
    if (pendingBuffers.length) {
      scheduleUpdate()
    }
  })
}

webSocket.onmessage = async ({ data }) => {
  console.log({ data: await data.text() })
  console.log({ array: new Uint8Array(await data.arrayBuffer()) })
  const buffer =
    webSocket.binaryType === 'arraybuffer' ? data : await data.arrayBuffer()
  pendingBuffers.push(buffer)
  scheduleUpdate()
}

window.addEventListener('paste', (event) => {
  const text = event.clipboardData.getData('text')
  webSocket.send(text)
})

const $Cursor = document.getElementById('Cursor')

let x = 0
let y = 0

window.addEventListener('keydown', handleKeyDown(webSocket))
