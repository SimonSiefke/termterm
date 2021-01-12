const BACKGROUND = '#c00ccc'

const CHAR_WIDTH = 12
const CHAR_HEIGHT = 15

export const createDrawCursor = (canvas) => {
  const ctx = canvas.getContext('2d')
  let previousX = -1
  let previousY = -1

  const drawCursor = (x, y, cursorVisible) => {
    if (cursorVisible) {
      if (previousX === x && previousY === y) {
        return
      }
      ctx.clearRect(
        previousX * CHAR_WIDTH,
        previousY * CHAR_HEIGHT,
        CHAR_WIDTH,
        CHAR_HEIGHT,
      )
      previousX = x
      previousY = y

      ctx.fillStyle = BACKGROUND
      ctx.fillRect(x * CHAR_WIDTH, y * CHAR_HEIGHT, CHAR_WIDTH, CHAR_HEIGHT)
    } else {
      ctx.clearRect(
        previousX * CHAR_WIDTH,
        previousY * CHAR_HEIGHT,
        CHAR_WIDTH,
        CHAR_HEIGHT,
      )
    }
  }

  return drawCursor
}
