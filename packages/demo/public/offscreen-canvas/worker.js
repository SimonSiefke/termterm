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
  const encoded = new TextEncoder().encode(data);
  terminals[id].write(encoded);
};

registerCommand(2, terminalWrite);

const createTerminal = ({ offscreenCanvasCursor, offscreenCanvasText }) => {
  const terminal = createOffscreenTerminal({
    canvasCursor: offscreenCanvasCursor,
    canvasText: offscreenCanvasText,
    handleInput(transformedKey) {
      webSocketSend([
        /* terminalWrite */ 102,
        /* id */ id,
        /* key */ transformedKey,
      ]);
    },
    focusTextArea() {
      postMessage({
        jsonrpc: "2.0",
        method: "focusTextArea",
        params: {},
      });
    },
  });
  terminals[id] = terminal;
  webSocketSend([/* terminalCreate */ 101, /* id */ id]);
};

const handleKeyDown = ({ event }) => {
  const terminal = terminals[id];
  terminal.handleKeyDown(event);
};

const handleBlur = () => {
  const terminal = terminals[id];
  terminal.handleBlur();
};

const handleMouseDown = () => {
  const terminal = terminals[id];
  terminal.handleMouseDown();
};

const handleMessage = (event) => {
  const message = event.data;
  if (message.method === "createTerminal") {
    createTerminal(message.params);
  } else if (message.method === "handleKeyDown") {
    handleKeyDown(message.params);
  } else if (message.method === "handleMouseDown") {
    handleMouseDown();
  } else if (message.method === "handleBlur") {
    handleBlur();
  } else {
    throw new Error(`unexpected message`);
  }
};

globalThis.onmessage = handleMessage;
