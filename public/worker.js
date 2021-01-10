import { createTerminal } from './lib/createTerminal.js'

const USE_NODE_PTY_SERVER = false

const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
const webSocket = USE_NODE_PTY_SERVER
  ? new WebSocket(`ws://${location.hostname}:4444`)
  : new WebSocket(`${wsProtocol}//${location.host}`)

webSocket.binaryType = 'arraybuffer'

const init = ({ canvasText, canvasCursor }) => {
  const bell = () => {
    postMessage({ command: 'bell' })
  }
  const setWindowTitle = (array, startIndex, endIndex) => {
    postMessage({
      command: 'setWindowTitle',
      title: new TextDecoder().decode(array.subarray(startIndex, endIndex)),
    })
  }
  const terminal = createTerminal(canvasText, canvasCursor, {
    bell,
    setWindowTitle,
  })
  const handleMessage = ({ data }) => terminal.write(new Uint8Array(data))
  webSocket.onmessage = handleMessage

  // drawLines(['a', 'b', 'c'])

  // loop()
}

onmessage = ({ data }) => {
  switch (data.command) {
    case 'init':
      init(data)
      break
    case 'send':
      webSocket.send(data.text)
      break
  }
}
