import express from 'express'
import { forkPtyAndExecvp } from 'fork-pty'
import http from 'http'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import WebSocket from 'ws'

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
  const { socket: ptySocket } = forkPtyAndExecvp('bash', ['bash', '-i'])
  terminals[id] = ptySocket
  const handleData = (data) => {
    socket.send(
      JSON.stringify([/* terminalWrite */ 2, /* id */ id, /* data */ data]),
    )
  }
  ptySocket.on('data', handleData)
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

const __dirname = dirname(fileURLToPath(import.meta.url))

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

server.listen(3000, () => console.log(`listening on http://localhost:3000`))
