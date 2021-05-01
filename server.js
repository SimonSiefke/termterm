import express from 'express'
import { forkPtyAndExecvp } from 'fork-pty'
import http from 'http'
import * as net from 'net'
import WebSocket from 'ws'

class PipeSocket extends net.Socket {
  constructor(fd) {
    const pipeWrap = process.binding('pipe_wrap')
    const handle = new pipeWrap.Pipe(pipeWrap.constants.SOCKET)
    handle.open(fd)
    super({ handle })
  }
}

const buffer = (fn, delay) => {
  let pending = Buffer.from('')
  let state = 'default'
  const handlePendingData = () => {
    if (pending.length > 0) {
      fn(pending)
      pending = Buffer.from('')
      setTimeout(handlePendingData, delay)
      state = 'justSent'
    } else {
      state = 'default'
    }
  }
  const bufferedFn = (data) => {
    // console.log({ data: data.toString() })
    switch (state) {
      case 'default':
        fn(data)
        state = 'justSent'
        setTimeout(handlePendingData, delay)
        break
      case 'justSent':
        pending = Buffer.concat([pending, data])
        state = 'waiting'
        break
      case 'waiting':
        pending = Buffer.concat([pending, data])
        break
      default:
        break
    }
  }
  return bufferedFn
}

const createPtyStream = () => {
  const fd = forkPtyAndExecvp('bash', ['bash', '-i'])
  const socket = new PipeSocket(fd)
  return socket
}

const app = express()

app.use(express.static('public'))

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

wss.on('connection', (socket) => {
  const ptyStream = createPtyStream()
  const handleData = (data) => socket.send(data)
  const handleMessage = (data) => ptyStream.write(data)
  const handleError = (error) => {
    console.error(error)
    socket.close()
  }
  const handleClose = () => {
    ptyStream.destroy()
  }
  ptyStream.on('data', buffer(handleData, 8))
  socket.on('message', handleMessage)
  socket.on('error', handleError)
  socket.on('close', handleClose)
})

console.log(process.env.NODE_ENV)
const PORT = parseInt(process.env.PORT) || 5555

server.listen(PORT, 'localhost')

// server.listen(5555)
