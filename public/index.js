import { createTerminal } from './lib/createTerminal.js'

const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
const webSocket = new WebSocket(`${wsProtocol}//${location.host}`)
webSocket.binaryType = 'arraybuffer'

const bell = () => {
  const audio = document.createElement('audio')
  audio.src = `https://raw.githubusercontent.com/ubuntu/yaru/master/sounds/src/stereo/bell.oga`
  audio.play()
}

const setWindowTitle = (title) => {
  document.title = title
}

const handleInput = (transformedKey) => {
  webSocket.send(transformedKey)
}

const __initialize__ = () => {
  const root = document.getElementById('Terminal')
  const terminal = createTerminal(root, { bell, setWindowTitle, handleInput })
  webSocket.onmessage = ({ data }) => terminal.write(new Uint8Array(data))

  // TODO maybe api like
  // terminal.mount(someElement)
}

__initialize__()
