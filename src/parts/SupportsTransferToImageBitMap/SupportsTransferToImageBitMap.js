import { CHAR_WIDTH, CHAR_HEIGHT } from "../CharSize/CharSize.js";
import { supportsOffscreenCanvas } from "../SupportsOffscreenCanvas/SupportsOffscreenCanvas.js";

export const supportsTransferToImageBitMap = (() => {
  try {
    supportsOffscreenCanvas
      ? (() => {
          const canvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT);
          canvas.getContext("2d");
          canvas.transferToImageBitmap();
        })()
      : (() => {
          const canvas = document.createElement("canvas");
          canvas.width = CHAR_WIDTH;
          canvas.height = CHAR_HEIGHT;
          canvas.transferToImageBitmap();
        })();
    return true;
  } catch {
    return false;
  }
})();
