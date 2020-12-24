import { parseArray } from './parseArray.js'
import { jest } from '@jest/globals'

const noop = () => {}

const runTest = (
  input,
  {
    bell = noop,
    eraseInDisplay2 = noop,
    eraseToEndOfLine = noop,
    goToHome = noop,
    setCharAttributes = noop,
    cursorUp = noop,
    cursorDown = noop,
    cursorRight = noop,
    cursorLeft = noop,
    backspace = noop,
  },
) => {
  const array = new Uint8Array(input.split('').map((x) => x.charCodeAt()))
  parseArray(array, {
    eraseInDisplay2,
    eraseToEndOfLine,
    goToHome,
    setCharAttributes,
    cursorUp,
    cursorDown,
    cursorRight,
    cursorLeft,
    bell,
    backspace,
  })
}

test('bell', () => {
  const bell = jest.fn()
  runTest('\u0007', { bell })
  expect(bell).toHaveBeenCalledTimes(1)
})

test('cursorUp', () => {
  const cursorUp = jest.fn()
  runTest('\u001b[A', { cursorUp })
  expect(cursorUp).toHaveBeenCalledTimes(1)
})

test('cursorDown', () => {
  const cursorDown = jest.fn()
  runTest('\u001b[B', { cursorDown })
  expect(cursorDown).toHaveBeenCalledTimes(1)
})

test('cursorRight', () => {
  const cursorRight = jest.fn()
  runTest('\u001b[C', { cursorRight })
  expect(cursorRight).toHaveBeenCalledTimes(1)
})

test('cursorLeft', () => {
  const cursorLeft = jest.fn()
  runTest('\u001b[D', { cursorLeft })
  expect(cursorLeft).toHaveBeenCalledTimes(1)
})

test('goToHome', () => {
  const goToHome = jest.fn()
  runTest('\u001b[H', { goToHome })
  expect(goToHome).toHaveBeenCalledTimes(1)
})

test('eraseToEndOfLine', () => {
  const eraseToEndOfLine = jest.fn()
  runTest('\u001b[K', { eraseToEndOfLine })
  expect(eraseToEndOfLine).toHaveBeenCalledTimes(1)
})

test('backspace', () => {
  const backspace = jest.fn()
  runTest('\u0008', { backspace })
  expect(backspace).toHaveBeenCalledTimes(1)
})
