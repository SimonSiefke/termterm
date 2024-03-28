import { createDrawCursor } from "./drawCursor.js";
import { createDrawLines } from "./drawLines.js";
import * as ParseArray from "./parts/ParseArray/ParseArray.js";
import * as TransformKey from "./parts/TransformKey/TransformKey.js";

const CHAR_WIDTH = 13;
const CHAR_HEIGHT = 15;

const COLS = 80;
const ROWS = 25;
const BUFFER_LINES = 200;

const noop = () => {};

export const createOffscreenTerminalDom = (
  root,
  {
    handleMouseDown = noop,
    handleKeyDown = noop,
    handleBlur = noop,
    canvasText = document.createElement("canvas"),
    canvasCursor = document.createElement("canvas"),
  }
) => {
  root.onmousedown = (event) => {
    event.preventDefault();
    textarea.focus();
    handleMouseDown();
  };
  canvasText.className = "TerminalCanvasText";
  canvasCursor.className = "TerminalCanvasCursor";
  const $Layers = document.createElement("div");
  $Layers.className = "TerminalLayers";
  const textarea = document.createElement("textarea");
  textarea.className = "TerminalTextArea";
  textarea.name = "terminal-input";
  $Layers.append(canvasText, canvasCursor);
  root.append(textarea, $Layers);
  const wrappedKeyDown = (event) => {
    // @ts-ignore
    handleKeyDown({
      key: event.key,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
    });
  };
  textarea.onkeydown = wrappedKeyDown;
  const handleBeforeInput = (event) => {
    event.preventDefault();
  };
  textarea.addEventListener("beforeinput", handleBeforeInput);
  textarea.onblur = handleBlur;
  const offscreenCanvasText =
    canvasText instanceof OffscreenCanvas
      ? canvasText
      : canvasText.transferControlToOffscreen();
  const offscreenCanvasCursor =
    canvasCursor instanceof OffscreenCanvas
      ? canvasCursor
      : canvasCursor.transferControlToOffscreen();

  const focusTextArea = () => {
    textarea.focus();
  };
  return {
    offscreenCanvasCursor,
    offscreenCanvasText,
    focusTextArea,
  };
};

