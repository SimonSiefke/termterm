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

  // setTimeout(() => {
  //   readStream.write('echo "hello world"\n')
  // }, 1250)
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
