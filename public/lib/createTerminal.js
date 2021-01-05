import { createDrawLines } from './drawLines.js'
import { createParse } from './parseArray.js'

const CHAR_WIDTH = 13
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ffffff'

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

  self.lines = lines
  const createEmptyLine = () => {
    const line = []
    for (let x = 0; x < COLS; x++) {
      line.push({
        char: ' ',
        attributes: {},
      })
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
      console.log('erase to end of line')
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
      lines[y][--x] = { char: ' ' }
    },
    bell,
    print: (array, start, end) => {
      const text = new TextDecoder().decode(array.subarray(start, end))
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

  const write = (array) => {
    dirtyClear()
    parse(array)
    //     console.log(array)
    requestAnimationFrame(() => drawLines(dirty.start, dirty.end + 1))
  }

  return {
    write,
  }
}
