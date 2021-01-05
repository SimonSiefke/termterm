import { forkPtyAndExecvp } from 'fork-pty'
import { ReadStream } from 'tty'
import WebSocket from 'ws'
import express from 'express'
import http from 'http'
import * as net from 'net'

const nextId = (() => {
  let id = 0
  return () => id++
})()

class PipeSocket extends net.Socket {
  constructor(fd) {
    const pipeWrap = process.binding('pipe_wrap')
    const handle = new pipeWrap.Pipe(pipeWrap.constants.SOCKET)
    handle.open(fd)
    super({ handle })
  }
}

const createHandleData = (webSocket, delay) => {
  let pending = Buffer.from('')
  let state = 'default'
  const handlePendingData = () => {
    if (pending.length > 0) {
      webSocket.send(pending)
      pending = Buffer.from('')
      setTimeout(handlePendingData, delay)
      state = 'justSent'
    } else {
      state = 'default'
    }
  }
  const sendBuffer = (data) => {
    switch (state) {
      case 'default':
        webSocket.send(data)
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
  return sendBuffer
}

const createTerminal = () => {
  const fd = forkPtyAndExecvp('bash', ['bash', '-i'])
  const socket = new PipeSocket(fd)

  // setTimeout(() => {
  //   readStream.write('echo "hello world"\n')
  // }, 1250)
  return socket
}

const app = express()

app.use(express.static('public'))

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

const terminals = Object.create(null)

wss.on('connection', (socket) => {
  const readStream = createTerminal()
  const handleData = createHandleData(socket, 8)
  readStream.on('data', handleData)
  socket.on('message', (data) => {
    console.log({ data })
    readStream.write(data)
  })
  socket.on('error', (error) => {
    console.error(error)
    socket.close()
  })
  socket.on('close', () => {
    readStream.destroy()
  })
})

server.listen(5555, 'localhost')

// server.listen(5555)
