import express from 'express'
import { forkPtyAndExecvp } from 'fork-pty'
import http from 'http'
import * as net from 'net'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import WebSocket from 'ws'

class PipeSocket extends net.Socket {
  constructor(fd) {
    // @ts-ignore
    const pipeWrap = process.binding('pipe_wrap')
    const handle = new pipeWrap.Pipe(pipeWrap.constants.SOCKET)
    handle.open(fd)
    // @ts-ignore
    super({ handle })
  }
}

const createPtyStream = () => {
  const fd = forkPtyAndExecvp('bash', ['bash', '-i'])
  const socket = new PipeSocket(fd)
  return socket
}

// commands
const commands = Object.create(null)

const registerCommand = (commandId, listener) => {
  commands[commandId] = listener
}

const executeCommand = (commandId, ...args) => {
  commands[commandId](...args)
}

// terminal
const terminals = Object.create(null)

const terminalCreate = (socket, id) => {
  const ptyStream = createPtyStream()
  terminals[id] = ptyStream
  const handleData = (data) => {
    socket.send(
      JSON.stringify([/* terminalWrite */ 2, /* id */ id, /* data */ data]),
    )
  }

  ptyStream.on('data', handleData)
}

const terminalWrite = (socket, id, data) => {
  terminals[id].write(data)
}

const terminalDispose = (socket, id) => {
  terminals[id].dispose()
  delete terminals[id]
}

registerCommand(101, terminalCreate)
registerCommand(102, terminalWrite)
registerCommand(103, terminalDispose)

// server
const app = express()

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use('/src', express.static(`${__dirname}/../src`))
app.use('/css', express.static(`${__dirname}/../css`))
app.use(express.static(__dirname))

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

wss.on('connection', (socket) => {
  socket.on('message', (message) => {
    if (typeof message !== 'string') {
      return
    }
    const [commandId, ...args] = JSON.parse(message)
    executeCommand(commandId, socket, ...args)
  })
})

const PORT = parseInt(process.env.PORT) || 5555

const HOST = PORT === 5555 ? 'localhost' : undefined

server.listen(PORT, HOST)
