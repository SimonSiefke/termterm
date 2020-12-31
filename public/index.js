import { handleKeyDown } from './handleKeyDown.js'
import { parseArray } from './parseArray.js'

const $Output = document.getElementById('Output')

const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
const webSocket = new WebSocket(`${wsProtocol}//${location.host}`, ['tty'])
// TODO enable on prod
// webSocket.binaryType = 'arraybuffer'

webSocket.onopen = () => {}

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

let tokens = []

let $Row

const renderBuffer = (tokens) => {
  let $Rows = document.createDocumentFragment()
  let $Span
  for (const token of tokens) {
    switch (token.type) {
      case 'print':
        $Row = $Row || document.createElement('div')
        $Span = $Span || document.createElement('span')
        $Span.textContent += token.text
        $Row.append($Span)
        $Span = undefined
        break
      case 'newline':
        $Row = document.createElement('div')
        $Rows.append($Row)
        break
      case 'eraseInDisplay2':
        $Output.textContent = ''
        $Row = document.createElement('div')
        $Rows = document.createDocumentFragment()
        // TODO remove rows
        // TODO clear output
        break
      case 'eraseToEndOfLine':
        $Row = $Output.childNodes[y]
        let total = -1
        $Row.childNodes.forEach((node) => {
          total += node.textContent.length
          if (total >= x) {
            console.log(node)
            console.log(total)
            console.log(x)
            if (total === x) {
              $Row.removeChild(node)
            } else {
              console.log('greater')
            }
          }
        })
        break
      case 'setCharAttributes':
        // if ($Span) {
        //   $Row.append($Span)
        // }
        $Span = document.createElement('span')
        let color = 'black'
        for (const param of token.params) {
          if (param === 32) {
            color = 'green'
          }
          if (param === 34) {
            color = 'blue'
          }
          if (param === 35) {
            color = 'purple'
          }
        }
        $Span.style.color = color
        break
      default:
        break
    }
  }
  if ($Row) {
    $Rows.append($Row)
  }
  tokens = []
  $Output.append($Rows)
}

const columnWidth = 8.43332
const rowHeight = 14
const renderCursor = (x, y) => {
  $Cursor.style.transform = `translate(${x * columnWidth}px,${y * rowHeight}px)`
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
    //     console.log(`took ${e - s}ms`)

    // console.log({ x, y })
    // send to renderer: lines/tokens
    renderBuffer(tokens)
    tokens = []
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
//   console.log(await data.text())
//   console.log(await data.arrayBuffer())
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
