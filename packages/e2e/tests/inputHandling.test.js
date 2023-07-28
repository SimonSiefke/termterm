// based on https://github.com/xtermjs/xterm.js/blob/master/test/api/InputHandler.api.ts

let terminal;

beforeEach(() => {
  terminal.clear();
});

const getLinesAsArray = (count) => {
  const lines = [];
  for (let i = 0; i < count; i++) {
    lines.push(terminal.getLine(i));
  }
  return lines;
};

test("ICH: Insert Ps (Blank) Character(s) (default = 1) - CSI Ps @", () => {
  // Default
  terminal.write("foo\\x1b[3D\\x1b[@\\n\\r");
  // Explicit
  terminal.write("bar\\x1b[3D\\x1b[4@");
  expect(getLinesAsArray(2)).toEqual([" foo", "    bar"]);
});

test("CUU: Cursor Up Ps Times (default = 1) - CSI Ps A", () => {
  // Default
  terminal.write("\\n\\n\\n\\n\x1b[Aa");
  // Explicit
  terminal.write("\x1b[2Ab");
  expect(getLinesAsArray(4)).toEqual(["", " b", "", "a"]);
});

test("CUD: Cursor Down Ps Times (default = 1) - CSI Ps B", () => {
  // Default
  terminal.write("\x1b[Ba");
  // Explicit
  terminal.write("\x1b[2Bb");
  expect(getLinesAsArray(4)).toEqual(["", "a", "", " b"]);
});

test("CUF: Cursor Forward Ps Times (default = 1) - CSI Ps C", () => {
  // Default
  terminal.write("\x1b[Ca");
  // Explicit
  terminal.write("\x1b[2Cb");
  expect(getLinesAsArray(1)).toEqual([" a  b"]);
});

test("CUB: Cursor Backward Ps Times (default = 1) - CSI Ps D", () => {
  // Default
  terminal.write("foo\x1b[Da");
  // Explicit
  terminal.write("\x1b[2Db");
  expect(getLinesAsArray(1)).toEqual(["fba"]);
});

test("CNL: Cursor Next Line Ps Times (default = 1) - CSI Ps E", () => {
  // Default
  terminal.write("\x1b[Ea");
  // Explicit
  terminal.write("\x1b[2Eb");
  expect(getLinesAsArray(4)).toEqual(["", "a", "", "b"]);
});

test("CPL: Cursor Preceding Line Ps Times (default = 1) - CSI Ps F", () => {
  // Default
  terminal.write("\\n\\n\\n\\n\x1b[Fa");
  // Explicit
  terminal.write("\x1b[2Fb");
  expect(getLinesAsArray(5)).toEqual(["", "b", "", "a", ""]);
});

test("CHA: Cursor Character Absolute [column] (default = [row,1]) - CSI Ps G", () => {
  // Default
  terminal.write("foo\x1b[Ga");
  // Explicit
  terminal.write("\x1b[10Gb");
  expect(getLinesAsArray(1)).toEqual(["aoo      b"]);
});

it("CUP: Cursor Position [row;column] (default = [1,1]) - CSI Ps ; Ps H", () => {
  // Default
  terminal.write("foo\x1b[Ha");
  // Explicit
  terminal.write("\x1b[3;3Hb");
  expect(getLinesAsArray(3)).toEqual(["aoo", "", "  b"]);
});

test("CHT: Cursor Forward Tabulation Ps tab stops (default = 1) - CSI Ps I", () => {
  // Default
  terminal.write("\x1b[Ia");
  // Explicit
  terminal.write("\\n\\r\x1b[2Ib");
  expect(getLinesAsArray(2)).toEqual(["        a", "                b"]);
});

test("ED: Erase in Display, VT100 - CSI Ps J", () => {
  const fixture = "abc\\n\\rdef\\n\\rghi\x1b[2;2H";
  // Default: Erase Below
  terminal.resize(5, 5);
  terminal.write(`${fixture}\x1b[J`);
  expect(getLinesAsArray(3)).toEqual(["abc", "d", ""]);

  // 0: Erase Below
  terminal.reset();
  terminal.write(`${fixture}\x1b[0J`);
  expect(getLinesAsArray(3)).toEqual(["abc", "d", ""]);

  // 1: Erase Above
  terminal.reset();
  terminal.write(`${fixture}\x1b[1J`);
  expect(getLinesAsArray(3)).toEqual(["", "  f", "ghi"]);

  // 2: Erase Saved Lines (scrollback)
  terminal.reset();
  terminal.write(`1\\n2\\n3\\n4\\n5${fixture}\x1b[3J`);
  expect(terminal.buffer.active.length).toBe(5);
  expect(getLinesAsArray(5)).toEqual(["   4", "    5", "abc", "def", "ghi"]);
});

test("DECSED: Erase in Display, VT220 - CSI ? Ps J", async () => {
  const fixture = "abc\\n\\rdef\\n\\rghi\x1b[2;2H";
  // Default: Erase Below
  terminal.resize(5, 5);
  terminal.write(`${fixture}\x1b[?J`);
  expect(getLinesAsArray(3)).toEqual(["abc", "d", ""]);

  // 0: Erase Below
  terminal.reset();
  terminal.write(`${fixture}\x1b[?0J`);
  expect(getLinesAsArray(3)).toEqual(["abc", "d", ""]);

  // 1: Erase Above
  terminal.reset();
  terminal.write(`${fixture}\x1b[?1J`);
  expect(getLinesAsArray(3)).toEqual(["", "  f", "ghi"]);

  // 2: Erase Saved Lines (scrollback)
  terminal.reset();
  terminal.write(`1\\n2\\n3\\n4\\n5${fixture}\x1b[?3J`);
  expect(terminal.buffer.active.length).toBe(5);
  expect(getLinesAsArray(5)).toEqual(["   4", "    5", "abc", "def", "ghi"]);
});

test("IL: Insert Ps Line(s) (default = 1) - CSI Ps L", () => {
  // Default
  terminal.write("foo\x1b[La");
  // Explicit
  terminal.write("\x1b[2Lb");
  expect(getLinesAsArray(4)).toEqual(["b", "", "a", "foo"]);
});

test("DL: Delete Ps Line(s) (default = 1) - CSI Ps M", () => {
  // Default
  terminal.write("a\\nb\x1b[1F\x1b[M");
  // Explicit
  terminal.write("\x1b[1Ed\\ne\\nf\x1b[2F\x1b[2M");
  expect(getLinesAsArray(5)).toEqual([" b", "  f", "", "", ""]);
});

test("DCH: Delete Ps Character(s) (default = 1) - CSI Ps P", () => {
  // Default
  terminal.write("abc\x1b[1;1H\x1b[P");
  // Explicit
  terminal.write("\\n\\rdef\x1b[2;1H\x1b[2P");
  expect(getLinesAsArray(2)).toEqual(["bc", "f"]);
});
