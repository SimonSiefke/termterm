const CHAR_WIDTH = 12
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ffffff'

const tmpCanvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
const tmpCtx = tmpCanvas.getContext('2d', {
  desynchronized: true, // perf
  alpha: false, // perf
})

const bitmapCache = Object.create(null)

export const createDrawLines = (ctx, lines, offsets, cols) => {
  const drawChar = (char, x, y, background, foreground) => {
    if (char === ' ') {
      return
    }
    const cacheKey = `${char}${background}${foreground}`
    if (!(cacheKey in bitmapCache)) {
      tmpCtx.fillStyle = background
      tmpCtx.fillRect(0, 0, CHAR_WIDTH, CHAR_HEIGHT)
      tmpCtx.font = `${CHAR_HEIGHT}px monospace`
      tmpCtx.fillStyle = foreground
      tmpCtx.fillText(char, 0, CHAR_HEIGHT)
      bitmapCache[cacheKey] = tmpCanvas.transferToImageBitmap()
    }
    ctx.drawImage(bitmapCache[cacheKey], x * CHAR_WIDTH, y * CHAR_HEIGHT)
  }

  const getChars = (y) => {
    const text = new TextDecoder().decode(lines[y].subarray(0, offsets[y]))
    const chars = [...text]
    return chars
  }

  const drawLine = (bufferY, positionY) => {
    let x = -1
    const chars = getChars(bufferY)
    //console.log(chars)
    // const chars = lines[y]
    while (++x < chars.length) {
      // const { char, background, foreground } = chars[x]
      const char = chars[x]
      const background = '#000000'
      const foreground = '#ffffff'
      drawChar(char, x, positionY, background, foreground)
    }
  }

  const clearLines = (x, y, width, height) => {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(x * CHAR_WIDTH, y * CHAR_HEIGHT, 900, height * CHAR_HEIGHT)
    // ctx.fillRect(
    //   x * CHAR_WIDTH,
    //   y * CHAR_HEIGHT,
    //   width * CHAR_WIDTH,
    //   height * CHAR_HEIGHT,
    // )
  }

  self.ctx = ctx
  const drawLines = (start, end, offsetY) => {
    console.log(offsetY)
    start = 0
    end = lines.length
    clearLines(0, start, cols, end - start + 1)
    for (let y = start; y < end; y++) {
      drawLine((offsetY + y) % (end - 1), y)
    }
  }

  return drawLines
}
