import { createTerminal } from '/lib/createTerminal.js'
import { createHandleKeyDown } from '/lib/handleKeyDown.js'

const USE_NODE_PTY_SERVER = true

const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
const webSocket = USE_NODE_PTY_SERVER
  ? new WebSocket(`ws://${location.hostname}:4444`)
  : new WebSocket(`${wsProtocol}//${location.host}`)

webSocket.binaryType = 'arraybuffer'

const bell = () => {
  const audio = document.createElement('audio')
  audio.src = `https://raw.githubusercontent.com/ubuntu/yaru/master/sounds/src/stereo/bell.oga`
  audio.play()
}

const canvas = document.getElementById('Canvas')
const terminal = createTerminal(canvas, { bell })
const handleMessage = ({ data }) => terminal.write(new Uint8Array(data))

const send = (text) => webSocket.send(text)

const handleKeyDown = createHandleKeyDown(send)
window.addEventListener('keydown', handleKeyDown)

webSocket.onmessage = handleMessage
