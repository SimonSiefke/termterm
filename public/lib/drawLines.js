const CHAR_WIDTH = 12
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ffffff'

const tmpCanvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
const tmpCtx = tmpCanvas.getContext('2d', {
  desynchronized: true, // perf
  alpha: false, // perf
})
const cache = Object.create(null)

const drawChar = (char) => {
  if (!(char in cache)) {
    console.log('not in cache')
    tmpCtx.globalCompositeOperation = 'copy'
    tmpCtx.fillStyle = BACKGROUND
    tmpCtx.fillRect(0, 0, CHAR_WIDTH, CHAR_HEIGHT)
    tmpCtx.globalCompositeOperation = 'source-over'
    tmpCtx.font = `${CHAR_HEIGHT}px monospace`
    tmpCtx.fillStyle = FOREGROUND
    tmpCtx.fillText(char, 0, CHAR_HEIGHT)
    cache[char] = tmpCanvas.transferToImageBitmap()
  }
  return cache[char]
}

const NULL_IMAGE_DATA = drawChar(' ')

const createDrawLine = (ctx, lines) => {
  const drawLine = (y) => {
    let x = -1
    const chars = [...lines[y]]
    while (++x < chars.length) {
      const char = chars[x]
      const imageData = drawChar(char)
      ctx.drawImage(imageData, x * CHAR_WIDTH, y * CHAR_HEIGHT)
    }
    x--
    while (++x < 80) {
      ctx.drawImage(NULL_IMAGE_DATA, x * CHAR_WIDTH, y * CHAR_HEIGHT)
    }
  }
  return drawLine
}

export const createDrawLines = (ctx, lines) => {
  const drawLine = createDrawLine(ctx, lines)
  const drawLines = (start, end) => {
    for (let y = start; y < end; y++) {
      drawLine(y)
    }
  }
  return drawLines
}
