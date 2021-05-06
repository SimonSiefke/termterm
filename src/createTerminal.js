import { createDrawCursor } from './drawCursor.js'
import { createDrawLines } from './drawLines.js'
import { createParse } from './parseArray.js'
import { transformKey } from './handleKeyDown.js'

const CHAR_WIDTH = 13
const CHAR_HEIGHT = 15

const BACKGROUND = '#000000'
const FOREGROUND = '#ffffff'

const COLS = 60
const ROWS = 25
const BUFFER_LINES = 200

export const createTerminal = (root, { bell, setWindowTitle, handleInput }) => {
  let focused = false
  const handleKeyDown = (event) => {
    const transformedKey = transformKey(event)
    if (transformedKey) {
      handleInput(transformedKey)
    }
  }
  const blur = () => {
    focused = false
  }
  const focus = () => {
    if (focused) {
      return
    }
    focused = true
    textarea.focus()
  }
  const canvasText = document.createElement('canvas')
  canvasText.id = 'CanvasText'
  const canvasCursor = document.createElement('canvas')
  canvasCursor.id = 'CanvasCursor'
  const textarea = document.createElement('textarea')
  textarea.id = 'TerminalTextArea'
  root.append(textarea, canvasText, canvasCursor)
  textarea.onkeydown = handleKeyDown
  root.onmousedown = (event) => {
    event.preventDefault()
    focus()
  }
  textarea.onblur = blur
  const WIDTH = COLS * CHAR_WIDTH
  const HEIGHT = ROWS * (CHAR_HEIGHT + 10)
  canvasText.width = canvasCursor.width = WIDTH
  canvasText.height = canvasCursor.height = HEIGHT

  let bufferYEnd = ROWS
  let cursorYRelative = -ROWS
  let cursorXRelative = -COLS
  let foreground = '#ffffff'
  let background = '#000000'
  let cursorVisible = true
  const dirty = {
    start: 0,
    end: 0,
  }

  self.stats = () => ({
    cursorYRelative,
    cursorXRelative,
    x: COLS + cursorXRelative,
    y: bufferYEnd + cursorYRelative,
  })

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
    // console.log('dirty' + y)
    if (y < dirty.start) {
      dirty.start = y
    } else if (y > dirty.end) {
      dirty.end = y
    }
  }
  const dirtyClear = () => {
    // console.log('dirty clear')
    dirty.start = dirty.end = bufferYEnd + cursorYRelative
  }

  const callbackFns = {
    eraseInLine() {
      const y = bufferYEnd + cursorYRelative
      const x = COLS + cursorXRelative
      offsets[y] = x
    },
    eraseInDisplay() {
      // console.log('erase in display')
      offsets.fill(0)
      cursorYRelative = -ROWS + 1
      cursorXRelative = -COLS
      bufferYEnd = ROWS
      for (const key of Object.keys(attributes)) {
        delete attributes[key]
      }
      dirtyMark(0)
      dirtyMark(ROWS)
    },
    setCharAttributes(params) {
      if (params[1] === 7) {
        ;[foreground, background] = [background, foreground]
      } else if (params[1] === 35) {
        foreground = '#8000ff'
      } else if (params[1] === 32) {
        foreground = '#09f900'
      } else if (params[1] === 34) {
        foreground = '#0090ff'
      } else {
        foreground = FOREGROUND
        background = BACKGROUND
      }
      const y = bufferYEnd + cursorYRelative
      attributes[y] = attributes[y] || {}
      attributes[y][offsets[y]] = {
        foreground,
        background,
      }
    },
    cursorUp() {
      console.log('cursor up')
    },
    cursorDown() {
      //       console.log('cursor down')
    },
    cursorRight() {
      cursorXRelative++
    },
    cursorLeft() {
      console.log('cursor left')
    },
    backspace() {
      cursorXRelative--
      // offsets[bufferYEnd + cursorYRelative]--
    },
    deleteChars(numberOfChars) {
      const y = bufferYEnd + cursorYRelative
      // offsets[y] = x - 1
      // cursorXRelative--
      const x = COLS + cursorXRelative
      offsets[y] = x
    },
    bell,
    print(array, start, end) {
      const subArray = array.subarray(start, end)
      const y = bufferYEnd + cursorYRelative
      const x = COLS + cursorXRelative
      lines[y].set(subArray, x)
      cursorXRelative += end - start
      offsets[y] = COLS + cursorXRelative
      dirtyMark(y)
      // offsets[y] += end - start
      // cursorXRelative = -COLS + offsets[y]
    },
    lineFeed() {
      if (cursorYRelative === 0) {
        bufferYEnd = (bufferYEnd + 1) % BUFFER_LINES
        offsets[bufferYEnd] = 0
        delete attributes[bufferYEnd]
      } else {
        cursorYRelative++
      }
      foreground = FOREGROUND
      background = BACKGROUND
    },
    carriageReturn() {
      cursorXRelative = -COLS
    },
    setWindowTitle,
    cursorPosition(params) {
      if (params.length === 2) {
        const row = params[0]
        const column = params[1]
        cursorYRelative = -ROWS + row
        cursorXRelative = -COLS + column
      }
    },
    cursorShow() {
      cursorVisible = true
    },
    cursorHide() {
      cursorVisible = false
    },
    insertLines() {},
    deleteLines() {},
    setTextParameters() {},
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

  const handleAnimationFrame = () => {
    // console.log(dirty)
    drawLines(dirty.start, dirty.end + 1, bufferYEnd)
    const y = ROWS + cursorYRelative
    const x = COLS + cursorXRelative
    drawCursor(x, y, cursorVisible)
    scheduled = false
    dirtyClear()
  }
  const write = (array) => {
    parse(array)
    // if (lines.length > 1_000) {
    //   lines.length = 1_000
    // }
    if (!scheduled) {
      scheduled = true
      requestAnimationFrame(handleAnimationFrame)
    }
  }

  const pasteText = (text) => {
    // TODO bug first line not written
    const fixedText = '\n' + text.replaceAll('\n', '\r\n')
    const array = new TextEncoder().encode(fixedText)
    write(array)
  }

  return {
    write,
    focus,
    pasteText,
    writeText: pasteText,
    // TODO should this be exposed (only used for testing)
    lines,
  }
}
