import { createOffscreenTerminalDom } from "/src/index.js";

const root = document.getElementById("Terminal");
const { offscreenCanvasCursor, offscreenCanvasText, focusTextArea } =
  createOffscreenTerminalDom(root, {});
const workerUrl = new URL("./worker.js", import.meta.url).toString();
const worker = new Worker(workerUrl, {
  type: "module",
});

const handleMessage = (event) => {
  console.log(event);
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
