import { CHAR_WIDTH, CHAR_HEIGHT } from "../CharSize/CharSize.js";
import { supportsOffscreenCanvas } from "../SupportsOffscreenCanvas/SupportsOffscreenCanvas.js";

const supportsTransferToImageBitMapInternal = () => {
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
          // @ts-ignore
          canvas.transferToImageBitmap();
        })();
    return true;
  } catch {
    return false;
  }
};

let cachedValue = undefined;

export const supportsTransferToImageBitMap = () => {
  if (cachedValue === undefined) {
    cachedValue = supportsTransferToImageBitMapInternal();
  }
  return cachedValue;
};
