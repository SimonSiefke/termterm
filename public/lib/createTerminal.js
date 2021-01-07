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
  canvas.height = ROWS * (CHAR_HEIGHT + 10)

  let x = 0
  let y = 0

  const dirty = {
    start: 0,
    end: 0,
  }

  // let bufferYStart = 0
  // let bufferYEnd = lines.length

  const lines = []
  self.lines = lines

  // const createEmptyLine = () => {
  //   const line = []
  //   for (let x = 0; x < COLS; x++) {
  //     line.push(EMPTY_CELL)
  //   }
  //   return line
  // }
  const offsets = new Uint8Array(ROWS)

  self.offsets = offsets

  for (let y = 0; y < ROWS; y++) {
    lines.push(new Uint8Array(200))
  }

  let background = '#000000'
  let foreground = '#ffffff'

  const textDecoder = new TextDecoder()

  self.printLines = () =>
    lines.map((line, y) => textDecoder.decode(line.subarray(0, offsets[y] + 1)))
  // const storeChar = (char) => {
  //   lines[y][x++] = {
  //     char,
  //     background,
  //     foreground,
  //   }
  // }

  const storeChars = (array) => {
    // if (offsets[y] > 320) {
    //   debugger
    // }
    // console.log({ array })
    // for (let i = 0; i < array.length; i++) {
    //   switch (array[i]) {
    //     case 13:
    //       x = 0
    //       break
    //     case 10:
    //       y++
    //       if (y === lines.length) {
    //         // dirtyMark(y)
    //         // for (let x = 0; x < COLS; x++) {
    //         //   lines[0][x] = EMPTY_CELL
    //         // }
    //         // y = 0
    //         // lines[y] = createEmptyLine()
    //         lines.shift()
    //         lines.push(createEmptyLine())
    //         y--
    //       }
    //       dirtyMark(y)
    //       break
    //     default:
    //       // if (array[i] < 128) {
    //       storeChar(String.fromCharCode(array[i]))
    //     // } else {
    //     // console.log('SPECIAL')
    //     // }
    //   }
    // }
  }

  // const storeChars = (array) => {
  //   const text = textDecoder.decode(array, {
  //     stream: true,
  //   })
  //   const chars = [...text]
  //   for (const char of chars) {
  //     storeChar(char)
  //   }
  // }

  // const storeChars = storeCharsFast

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
      // for (let x1 = x; x1 < COLS; x1++) {
      //   lines[y][x1] = EMPTY_CELL
      // }
      lines[y].fill(0, offsets[y])
    },
    eraseInDisplay2: () => {
      // for (let i = 0; i < lines.length; i++) {
      //   lines[i] = createEmptyLine()
      // }
      y = 0
      x = 0
    },
    setCharAttributes: (params) => {
      attributes = params
      if (attributes[1] === 35) {
        foreground = '#8000ff'
      } else if (attributes[1] === 32) {
        foreground = '#09f900'
      } else if (attributes[1] === 34) {
        foreground = '#0090ff'
      } else {
        foreground = FOREGROUND
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
      --x
    },
    bell,
    print: (array, start, end) => {
      // self.t = self.t || 0
      // let s = performance.now()
      // array.subarray(start, end)
      // const e = performance.now()
      // self.t += e - s
      // storeChars(array.subarray(start, end))
      // dirtyMark(y)
      const subArray = array.subarray(start, end)
      lines[y].set(subArray, offsets[y])
      offsets[y] += end - start
    },
    lineFeed: () => {
      if (y === lines.length - 1) {
        lines.shift()
        lines.push(new Uint8Array(200))
        offsets[y] = 0
      } else {
        y++
      }

      // console.log(y)
      // if (++y === lines.length) {
      //   bufferYStart++
      //   dirtyMark(y)
      //   y = 0
      // }
      // dirtyMark(y)
    },
    carriageReturn: () => {
      x = 0
    },
  }

  const parse = createParse(callbackFns)
  const drawLines = createDrawLines(ctx, lines, offsets, COLS, dirty)

  let scheduled = false

  self.drawLines = () => drawLines(dirty.start, dirty.end + 1)

  const write = (array) => {
    // console.log({ array })
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
