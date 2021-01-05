const CHAR_WIDTH = 12
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ff00ff'

const tmpCanvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
const tmpCtx = tmpCanvas.getContext('2d', {
  desynchronized: true, // perf
  alpha: false, // perf
})

const bitmapCache = Object.create(null)

export const createDrawLines = (ctx, lines, cols) => {
  const drawChar = (char, x, y) => {
    if (char === ' ') {
      return
    }
    if (!(char in bitmapCache)) {
      console.log('not in cache')
      tmpCtx.fillStyle = BACKGROUND
      tmpCtx.fillRect(0, 0, CHAR_WIDTH, CHAR_HEIGHT)
      tmpCtx.font = `${CHAR_HEIGHT}px monospace`
      tmpCtx.fillStyle = FOREGROUND
      tmpCtx.fillText(char, 0, CHAR_HEIGHT)
      bitmapCache[char] = tmpCanvas.transferToImageBitmap()
    }
    ctx.drawImage(bitmapCache[char], x * CHAR_WIDTH, y * CHAR_HEIGHT)
  }

  const drawLine = (y) => {
    let x = -1
    const chars = lines[y]
    while (++x < chars.length) {
      const char = chars[x]
      drawChar(char, x, y)
    }
  }

  const clearLines = (x, y, width, height) => {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(
      x * CHAR_WIDTH,
      y * CHAR_HEIGHT,
      width * CHAR_WIDTH,
      height * CHAR_HEIGHT,
    )
  }

  const drawLines = (start, end) => {
    clearLines(0, start, cols, end - start + 1)
    for (let y = start; y < end; y++) {
      drawLine(y)
    }
  }

  return drawLines
}
