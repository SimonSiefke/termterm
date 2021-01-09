import { createDrawCursor } from './drawCursor.js'
import { createDrawLines } from './drawLines.js'
import { createParse } from './parseArray.js'

const CHAR_WIDTH = 13
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ffffff'

const COLS = 60
const ROWS = 25
const BUFFER_LINES = 200

export const createTerminal = (
  canvasText,
  canvasCursor,
  { bell, cacheCanvas },
) => {
  const WIDTH = COLS * CHAR_WIDTH
  const HEIGHT = ROWS * (CHAR_HEIGHT + 10)
  canvasText.width = canvasCursor.width = WIDTH
  canvasText.height = canvasCursor.height = HEIGHT

  let bufferYEnd = 0
  let cursorYRelative = -ROWS
  let cursorXRelative = -COLS
  let foreground = '#ffffff'
  let background = '#000000'
  const dirty = {
    start: 0,
    end: 0,
  }

  const lines = []
  self.lines = lines

  const offsets = new Uint8Array(BUFFER_LINES)

  self.offsets = offsets
  let attributes = {}

  self.attributes = attributes

  for (let y = 0; y < BUFFER_LINES; y++) {
    lines.push(new Uint8Array(300))
  }

  const textDecoder = new TextDecoder()

  self.printLines = () =>
    lines.map((line, y) => textDecoder.decode(line.subarray(0, offsets[y] + 1)))

  const dirtyMark = (y) => {
    if (y < dirty.start) {
      dirty.start = y
    } else if (y > dirty.end) {
      dirty.end = y
    }
  }
  const dirtyClear = () => {
    dirty.start = bufferYEnd - 25
    dirty.end = bufferYEnd
  }

  const callbackFns = {
    goToHome: () => {
      console.log('go to home')
    },
    eraseToEndOfLine: () => {
      // console.log(x)
      // offsets[y] = 10
    },
    eraseInDisplay2: () => {
      offsets.fill(0)
      cursorYRelative = -ROWS + 1
      bufferYEnd = ROWS
      for (const key of Object.keys(attributes)) {
        delete attributes[key]
      }
    },
    setCharAttributes: (params) => {
      if (params[1] === 35) {
        foreground = '#8000ff'
      } else if (params[1] === 32) {
        foreground = '#09f900'
      } else if (params[1] === 34) {
        foreground = '#0090ff'
      } else {
        foreground = FOREGROUND
      }
      const y = bufferYEnd + cursorYRelative
      attributes[y] = attributes[y] || {}
      attributes[y][offsets[y]] = {
        foreground,
        background,
      }
    },
    cursorUp: () => {
      console.log('cursor up')
    },
    cursorDown: () => {
      console.log('cursor down')
    },
    cursorRight: () => {
      console.log('cursor right')
    },
    cursorLeft: () => {
      console.log('cursor left')
    },
    backspace: () => {
      offsets[bufferYEnd + cursorYRelative]--
    },
    bell,
    print: (array, start, end) => {
      const subArray = array.subarray(start, end)
      const y = bufferYEnd + cursorYRelative
      lines[y].set(subArray, offsets[y])
      offsets[y] += end - start
    },
    lineFeed: () => {
      if (cursorYRelative === 0) {
        bufferYEnd = (bufferYEnd + 1) % BUFFER_LINES
        offsets[bufferYEnd] = 0
      } else {
        cursorYRelative++
      }
    },
    carriageReturn: () => {
      // cursorX = 0
    },
  }

  const parse = createParse(callbackFns)
  const drawLines = createDrawLines(
    canvasText,
    lines,
    BUFFER_LINES,
    offsets,
    attributes,
    ROWS,
    COLS,
    dirty,
  )

  const drawCursor = createDrawCursor(canvasCursor)

  let scheduled = false

  self.drawLines = () => drawLines(dirty.start, dirty.end + 1)

  const write = (array) => {
    dirtyClear()
    parse(array)
    // if (lines.length > 1_000) {
    //   lines.length = 1_000
    // }
    if (!scheduled) {
      scheduled = true
      requestAnimationFrame(() => {
        drawLines(dirty.start, dirty.end + 1, bufferYEnd)
        const y = ROWS + cursorYRelative
        drawCursor(offsets[y], y)
        scheduled = false
      })
    }
  }

  return {
    write,
  }
}
