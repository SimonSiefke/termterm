export const create = () => {
  const state = {
    lines: [],
  };
  return state;
};

export const resize = (state, columns, rows) => {
  let nextRow = [];
  const newLines = [];

  for (let i = 0; i < state.lines.length; i++) {
    for (let j = 0; j < state.lines[i].length; j++) {
      if (j % columns === 0) {
        nextRow = [];
        newLines.push(nextRow);
      }
      nextRow.push(state.lines[i][j]);
    }
  }
  for (let i = state.lines.length; i < rows; i++) {
    nextRow = [];
    for (let i = 0; i < columns; i++) {
      nextRow.push(" ");
    }
    newLines.push(nextRow);
  }
  state.lines = newLines;
};

export const prettyLines = (state) => {
  return state.lines.map((chars) => chars.join(""));
};
