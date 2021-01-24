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
  // desynchronized: true, // perf
  alpha: false, // perf
})

const bitmapCache = Object.create(null)

export const createDrawLines = (
  canvas,
  lines,
  bufferLines,
  offsets,
  attributes,
  rows,
  cols,
) => {
  const ctx = canvas.getContext('2d', {
    // desynchronized: true, // perf
    alpha: false, // perf
  })
  ctx.fillStyle = BACKGROUND

  const drawChar = (char, x, y, background, foreground) => {
    if (char === ' ' && background === '#000000') {
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

  const rnd = () => Math.floor(Math.random() * 16777215).toString(16)

  const clearLines = (x, y, width, height) => {
    // ctx.fillStyle = `#${rnd()}`
    // console.log(rnd())
    // ctx.fillRect(0, 0, 780, 625)
    // console.log({ x, y, width, height })
    // console.log([
    //   x * CHAR_WIDTH,
    //   y * CHAR_HEIGHT,
    //   width * CHAR_WIDTH,
    //   height * CHAR_HEIGHT,
    // ])
    // ctx.clearRect(
    //   x * CHAR_WIDTH,
    //   y * CHAR_HEIGHT,
    //   width * CHAR_WIDTH,
    //   height * CHAR_HEIGHT,
    // )
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillRect(
      x * CHAR_WIDTH,
      y * CHAR_HEIGHT,
      width * CHAR_WIDTH,
      height * CHAR_HEIGHT,
    )
  }

  const drawLines = (start, end, bufferYEnd) => {
    // console.log('draw all lines')
    // console.log(start, end)
    clearLines(0, start, cols, end - start)
    if (bufferYEnd < rows) {
      for (let i = 0; i < rows - bufferYEnd; i++) {
        drawLine(bufferLines - i - 1, rows - i)
      }
      for (let i = 0; i < bufferYEnd + 1; i++) {
        drawLine(i, rows - (bufferYEnd - i))
      }
    } else {
      for (let i = 0; i < rows; i++) {
        drawLine(bufferYEnd - i, rows - i)
      }
    }
  }

  return drawLines
}
