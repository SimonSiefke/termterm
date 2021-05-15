import express from 'express'
import { forkPtyAndExecvp } from 'fork-pty'
import http from 'http'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import WebSocket from 'ws'

const Command = {
  commands: Object.create(null),
  register(commandId, listener) {
    this.commands[commandId] = listener
  },
  execute(commandId, ...args) {
    this.commands[commandId](...args)
  },
}

const Terminal = {
  terminals: Object.create(null),
  create(socket, id) {
    const { socket: ptySocket } = forkPtyAndExecvp('bash', ['bash', '-i'])
    this.terminals[id] = ptySocket
    const handleData = (data) => {
      socket.send(
        JSON.stringify([/* terminalWrite */ 2, /* id */ id, /* data */ data]),
      )
    }
    ptySocket.on('data', handleData)
  },
  write(socket, id, data) {
    this.terminals[id].write(data)
  },
  dispose(socket, id) {
    this.terminals[id].dispose()
    delete this.terminals[id]
  },
}

Command.register(101, Terminal.create)
Command.register(102, Terminal.write)
Command.register(103, Terminal.dispose)

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
    Command.execute(commandId, socket, ...args)
  })
})

server.listen(3000, () => console.log(`listening on http://localhost:3000`))
