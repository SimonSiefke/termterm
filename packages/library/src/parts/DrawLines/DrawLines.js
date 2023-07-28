import * as Config from "../Config/Config.js";

export const tmpCanvas = (() => {
  const canvas = document.createElement("canvas");
  canvas.width = Config.defaults.charWidth;
  canvas.height = Config.defaults.charHeight;
  return canvas;
})();

export const tmpCtx = tmpCanvas.getContext("2d", {
  // desynchronized: true, // perf
  alpha: false, // perf
});

export const bitmapCache = Object.create(null);

const drawChar = (state, char, x, y, background, foreground) => {
  if (char === " " && background === "#000000") {
    return;
  }
  const charWidth = Config.defaults.charWidth;
  const charHeight = Config.defaults.charHeight;
  const cacheKey = `${char}${background}${foreground}`;
  if (!(cacheKey in bitmapCache)) {
    tmpCtx.fillStyle = background;
    tmpCtx.fillRect(0, 0, charWidth, charHeight);
    tmpCtx.font = `${charHeight}px monospace`;
    tmpCtx.fillStyle = foreground;
    tmpCtx.fillText(char, 0, charHeight);
    bitmapCache[cacheKey] = tmpCtx.getImageData(0, 0, charWidth, charHeight);
  }
  state.ctx.putImageData(bitmapCache[cacheKey], x * charWidth, y * charHeight);
};

const getChars = (state, y) => {
  const text = new TextDecoder().decode(
    state.lines[y].subarray(0, state.offsets[y])
  );
  const chars = [...text];
  return chars;
};

export const drawLine = (state, bufferY, positionY) => {
  let x = -1;
  const chars = getChars(state, bufferY);
  // const chars = lines[y]
  const attributesOnLine = state.attributes[bufferY] || Object.create(null);
  let currentAttributes = {
    foreground: "#ffffff",
    background: "#000000",
  };
  while (++x < chars.length) {
    currentAttributes = attributesOnLine[x] || currentAttributes;
    // const { char, background, foreground } = chars[x]
    const char = chars[x];
    const background = currentAttributes.background || "#000000";
    const foreground = currentAttributes.foreground || "#ffffff";
    drawChar(char, x, positionY, background, foreground);
  }
};

export const clearLines = (state, x, y, width, height) => {
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  state.ctx.fillRect(
    x * state.charWidth,
    y * state.charHeight,
    width * state.charWidth,
    height * state.charHeight
  );
};

export const drawLines = (state, start, end, bufferYEnd) => {
  clearLines(0, start, state.cols, end - start);
  if (bufferYEnd < state.rows) {
    for (let i = 0; i < state.rows - bufferYEnd; i++) {
      drawLine(state.bufferLines - i - 1, state.rows - i);
    }
    for (let i = 0; i < bufferYEnd + 1; i++) {
      drawLine(i, state.rows - (bufferYEnd - i));
    }
  } else {
    for (let i = 0; i < state.rows; i++) {
      drawLine(bufferYEnd - i, state.rows - i);
    }
  }
};
