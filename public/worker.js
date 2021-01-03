import { createTerminal } from './lib/createTerminal.js'

const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
const webSocket = new WebSocket(`${wsProtocol}//${location.host}`)
webSocket.binaryType = 'arraybuffer'

const init = ({ canvas }) => {
  const terminal = createTerminal(canvas)
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
