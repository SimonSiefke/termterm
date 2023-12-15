import express from "express";
import http from "http";
import { spawn } from "node-pty";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..", "..");
const library = join(root, "packages", "library");
const publicFolder = join(root, "packages", "demo", "public");

const app = express();

app.use(express.static(__dirname));
app.use(express.static(root));
app.use(express.static(library));
app.use(express.static(publicFolder));

const Terminal = {
  terminals: Object.create(null),
  create(socket, id) {
    const ptySocket = spawn("bash", ["-i"], {});
    this.terminals[id] = ptySocket;
    const handleData = (data) => {
      socket.send(
        JSON.stringify([/* terminalWrite */ 2, /* id */ id, /* data */ data])
      );
    };
    ptySocket.on("data", handleData);
  },
  write(socket, id, data) {
    this.terminals[id].write(data);
  },
  dispose(socket, id) {
    this.terminals[id].dispose();
    delete this.terminals[id];
  },
  resize(socket, id, columns, rows) {
    // TODO
  },
};

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const [commandId, ...args] = JSON.parse(message.toString());
    switch (commandId) {
      case 101:
        Terminal.create(socket, ...args);
        break;
      case 102:
        Terminal.write(socket, ...args);
        break;
      case 103:
        Terminal.dispose(socket, ...args);
        break;
      default:
        break;
    }
  });
});

const handleListening = () => {
  console.log(`listening on http://localhost:3000`);
};

server.listen(3000, handleListening);
