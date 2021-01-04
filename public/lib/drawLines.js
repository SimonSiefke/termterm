const CHAR_WIDTH = 12
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ff00ff'

const WIDTH = 1000
const HEIGHT = 1000

const tmpCanvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
const tmpCtx = tmpCanvas.getContext('2d', {
  desynchronized: true, // perf
  alpha: false, // perf
})

const cacheCanvas = new OffscreenCanvas(WIDTH, HEIGHT)
const cacheCtx = cacheCanvas.getContext('2d', {
  alpha: false, // perf
})
const cache = Object.create(null)
const imageBitmapCache = Object.create(null)

let index = -1
let bitmapCacheIndex = -1

const toCoordinateX = (index) => (index % WIDTH) * CHAR_WIDTH
const toCoordinateY = (index) => Math.floor(index / WIDTH) * CHAR_HEIGHT

export const createDrawLines = (ctx, lines, cols) => {
  let imageBitmap
  setInterval(() => {
    createImageBitmap(cacheCanvas).then((newImageBitmap) => {
      imageBitmap = newImageBitmap
      for (const [key, value] of Object.entries(cache)) {
        imageBitmapCache[key] = value
      }
      // console.log(imageBitmap)
      if (self.visibleCacheCtx) {
        visibleCacheCtx.drawImage(imageBitmap, 0, 0)
      }
    })
  }, 1000)
  const drawChar = (char, x, y) => {
    if (char === ' ') {
      return
    }
    if (char in imageBitmapCache) {
      // console.log('image bitmap cache')
      const { cacheX, cacheY } = imageBitmapCache[char]
      // TODO optimize with image bitmap
      ctx.drawImage(
        imageBitmap,
        cacheX,
        cacheY,
        CHAR_WIDTH,
        CHAR_HEIGHT,
        x * CHAR_WIDTH,
        y * CHAR_HEIGHT,
        CHAR_WIDTH,
        CHAR_HEIGHT,
      )
    } else if (char in cache) {
      // console.log('cache')
      const { cacheX, cacheY } = cache[char]
      // TODO optimize with image bitmap
      ctx.drawImage(
        cacheCanvas,
        cacheX,
        cacheY,
        CHAR_WIDTH,
        CHAR_HEIGHT,
        x * CHAR_WIDTH,
        y * CHAR_HEIGHT,
        CHAR_WIDTH,
        CHAR_HEIGHT,
      )
    } else {
      console.log('not in cache')
      tmpCtx.globalCompositeOperation = 'copy'
      tmpCtx.fillStyle = BACKGROUND
      tmpCtx.fillRect(0, 0, CHAR_WIDTH, CHAR_HEIGHT)
      tmpCtx.globalCompositeOperation = 'source-over'
      tmpCtx.font = `${CHAR_HEIGHT}px monospace`
      tmpCtx.fillStyle = FOREGROUND
      tmpCtx.fillText(char, 0, CHAR_HEIGHT)
      // TODO could also store x and y here (might be more performant)
      ++index
      const cacheX = toCoordinateX(index)
      const cacheY = toCoordinateY(index)
      cache[char] = {
        cacheX,
        cacheY,
      }
      cacheCtx.drawImage(tmpCanvas.transferToImageBitmap(), cacheX, cacheY)
      ctx.drawImage(
        cacheCanvas,
        cacheX,
        cacheY,
        CHAR_WIDTH,
        CHAR_HEIGHT,
        x * CHAR_WIDTH,
        y * CHAR_HEIGHT,
        CHAR_WIDTH,
        CHAR_HEIGHT,
      )
    }
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
