import { forkPtyAndExecvp } from 'fork-pty'
import { ReadStream } from 'tty'
import WebSocket from 'ws'
import express from 'express'
import http from 'http'

const nextId = (() => {
  let id = 0
  return () => id++
})()

const createTerminal = () => {
  const fd = forkPtyAndExecvp('bash', ['bash', '-i'])

  const readStream = new ReadStream(fd, { readable: true, writable: true })

  // readStream.on('data', (data) => {
  //   console.log({ data: data.toString() })
  // })
  return readStream
}

const app = express()

app.use(express.static('public'))

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

const terminals = Object.create(null)

wss.on('connection', (socket) => {
  const readStream = createTerminal()
  readStream.on('data', (data) => {
    console.log({ data })
    socket.send(data)
  })
  socket.on('message', (data) => {
    console.log({ data })
  })
  socket.on('close', () => {})
})

server.listen(5555)
