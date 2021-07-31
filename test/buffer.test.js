// tests based on https://github.com/xtermjs/xterm.js/blob/master/src/common/buffer/Buffer.test.ts
// by xterm.js authors (LICENSE MIT)

import * as Buffer from "../src/parts/Buffer.js";

// TODO test buffer resizing (e.g. when resize the text in the rows should adjust)
// also test buffer handling with emojis / weird chars

test.skip("wrap and unwrap lines", () => {
  const state = Buffer.create();
  Buffer.resize(state, 5, 10);
  state.lines[0] = "abcde";
  expect(state.lines[0]).toBe("abcde");
  Buffer.resize(state, 1, 10);
  expect(Buffer.prettyLines(state)).toEqual([
    "a",
    "b",
    "c",
    "d",
    "e",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);
  Buffer.resize(state, 5, 10);
  expect(state.lines).toEqual([
    "abcde",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);
});
