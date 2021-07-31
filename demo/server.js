import { forkPtyAndExecvp } from "fork-pty";
import fs from "fs";
import http from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";
import WebSocket from "ws";

const __dirname = dirname(fileURLToPath(import.meta.url));

const Terminal = {
  terminals: Object.create(null),
  create(socket, id) {
    const { ptySocket } = forkPtyAndExecvp("bash", ["bash", "-i"]);
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

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    fs.createReadStream(`${__dirname}/index.html`).pipe(res);
  } else {
    res.statusCode = 404;
    res.end("not found");
  }
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    if (typeof message !== "string") {
      return;
    }
    const [commandId, ...args] = JSON.parse(message);
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

server.listen(3000, () => console.log(`listening on http://localhost:3000`));
