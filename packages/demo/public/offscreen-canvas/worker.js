import { createOffscreenTerminal } from "/src/index.js";

const id = 123;

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

const terminalWrite = (id, data) => {
  console.log({ data });
  const encoded = new TextEncoder().encode(data);
  terminals[id].write(encoded);
};

registerCommand(2, terminalWrite);

const createTerminal = ({ offscreenCanvasCursor, offscreenCanvasText }) => {
  const terminal = createOffscreenTerminal({
    canvasCursor: offscreenCanvasCursor,
    canvasText: offscreenCanvasText,
  });
  terminals[id] = terminal;
  webSocketSend([/* terminalCreate */ 101, /* id */ id]);
  console.log({ offscreenCanvasCursor, offscreenCanvasText });
};

const handleMessage = (event) => {
  const message = event.data;
  if (message.method === "createTerminal") {
    createTerminal(message.params);
  } else {
    throw new Error(`unexpected message`);
  }
};

globalThis.onmessage = handleMessage;
