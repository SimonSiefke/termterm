export const defaults = {
  charWidth: 13,
  charHeight: 15,
  foreground: "#ffffff",
  background: "#000000",
  cols: 80,
  rows: 25,
  bufferLines: 200,
};

export const create = ({ $Element, handleInput, handleBell }) => {
  const $CanvasText = document.createElement("canvas");
  $CanvasText.className = "TerminalCanvasText";
  const $CanvasCursor = document.createElement("canvas");
  $CanvasCursor.className = "TerminalCanvasCursor";
  const $Layers = document.createElement("div");
  $Layers.className = "Layers";
  const $TextArea = document.createElement("textarea");
  $TextArea.className = "TerminalTextArea";
  $Layers.append($CanvasText, $CanvasCursor);
  $Element.append($TextArea, $Layers);

  const state = {
    bufferYEnd: defaults.rows,
    rows: defaults.rows,
    cols: defaults.cols,
    cursorYRelative: -defaults.rows,
    cursorXRelative: -defaults.cols,
    foreground: defaults.foreground,
    background: defaults.background,
    cursorVisible: true,
    cursorStyle: /* block */ 2,
    offsets: [],
    attributes: {},
  };

  return state;
};

export const eraseInLine = (state) => {
  const y = state.bufferYEnd + state.cursorYRelative;
  const x = state.cols + state.cursorXRelative;
  state.offsets[y] = x;
};

export const dirtyMark = (state, y) => {
  if (y < state.dirty.start) {
    state.dirty.start = y;
  } else if (y > state.dirty.end) {
    state.dirty.end = y;
  }
};

export const dirtyClear = (state) => {
  state.dirty.start = state.dirty.end =
    state.bufferYEnd + state.cursorYRelative;
};

export const eraseInDisplay = (state) => {
  state.offsets.fill(0);
  state.cursorYRelative = -state.rows + 1;
  state.cursorXRelative = -state.cols;
  state.bufferYEnd = state.rows;
  for (const key of Object.keys(state.attributes)) {
    delete state.attributes[key];
  }
  dirtyMark(0);
  dirtyMark(state.rows);
};

export const setCharAttributes = (state, params) => {
  if (params[1] === 7) {
    const tmp = state.foreground;
    state.foreground = state.background;
    state.background = tmp;
  } else if (params[1] === 35) {
    state.foreground = "#8000ff";
  } else if (params[1] === 32) {
    state.foreground = "#09f900";
  } else if (params[1] === 34) {
    state.foreground = "#0090ff";
  } else {
    state.foreground = defaults.foreground;
    state.background = defaults.background;
  }
  const y = state.bufferYEnd + state.cursorYRelative;
  state.attributes[y] ||= Object.create(null);
  state.attributes[y][state.offsets[y]] = {
    foreground: state.foreground,
    background: state.background,
  };
};

export const cursorUp = (state) => {
  console.log("cursor up");
};

export const cursorDown = (state) => {};

export const cursorRight = (state) => {
  state.cursorXRelative++;
};

export const cursorLeft = (state) => {
  console.log("cursor left");
};

export const backspace = (state) => {
  state.cursorXRelative--;
};

export const deleteChars = (state, numberOfChars) => {
  const y = state.bufferYEnd + state.cursorYRelative;
  // offsets[y] = x - 1
  // cursorXRelative--
  const x = defaults.cols + state.cursorXRelative;
  state.offsets[y] = x;
};

export const bell = (state) => {};

export const lineFeed = (state) => {
  if (state.cursorYRelative === 0) {
    state.bufferYEnd = (state.bufferYEnd + 1) % defaults.bufferLines;
    state.offsets[state.bufferYEnd] = 0;
    delete state.attributes[state.bufferYEnd];
  } else {
    state.cursorYRelative++;
  }
  state.foreground = defaults.foreground;
  state.background = defaults.background;
};

export const carriageReturn = (state) => {
  state.cursorXRelative = -state.cols;
};

export const setWindowTitle = (state) => {};

export const cursorPosition = (state, params) => {
  if (params.length === 2) {
    const row = params[0];
    const column = params[1];
    state.cursorYRelative = -state.rows + row;
    state.cursorXRelative = -state.cols + column;
  }
};

export const cursorShow = (state) => {
  state.cursorVisible = true;
};

export const cursorHide = (state) => {
  state.cursorVisible = false;
};

export const insertLines = (state) => {};

export const deleteLines = (state) => {};

export const setTextParameters = (state) => {};

export const privateModeSet = (state) => {};

export const privateModeReset = (state) => {};

export const eraseToEndOfLine = (state) => {};

export const goToHome = (state) => {};

export const setGLevel = (state) => {};

export const saveCursor = (state) => {};

export const restoreCursor = (state) => {};

export const index = (state) => {};

export const tabSet = (state) => {};

export const reverseIndex = (state) => {};

export const keypadApplicationMode = (state) => {};

export const keypadNumericMode = (state) => {};

export const fullReset = (state) => {};

export const nextLine = (state) => {};

export const deleteCharacters = (state) => {};

export const softTerminalReset = (state) => {};

export const cursorNextLine = (state) => {};

export const cursorPrecedingLine = (state) => {};

export const cursorCharacterAbsolute = (state) => {};

export const cursorForwardTabulation = (state) => {};

export const cursorBackwardTabulation = (state) => {};

export const scrollUp = (state) => {};

export const scrollDown = (state) => {};

export const eraseCharacters = (state) => {};

export const characterPositionAbsolute = (state) => {};

export const characterPositionRelative = (state) => {};

export const repeatPrecedingGraphicCharacter = (state) => {};

export const sendDeviceAttributesPrimary = (state) => {};

export const sendDeviceAttributesTertiary = (state) => {};

export const linePositionAbsolute = (state) => {};

export const linePositionRelative = (state) => {};

export const horizontalAndVerticalPosition = (state) => {};

export const tabClear = (state) => {};

export const setMode = (state) => {};

export const resetMode = (state) => {};

export const setCursorStyle = (state) => {};

export const shiftLeftColumns = (state) => {};

export const insertBlankCharacters = (state) => {};

export const print = (state, array, start, end) => {
  const subArray = array.subarray(start, end);
  const y = state.bufferYEnd + state.cursorYRelative;
  const x = state.cols + state.cursorXRelative;
  state.lines[y].set(subArray, x);
  state.cursorXRelative += end - start;
  state.offsets[y] = state.cols + state.cursorXRelative;
  dirtyMark(y);

  if (x >= state.cols - 1) {
    lineFeed(state);
    // cursorYRelative++;
    // console.log("wrap");
  }
};

export const write = (state, array) => {
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
};

export const pasteText = (state, text) => {
  // TODO bug first line not written
  const fixedText = "\n" + text.replaceAll("\n", "\r\n");
  const array = new TextEncoder().encode(fixedText);
  write(array);
};

export const render = (state) => {};
