import { forkPtyAndExecvp } from "fork-pty";
import fs from "fs";
import http from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

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
  } else if (req.method === "GET" && req.url.startsWith("/src")) {
    res.writeHead(200, {
      "Content-Type": "text/javascript",
    });
    fs.createReadStream(`${__dirname}/..${req.url}`).pipe(res);
  } else if (req.method === "GET" && req.url.startsWith("/css")) {
    res.writeHead(200, {
      "Content-Type": "text/css",
    });
    fs.createReadStream(`${__dirname}/..${req.url}`).pipe(res);
  } else {
    res.statusCode = 404;
    res.end("not found");
  }
});

const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("got con");
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

server.listen(3000, () => console.log(`listening on http://localhost:3000`));
