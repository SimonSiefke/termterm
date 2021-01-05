import { createDrawLines } from './drawLines.js'
import { createParse } from './parseArray.js'

const CHAR_WIDTH = 13
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ffffff'

const EMPTY_CELL = { char: ' ' }

export const createTerminal = (canvas, { bell, cacheCanvas }) => {
  const COLS = 60
  const ROWS = 25

  canvas.width = COLS * CHAR_WIDTH
  canvas.height = ROWS * CHAR_HEIGHT

  let x = 0
  let y = 0

  const dirty = {
    start: 0,
    end: 0,
  }

  const lines = []

  const textDecoder = new TextDecoder()

  self.lines = lines
  const createEmptyLine = () => {
    const line = []
    for (let x = 0; x < COLS; x++) {
      line.push(EMPTY_CELL)
    }
    return line
  }
  for (let y = 0; y < ROWS; y++) {
    lines.push(createEmptyLine())
  }

  const dirtyMark = (y) => {
    if (y < dirty.start) {
      dirty.start = y
    } else if (y > dirty.end) {
      dirty.end = y
    }
  }
  const dirtyClear = () => {
    dirty.start = y
    dirty.end = y
  }

  const ctx = canvas.getContext('2d', {
    desynchronized: true, // perf
    alpha: false, // perf
  })

  let attributes = []

  const charAttributesMap = new Map()

  const callbackFns = {
    goToHome: () => {
      console.log('go to home')
    },
    eraseToEndOfLine: () => {
      for (let x1 = x; x1 < COLS; x1++) {
        lines[y][x1] = EMPTY_CELL
      }
    },
    eraseInDisplay2: () => {
      for (let i = 0; i < lines.length; i++) {
        lines[i] = createEmptyLine()
      }
      y = 0
      x = 0
    },
    setCharAttributes: (params) => {
      attributes = params
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
      --x
    },
    bell,
    print: (array, start, end) => {
      const text = textDecoder.decode(array.subarray(start, end), {
        stream: true,
      })
      const chars = [...text]
      let background = '#000000'
      let foreground = '#ffffff'
      if (attributes[1] === 35) {
        foreground = '#8000ff'
      } else if (attributes[1] === 32) {
        foreground = '#09f900'
      } else if (attributes[1] === 34) {
        foreground = '#0090ff'
      }
      for (const char of chars) {
        // reuse same object to reduce gc
        // if (lines[y][x]) {
        //   console.log(lines[y][x])
        //   lines[y][x].char = char
        //   lines[y][x].background = background
        //   lines[y][x].foreground = foreground
        // }
        // if (
        //   JSON.stringify(lines[y][x]) !==
        //   JSON.stringify({
        //     char,
        //     background,
        //     foreground,
        //   })
        // ) {
        //   throw new Error('no')
        // }

        // console.log({ char })
        // lines[y][x] = lines[y][x] || {}
        // lines[y][x].char = char
        // lines[y][x].background = background
        // lines[y][x].foreground = foreground
        // x++

        lines[y][x++] = {
          char,
          background,
          foreground,
        }
      }
      dirtyMark(y)
    },
    newline: () => {
      y++
      x = 0
      if (y >= lines.length) {
        y--
      }
      dirtyMark(y)
    },
  }

  const parse = createParse(callbackFns)
  const drawLines = createDrawLines(ctx, lines, COLS, dirty)

  let scheduled = false

  const write = (array) => {
    dirtyClear()
    parse(array)
    if (!scheduled) {
      scheduled = true
      requestAnimationFrame(() => {
        drawLines(dirty.start, dirty.end + 1)
        scheduled = false
      })
    }
    //     console.log(array)
  }

  return {
    write,
  }
}