export const createOffscreenTerminal = ({
  background = "#000000",
  foreground = "#ffffff",
  handleInput,
  bell = noop,
  setWindowTitle = noop,
  handleFocus = noop,
  canvasText,
  canvasCursor,
  focusTextArea = noop,
}) => {
  let focused = false;
  const handleKeyDown = (event) => {
    const transformedKey = TransformKey.transformKey(event);
    if (transformedKey) {
      handleInput(transformedKey);
    }
  };

  const handleBlur = () => {
    focused = false;
    cursorStyle = /* blur */ 4;
    requestAnimationFrame(render);
  };
  const focus = () => {
    handleFocus();
    if (focused) {
      return;
    }
    focused = true;
    cursorStyle = /* block */ 2;
    focusTextArea();
    requestAnimationFrame(render);
  };

  const WIDTH = COLS * CHAR_WIDTH;
  const HEIGHT = ROWS * (CHAR_HEIGHT + 10);
  canvasText.width = canvasCursor.width = WIDTH;
  canvasText.height = canvasCursor.height = HEIGHT;

  let bufferYEnd = ROWS;
  let cursorYRelative = -ROWS;
  let cursorXRelative = -COLS;
  let cellForeground = "#ffffff";
  let cellBackground = "#000000";
  let cursorVisible = true;
  let cursorStyle = /* block */ 2;
  const dirty = {
    start: 0,
    end: 0,
  };

  // self.stats = () => ({
  //   cursorYRelative,
  //   cursorXRelative,
  //   x: COLS + cursorXRelative,
  //   y: bufferYEnd + cursorYRelative,
  // });

  const lines = [];
  // self.lines = lines;

  const offsets = new Uint8Array(BUFFER_LINES);

  // self.offsets = offsets;
  let attributes = {};

  // self.attributes = attributes;

  for (let y = 0; y < BUFFER_LINES; y++) {
    lines.push(new Uint8Array(300));
  }

  const textDecoder = new TextDecoder();

  // self.printLines = () => {
  //   console.log(
  //     lines.map((line, y) => textDecoder.decode(line.subarray(0, offsets[y])))
  //   );
  // };

  const dirtyMark = (y) => {
    // console.log('dirty' + y)
    if (y < dirty.start) {
      dirty.start = y;
    } else if (y > dirty.end) {
      dirty.end = y;
    }
  };
  const dirtyClear = () => {
    // console.log('dirty clear')
    dirty.start = dirty.end = bufferYEnd + cursorYRelative;
  };

  const callbackFns = {
    eraseInLine() {
      const y = bufferYEnd + cursorYRelative;
      const x = COLS + cursorXRelative;
      offsets[y] = x;
    },
    eraseInDisplay() {
      // console.log('erase in display')
      offsets.fill(0);
      cursorYRelative = -ROWS + 1;
      cursorXRelative = -COLS;
      bufferYEnd = ROWS;
      for (const key of Object.keys(attributes)) {
        delete attributes[key];
      }
      dirtyMark(0);
      dirtyMark(ROWS);
    },
    setCharAttributes(params) {
      if (params[1] === 7) {
        [cellForeground, cellBackground] = [cellBackground, cellForeground];
      } else if (params[1] === 35) {
        cellForeground = "#8000ff";
      } else if (params[1] === 32) {
        cellForeground = "#09f900";
      } else if (params[1] === 34) {
        cellForeground = "#0090ff";
      } else {
        cellForeground = foreground;
        cellBackground = background;
      }
      const y = bufferYEnd + cursorYRelative;
      attributes[y] = attributes[y] || {};
      attributes[y][offsets[y]] = {
        foreground: cellForeground,
        background: cellBackground,
      };
    },
    cursorUp() {
      console.log("cursor up");
    },
    cursorDown() {
      //       console.log('cursor down')
    },
    cursorRight() {
      cursorXRelative++;
    },
    cursorLeft() {
      console.log("cursor left");
    },
    backspace() {
      cursorXRelative--;
      // offsets[bufferYEnd + cursorYRelative]--
    },
    deleteChars(numberOfChars) {
      const y = bufferYEnd + cursorYRelative;
      // offsets[y] = x - 1
      // cursorXRelative--
      const x = COLS + cursorXRelative;
      offsets[y] = x;
    },
    bell,
    print(array, start, end) {
      const subArray = array.subarray(start, end);
      const y = bufferYEnd + cursorYRelative;
      const x = COLS + cursorXRelative;
      lines[y].set(subArray, x);
      cursorXRelative += end - start;
      offsets[y] = COLS + cursorXRelative;
      dirtyMark(y);

      if (x >= COLS - 1) {
        // cursorYRelative++;
        // console.log("wrap");
        callbackFns.lineFeed();
      }
      // console.log("PRINT", { y, x, COLS, cursorXRelative, cursorYRelative });
      // self.printLines();
      // offsets[y] += end - start
      // cursorXRelative = -COLS + offsets[y]
    },
    lineFeed() {
      if (cursorYRelative === 0) {
        bufferYEnd = (bufferYEnd + 1) % BUFFER_LINES;
        offsets[bufferYEnd] = 0;
        delete attributes[bufferYEnd];
      } else {
        cursorYRelative++;
      }
      cellForeground = foreground;
      cellBackground = background;
    },
    carriageReturn() {
      cursorXRelative = -COLS;
    },
    setWindowTitle,
    cursorPosition(params) {
      if (params.length === 2) {
        const row = params[0];
        const column = params[1];
        cursorYRelative = -ROWS + row;
        cursorXRelative = -COLS + column;
      }
    },
    cursorShow() {
      cursorVisible = true;
    },
    cursorHide() {
      cursorVisible = false;
    },
    insertLines() {},
    deleteLines() {},
    setTextParameters() {},
    privateModeSet() {},
    privateModeReset() {},
    eraseToEndOfLine() {},
    goToHome() {},
    setGLevel() {},
    saveCursor() {},
    restoreCursor() {},
    index() {},
    tabSet() {},
    reverseIndex() {},
    keypadApplicationMode() {},
    keypadNumericMode() {},
    fullReset() {},
    nextLine() {},
    deleteCharacters() {},
    softTerminalReset() {},
    cursorNextLine() {},
    cursorPrecedingLine() {},
    cursorCharacterAbsolute() {},
    cursorForwardTabulation() {},
    cursorBackwardTabulation() {},
    scrollUp() {},
    scrollDown() {},
    eraseCharacters() {},
    characterPositionAbsolute() {},
    characterPositionRelative() {},
    repeatPrecedingGraphicCharacter() {},
    sendDeviceAttributesPrimary() {},
    sendDeviceAttributesTertiary() {},
    linePositionAbsolute() {},
    linePositionRelative() {},
    horizontalAndVerticalPosition() {},
    tabClear() {},
    setMode() {},
    resetMode() {},
    setCursorStyle() {},
    shiftLeftColumns() {},
    insertBlankCharacters() {},
  };

  // const parse = createParse(callbackFns);
  const drawLines = createDrawLines(
    canvasText,
    lines,
    BUFFER_LINES,
    offsets,
    attributes,
    ROWS,
    COLS,
    background,
    foreground
  );

  const drawCursor = createDrawCursor(canvasCursor);

  let scheduled = false;

  // self.drawLines = () => drawLines(dirty.start, dirty.end + 1);

  const render = () => {
    // console.log(dirty)
    drawLines(dirty.start, dirty.end + 1, bufferYEnd);
    const y = ROWS + cursorYRelative;
    const x = COLS + cursorXRelative;
    // TODO without closure
    drawCursor(x, y, cursorVisible, cursorStyle);
    scheduled = false;
    dirtyClear();
  };
  const write = (array) => {
    ParseArray.parseArray(array, callbackFns);
    // if (lines.length > 1_000) {
    //   lines.length = 1_000
    // }
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(render);
    }
  };

  const pasteText = (text) => {
    // TODO bug first line not written
    const fixedText = "\n" + text.replaceAll("\n", "\r\n");
    const array = new TextEncoder().encode(fixedText);
    write(array);
  };

  return {
    write,
    focus,
    pasteText,
    writeText: pasteText,
    // TODO should this be exposed (only used for testing) maybe with _ prefix (internal)
    lines,
    handleKeyDown,
    handleBlur,
    handleMouseDown: focus,
  };
};
