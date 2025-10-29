import { CHAR_HEIGHT, CHAR_WIDTH } from "./parts/CharSize/CharSize.js";
import { supportsOffscreenCanvas } from "./parts/SupportsOffscreenCanvas/SupportsOffscreenCanvas.js";
import { supportsTransferToImageBitMap } from "./parts/SupportsTransferToImageBitMap/SupportsTransferToImageBitMap.js";

const tmpCanvas = supportsOffscreenCanvas
  ? new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
  : (() => {
      const canvas = document.createElement("canvas");
      canvas.width = CHAR_WIDTH;
      canvas.height = CHAR_HEIGHT;
      return canvas;
    })();

const tmpCtx = tmpCanvas.getContext("2d", {
  // desynchronized: true, // perf
  alpha: false, // perf
});

const bitmapCache = Object.create(null);

export const createDrawLines = (
  canvas,
  lines,
  bufferLines,
  offsets,
  attributes,
  rows,
  cols,
  defaultBackground,
  defaultForeground
) => {
  const ctx = canvas.getContext("2d", {
    // desynchronized: true, // perf
    alpha: false, // perf
  });
  ctx.fillStyle = defaultBackground;

  const drawChar = (char, x, y, background, foreground) => {
    if (char === " " && background === defaultBackground) {
      return;
    }
    const cacheKey = `${char}${background}${foreground}`;
    if (!(cacheKey in bitmapCache)) {
      tmpCtx.fillStyle = background;
      tmpCtx.fillRect(0, 0, CHAR_WIDTH, CHAR_HEIGHT);
      tmpCtx.font = `${CHAR_HEIGHT}px monospace`;
      tmpCtx.fillStyle = foreground;
      tmpCtx.fillText(char, 0, CHAR_HEIGHT);
      bitmapCache[cacheKey] = supportsTransferToImageBitMap()
        ? tmpCanvas.transferToImageBitmap()
        : tmpCtx.getImageData(0, 0, CHAR_WIDTH, CHAR_HEIGHT);
    }
    supportsTransferToImageBitMap()
      ? ctx.drawImage(bitmapCache[cacheKey], x * CHAR_WIDTH, y * CHAR_HEIGHT)
      : ctx.putImageData(
          bitmapCache[cacheKey],
          x * CHAR_WIDTH,
          y * CHAR_HEIGHT
        );
  };

  const getChars = (y) => {
    const text = new TextDecoder().decode(lines[y].subarray(0, offsets[y]));
    const chars = [...text];
    return chars;
  };

  const drawLine = (bufferY, positionY) => {
    let x = -1;
    const chars = getChars(bufferY);
    // const chars = lines[y]
    const attributesOnLine = attributes[bufferY] || {};
    let currentAttributes = {
      foreground: defaultForeground,
      background: defaultBackground,
    };
    while (++x < chars.length) {
      currentAttributes = attributesOnLine[x] || currentAttributes;
      // const { char, background, foreground } = chars[x]
      const char = chars[x];
      const background = currentAttributes.background || defaultBackground;
      const foreground = currentAttributes.foreground || defaultForeground;
      drawChar(char, x, positionY, background, foreground);
    }
  };

  const rnd = () => Math.floor(Math.random() * 16777215).toString(16);

  const clearLines = (x, y, width, height) => {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillRect(
      x * CHAR_WIDTH,
      y * CHAR_HEIGHT,
      width * CHAR_WIDTH,
      height * CHAR_HEIGHT
    );
  };

  const drawLines = (start, end, bufferYEnd) => {
    // // console.log('draw all lines')
    // console.log({ start, end })
    // console.log({ bufferYEnd })
    clearLines(0, start, cols, end - start);
    if (bufferYEnd < rows) {
      for (let i = 0; i < rows - bufferYEnd; i++) {
        drawLine(bufferLines - i - 1, rows - i);
      }
      for (let i = 0; i < bufferYEnd + 1; i++) {
        drawLine(i, rows - (bufferYEnd - i));
      }
    } else {
      for (let i = 0; i < rows; i++) {
        drawLine(bufferYEnd - i, rows - i);
      }
    }
  };

  return drawLines;
};
