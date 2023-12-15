import { createOffscreenTerminalDom } from "/src/index.js";

const root = document.getElementById("Terminal");
const { offscreenCanvasCursor, offscreenCanvasText, focusTextArea } =
  createOffscreenTerminalDom(root, {
    handleKeyDown(event) {
      worker.postMessage({
        jsonrpc: "2.0",
        method: "handleKeyDown",
        params: {
          event,
        },
      });
    },
    handleBlur() {
      worker.postMessage({
        jsonrpc: "2.0",
        method: "handleBlur",
        params: {},
      });
    },
    handleMouseDown() {
      worker.postMessage({
        jsonrpc: "2.0",
        method: "handleMouseDown",
        params: {},
      });
    },
  });
const workerUrl = new URL("./worker.js", import.meta.url).toString();
const worker = new Worker(workerUrl, {
  type: "module",
});

const handleMessage = (event) => {
  console.log(event);
  const message = event.data;
  if (message.method === "focusTextArea") {
    focusTextArea();
  }
};
worker.onmessage = handleMessage;

worker.postMessage(
  {
    jsonrpc: "2.0",
    method: "createTerminal",
    params: {
      offscreenCanvasCursor,
      offscreenCanvasText,
    },
  },
  [offscreenCanvasCursor, offscreenCanvasText]
);
