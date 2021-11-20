import * as Terminal from "../src/parts/Terminal/Terminal.js";

const createTerminal = () => {
  const $Element = document.createElement("div");
  const handleInput = jest.fn();
  const state = Terminal.create({
    $Element,
    handleInput,
  });
  return state;
};

test("create", () => {
  const $Element = document.createElement("div");
  const handleInput = jest.fn();
  Terminal.create({
    $Element,
    handleInput,
  });
});

test("backspace", () => {
  const state = createTerminal();
  state.cursorXRelative = 10;
  Terminal.backspace(state);
  expect(state.cursorXRelative).toBe(9);
});

test("carriageReturn", () => {
  const state = createTerminal();
  state.cursorXRelative = 10;
  Terminal.carriageReturn(state);
  expect(state.cursorXRelative).toBe(-10);
});

test("setWindowTitle", () => {});

test("cursorDown", () => {});

test("cursorLeft", () => {});

test("cursorRight", () => {});

test("cursorUp", () => {});

test("dirtyClear", () => {});

test("dirtyMark", () => {});

test("eraseInDisplay", () => {});

test("eraseInLine", () => {});

test("setCharAttributes", () => {});

test("write", () => {});

test("focus", () => {});

test("pasteText", () => {});

test("writeText", () => {});
