import { createTerminal } from "/src/createTerminal.js";

// commands
const commands = Object.create(null);

const registerCommand = (commandId, listener) => {
  commands[commandId] = listener;
};

const executeCommand = (commandId, ...args) => {
  commands[commandId](...args);
};

// websocket
// const protocol = location.protocol === "https:" ? "wss://" : "ws://";
// const hostname = location.hostname;
// const port = location.port;
const webSocket = new WebSocket(`ws://localhost:3000`);

webSocket.onmessage = ({ data }) => {
  const [commandId, ...args] = JSON.parse(data);
  executeCommand(commandId, ...args);
};

const webSocketSend = (data) => {
  switch (webSocket.readyState) {
    case webSocket.OPEN:
      webSocket.send(JSON.stringify(data));
      break;
    case webSocket.CONNECTING:
      webSocket.addEventListener("open", () => {
        webSocketSend(data);
      });
      break;
    default:
      console.warn("sending data to websocket failed");
      break;
  }
};

// terminal
const terminals = Object.create(null);

const terminalCreate = (root, id) => {
  terminals[id] = createTerminal(root, {
    handleInput(transformedKey) {
      webSocketSend([
        /* terminalWrite */ 102,
        /* id */ id,
        /* key */ transformedKey,
      ]);
    },
  });
  webSocketSend([/* terminalCreate */ 101, /* id */ id]);
};

const terminalWrite = (id, data) => {
  console.log({ data });
  const encoded = new TextEncoder().encode(data);
  terminals[id].write(encoded);
};

const terminalDispose = () => {
  delete terminals[id];
};

registerCommand(1, terminalCreate);
registerCommand(2, terminalWrite);
registerCommand(3, terminalDispose);

// initialize app
executeCommand(
  /* terminalCreate */ 1,
  /* root */ document.getElementById("Terminal"),
  /* id */ 1
);
