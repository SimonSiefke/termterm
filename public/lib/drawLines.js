const CHAR_WIDTH = 12
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ffffff'

const supportsOffscreenCanvas = (() => {
  try {
    const canvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
    canvas.getContext('2d')
    return true
  } catch {
    return false
  }
})()

const supportsTransferToImageBitMap = (() => {
  try {
    supportsOffscreenCanvas
      ? (() => {
          const canvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
          canvas.getContext('2d')
          canvas.transferToImageBitmap()
        })()
      : (() => {
          const canvas = document.createElement('canvas')
          canvas.width = CHAR_WIDTH
          canvas.height = CHAR_HEIGHT
          canvas.transferToImageBitmap()
        })()
    return true
  } catch {
    return false
  }
})()

self.supportsTransferToImageBitMap = supportsTransferToImageBitMap

const tmpCanvas = supportsOffscreenCanvas
  ? new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
  : (() => {
      const canvas = document.createElement('canvas')
      canvas.width = CHAR_WIDTH
      canvas.height = CHAR_HEIGHT
      return canvas
    })()

const tmpCtx = tmpCanvas.getContext('2d', {
  desynchronized: true, // perf
  alpha: false, // perf
})

const bitmapCache = Object.create(null)

export const createDrawLines = (ctx, lines, offsets, attributes, cols) => {
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
      bitmapCache[cacheKey] = supportsTransferToImageBitMap
        ? tmpCanvas.transferToImageBitmap()
        : tmpCtx.getImageData(0, 0, CHAR_WIDTH, CHAR_HEIGHT)
    }
    supportsTransferToImageBitMap
      ? ctx.drawImage(bitmapCache[cacheKey], x * CHAR_WIDTH, y * CHAR_HEIGHT)
      : ctx.putImageData(bitmapCache[cacheKey], x * CHAR_WIDTH, y * CHAR_HEIGHT)
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
    const attributesOnLine = attributes[bufferY] || {}
    let currentAttributes = {
      foreground: '#ffffff',
      background: '#000000',
    }
    while (++x < chars.length) {
      currentAttributes = attributesOnLine[x] || currentAttributes
      // const { char, background, foreground } = chars[x]
      const char = chars[x]
      const background = currentAttributes.background || '#000000'
      const foreground = currentAttributes.foreground || '#ffffff'
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

  const drawLines = (start, end, offsetY) => {
    start = 0
    end = lines.length
    clearLines(0, start, cols, end - start + 1)
    for (let y = start; y < end; y++) {
      drawLine((offsetY + y) % (end - 1), y)
    }
  }

  return drawLines
}
