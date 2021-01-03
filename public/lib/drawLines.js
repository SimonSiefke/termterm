const CHAR_WIDTH = 15
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

const drawLine = (ctx, line, y) => {
  let x = -1
  const chars = [...line]
  while (++x < chars.length) {
    const char = chars[x]
    const imageData = drawChar(char)
    ctx.drawImage(imageData, x * CHAR_WIDTH, y * CHAR_HEIGHT)
  }
  x--
  while (++x < 80) {
    const imageData = drawChar(' ')
    ctx.drawImage(imageData, x * CHAR_WIDTH, y * CHAR_HEIGHT)
  }
}

export const drawLines = (ctx, lines, dirtyRowStart, dirtyRowEnd) => {
  for (let y = dirtyRowStart; y < dirtyRowEnd; y++) {
    drawLine(ctx, lines[y], y)
  }
}
