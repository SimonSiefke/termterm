import { createTerminal } from './lib/createTerminal.js'

const wsProtocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
const webSocket = new WebSocket(`${wsProtocol}//${location.host}`)
webSocket.binaryType = 'arraybuffer'

const init = ({ canvas }) => {
  const bell = () => {
    postMessage({ command: 'bell' })
  }
  const terminal = createTerminal(canvas, { bell })
  const handleMessage = ({ data }) => terminal.write(new Uint8Array(data))
  webSocket.onmessage = handleMessage

  // drawLines(['a', 'b', 'c'])

  // loop()
}

onmessage = ({ data }) => {
  switch (data.command) {
    case 'init':
      init(data)
      self.visibleCacheCtx = data.cacheCanvas.getContext('2d')
      data.cacheCanvas.width = 1000
      data.cacheCanvas.height = 1000
      break
    case 'send':
      webSocket.send(data.text)
      break
  }
}
