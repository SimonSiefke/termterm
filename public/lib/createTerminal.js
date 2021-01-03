import { createParser } from './parseArray.js'
import { drawLines } from './drawLines.js'

const CHAR_WIDTH = 15
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ffffff'

export const createTerminal = (canvas) => {
  const COLS = 80
  const ROWS = 25

  canvas.width = COLS * CHAR_WIDTH
  canvas.height = ROWS * CHAR_HEIGHT

  const lines = []
  for (let y = 0; y < ROWS; y++) {
    lines[y] = ''
  }

  let x = 0
  let y = 0

  const ctx = canvas.getContext('2d', {
    desynchronized: true, // perf
    alpha: false, // perf
  })

  const callbackFns = {
    goToHome: () => {
      console.log('go to home')
    },
    eraseToEndOfLine: () => {
      console.log('erase to end of line')
    },
    eraseInDisplay2: () => {
      for (let i = 0; i < lines.length; i++) {
        lines[i] = ''
      }
      y = 0
      x = 0
    },
    setCharAttributes: () => {
      // console.log('set char attributes')
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
      console.log('backspace')
    },
    bell: () => {
      console.log('bell')
    },
    print: (array, start, end) => {
      const text = new TextDecoder().decode(array.subarray(start, end))
      lines[y] += text
      x += text.length
      // markDirty(y)
      // console.log('print ' + text)
    },
    newline: () => {
      y++
      if (y >= lines.length) {
        y--
      }
    },
  }

  const parse = createParser(callbackFns)

  const write = (array) => {
    parse(array)
    console.log(array)
    drawLines(ctx, lines)

    // writeToBuffer(new Uint8Array(data))
  }

  console.log('create terminal')

  return {
    write,
  }
}
