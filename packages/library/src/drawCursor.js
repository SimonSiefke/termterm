const BACKGROUND = "#c00ccc";

const CHAR_WIDTH = 12;
const CHAR_HEIGHT = 15;

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @returns
 */
export const createDrawCursor = (canvas) => {
  const ctx = canvas.getContext("2d");
  let previousX = -1;
  let previousY = -1;
  let previousCursorStyle = -1;

  const drawCursor = (x, y, cursorVisible, cursorStyle) => {
    if (cursorVisible) {
      if (
        previousX === x &&
        previousY === y &&
        previousCursorStyle === cursorStyle
      ) {
        return;
      }

      ctx.clearRect(
        previousX * CHAR_WIDTH,
        previousY * CHAR_HEIGHT,
        CHAR_WIDTH,
        CHAR_HEIGHT
      );
      switch (cursorStyle) {
        case /* bar */ 1:
          break;
        case /* block */ 2:
          ctx.fillStyle = BACKGROUND;
          ctx.fillRect(
            x * CHAR_WIDTH,
            y * CHAR_HEIGHT,
            CHAR_WIDTH,
            CHAR_HEIGHT
          );
          break;
        case /* underline */ 3:
          break;
        case /* blur */ 4:
          ctx.strokeStyle = BACKGROUND;
          ctx.strokeRect(
            x * CHAR_WIDTH,
            y * CHAR_HEIGHT,
            CHAR_WIDTH,
            CHAR_HEIGHT
          );
          break;
        default:
          break;
      }
      previousX = x;
      previousY = y;
    } else {
      ctx.clearRect(
        previousX * CHAR_WIDTH,
        previousY * CHAR_HEIGHT,
        CHAR_WIDTH,
        CHAR_HEIGHT
      );
    }
  };

  return drawCursor;
};
