import { CHAR_HEIGHT, CHAR_WIDTH } from "../CharSize/CharSize.js";

export const supportsOffscreenCanvas = (() => {
  try {
    const canvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT);
    canvas.getContext("2d");
    return true;
  } catch {
    return false;
  }
})();
