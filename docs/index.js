// Demo based on the xtermjs docs by xterm.js authors (https://github.com/xtermjs/xtermjs.org/blob/master/js/demo.js, LICENSE MIT)

import { createTerminal } from "/src/createTerminal.js";

const Terminal = {
  activeTerminal: undefined,
  writeText(text) {
    this.activeTerminal.writeText(text);
  },
};

const Command = {
  commands: Object.create(null),
  register(id, description, fn) {
    this.commands[id] = {
      description,
      fn,
    };
  },
  execute(id, ...args) {
    this.commands[id](...args);
  },
};

Command.register("help", "Prints this help message", () => {
  Terminal.writeText(
    [
      "Welcome to xterm.js! Try some of the commands below.",
      "",
      ...Object.entries(Command.commands).map(
        ([key, value]) => `  ${key.padEnd(10)} ${value.description}`
      ),
    ].join("\n\r")
  );
});

Command.register("ls", "Prints a fake directory structure", () => {
  Terminal.writeText(["a", "bunch", "of", "fake", "files"].join("\r\n"));
  // terminal.prompt(term); // TODO not yet implemented
});

Command.register(
  "loadTest",
  "Simulate a lot of data coming from a process",
  () => {
    // TODO
  }
);

const main = () => {
  Terminal.activeTerminal = createTerminal(
    document.getElementById("Terminal"),
    {
      handleInput(transformedKey) {
        Terminal.writeText(transformedKey);
      },
    }
  );
  Terminal.activeTerminal.writeText(
    [
      "    This is a terminal emulator for the web",
      "",
      "",
      " ┌ \x1b[1mFeatures\x1b[0m ──────────────────────────────────────────────────────────────────┐",
      " │                                                                            │",
      " │  \x1b[31;1mApps just work                         \x1b[32mPerformance\x1b[0m                        │",
      " │   TODO                                    TODO                     │",
      " │                                                                            │",
      " │  \x1b[33;1mAccessible                             \x1b[34mSelf-contained\x1b[0m                     │",
      " │   TODO                                   TODO                   │",
      " │                                                                            │",
      " │  \x1b[35;1mUnicode support                                         │",
      " │   TODO                                     │",
      " │                                                                            │",
      " └────────────────────────────────────────────────────────────────────────────┘",
      "",
      "Below is a simple emulated backend, try running `help`.",
      "",
      "$",
    ].join("\n\r")
  );
};

main();
