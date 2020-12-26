import { jest } from '@jest/globals'
import { handleKeyDown } from './handleKeyDown.js'

const runTest = (
  {
    key,
    shiftKey = false,
    altKey = false,
    ctrlKey = false,
    preventDefault = () => {},
  },
  send,
) => {
  handleKeyDown({ send })({ key, preventDefault, shiftKey, altKey, ctrlKey })
}

test('key - Shift', () => {
  const send = jest.fn()
  runTest({ key: 'Shift' }, send)
  expect(send).not.toHaveBeenCalled()
})

test('key - ArrowUp', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowUp' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[A`)
})

test('key - ArrowDown', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowDown' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[B`)
})

test('key - ArrowRight', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowRight' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[C`)
})

test('key - ArrowLeft', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowLeft' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[D`)
})

test('key - Enter', () => {
  const send = jest.fn()
  runTest({ key: 'Enter' }, send)
  expect(send).toHaveBeenCalledWith(`\n`)
})

test('key - Backspace', () => {
  const send = jest.fn()
  runTest({ key: 'Backspace' }, send)
  expect(send).toHaveBeenCalledWith(`\x7f`)
})

test('key - Alt+Backspace', () => {
  const send = jest.fn()
  runTest({ key: 'Backspace', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\x17`)
})

test('key - Shift+Backspace', () => {
  const send = jest.fn()
  runTest({ key: 'Backspace', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0008`)
})

test('key - Tab', () => {
  const send = jest.fn()
  runTest({ key: 'Tab' }, send)
  expect(send).toHaveBeenCalledWith(`\t`)
})

test('key - Shift+Tab', () => {
  const send = jest.fn()
  runTest({ key: 'Tab', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[Z`)
})

test('key - Escape', () => {
  const send = jest.fn()
  runTest({ key: 'Escape' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b`)
})

test('key - Control', () => {
  const send = jest.fn()
  runTest({ key: 'Control' }, send)
  expect(send).not.toHaveBeenCalled()
})

test('key - a', () => {
  const send = jest.fn()
  runTest({ key: 'a' }, send)
  expect(send).toHaveBeenCalledWith(`a`)
})

test('key - Ctrl+a', () => {
  const send = jest.fn()
  runTest({ key: 'a', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0001`)
})

test('key - b', () => {
  const send = jest.fn()
  runTest({ key: 'b' }, send)
  expect(send).toHaveBeenCalledWith(`b`)
})

test('key - Ctrl+b', () => {
  const send = jest.fn()
  runTest({ key: 'b', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0002`)
})

test('key - c', () => {
  const send = jest.fn()
  runTest({ key: 'c' }, send)
  expect(send).toHaveBeenCalledWith(`c`)
})

test('key - Ctrl+c', () => {
  const send = jest.fn()
  runTest({ key: 'c', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0003`)
})

test('key - d', () => {
  const send = jest.fn()
  runTest({ key: 'd' }, send)
  expect(send).toHaveBeenCalledWith(`d`)
})

test('key - Ctrl+d', () => {
  const send = jest.fn()
  runTest({ key: 'd', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0004`)
})

test('key - e', () => {
  const send = jest.fn()
  runTest({ key: 'e' }, send)
  expect(send).toHaveBeenCalledWith(`e`)
})

test('key - Ctrl+e', () => {
  const send = jest.fn()
  runTest({ key: 'e', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0005`)
})

test('key - f', () => {
  const send = jest.fn()
  runTest({ key: 'f' }, send)
  expect(send).toHaveBeenCalledWith(`f`)
})

test('key - Ctrl+f', () => {
  const send = jest.fn()
  runTest({ key: 'f', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0006`)
})

test('key - g', () => {
  const send = jest.fn()
  runTest({ key: 'g' }, send)
  expect(send).toHaveBeenCalledWith('g')
})

test('key - Ctrl+g', () => {
  const send = jest.fn()
  runTest({ key: 'g', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0007`)
})

test('key - h', () => {
  const send = jest.fn()
  runTest({ key: 'h' }, send)
  expect(send).toHaveBeenCalledWith('h')
})

test('key - Ctrl+h', () => {
  const send = jest.fn()
  runTest({ key: 'h', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0008`)
})

test('key - i', () => {
  const send = jest.fn()
  runTest({ key: 'i' }, send)
  expect(send).toHaveBeenCalledWith('i')
})

test('key - Ctrl+i', () => {
  const send = jest.fn()
  runTest({ key: 'i', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0009`)
})

test('key - j', () => {
  const send = jest.fn()
  runTest({ key: 'j' }, send)
  expect(send).toHaveBeenCalledWith('j')
})

test('key - Ctrl+j', () => {
  const send = jest.fn()
  runTest({ key: 'j', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000a`)
})

test('key - k', () => {
  const send = jest.fn()
  runTest({ key: 'k' }, send)
  expect(send).toHaveBeenCalledWith('k')
})

test('key - Ctrl+k', () => {
  const send = jest.fn()
  runTest({ key: 'k', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000b`)
})

test('key - l', () => {
  const send = jest.fn()
  runTest({ key: 'l' }, send)
  expect(send).toHaveBeenCalledWith('l')
})

test('key - Ctrl+l', () => {
  const send = jest.fn()
  runTest({ key: 'l', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000c`)
})

test('key - m', () => {
  const send = jest.fn()
  runTest({ key: 'm' }, send)
  expect(send).toHaveBeenCalledWith('m')
})

test('key - Ctrl+m', () => {
  const send = jest.fn()
  runTest({ key: 'm', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000d`)
})

test('key - n', () => {
  const send = jest.fn()
  runTest({ key: 'n' }, send)
  expect(send).toHaveBeenCalledWith('n')
})

test('key - Ctrl+n', () => {
  const send = jest.fn()
  runTest({ key: 'n', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000e`)
})

test('key - o', () => {
  const send = jest.fn()
  runTest({ key: 'o' }, send)
  expect(send).toHaveBeenCalledWith('o')
})

test('key - Ctrl+o', () => {
  const send = jest.fn()
  runTest({ key: 'o', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000f`)
})

test('key - p', () => {
  const send = jest.fn()
  runTest({ key: 'p' }, send)
  expect(send).toHaveBeenCalledWith('p')
})

test('key - Ctrl+p', () => {
  const send = jest.fn()
  runTest({ key: 'p', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0010`)
})

test('key - q', () => {
  const send = jest.fn()
  runTest({ key: 'q' }, send)
  expect(send).toHaveBeenCalledWith('q')
})

test('key - Ctrl+q', () => {
  const send = jest.fn()
  runTest({ key: 'q', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0011`)
})

test('key - r', () => {
  const send = jest.fn()
  runTest({ key: 'r' }, send)
  expect(send).toHaveBeenCalledWith('r')
})

test('key - Ctrl+r', () => {
  const send = jest.fn()
  runTest({ key: 'r', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0012`)
})

test('key - s', () => {
  const send = jest.fn()
  runTest({ key: 's' }, send)
  expect(send).toHaveBeenCalledWith('s')
})

test('key - Ctrl+s', () => {
  const send = jest.fn()
  runTest({ key: 's', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0013`)
})

test('key - t', () => {
  const send = jest.fn()
  runTest({ key: 't' }, send)
  expect(send).toHaveBeenCalledWith('t')
})

test('key - Ctrl+t', () => {
  const send = jest.fn()
  runTest({ key: 't', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0014`)
})

test('key - u', () => {
  const send = jest.fn()
  runTest({ key: 'u' }, send)
  expect(send).toHaveBeenCalledWith('u')
})

test('key - Ctrl+u', () => {
  const send = jest.fn()
  runTest({ key: 'u', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0015`)
})

test('key - v', () => {
  const send = jest.fn()
  runTest({ key: 'v' }, send)
  expect(send).toHaveBeenCalledWith('v')
})

test('key - Ctrl+v', () => {
  const send = jest.fn()
  runTest({ key: 'v', ctrlKey: true }, send)
  expect(send).not.toHaveBeenCalled()
})

test('key - w', () => {
  const send = jest.fn()
  runTest({ key: 'w' }, send)
  expect(send).toHaveBeenCalledWith('w')
})

test('key - Ctrl+w', () => {
  const send = jest.fn()
  runTest({ key: 'w', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0017`)
})

test('key - x', () => {
  const send = jest.fn()
  runTest({ key: 'x' }, send)
  expect(send).toHaveBeenCalledWith('x')
})

test('key - Ctrl+x', () => {
  const send = jest.fn()
  runTest({ key: 'x', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0018`)
})

test('key - y', () => {
  const send = jest.fn()
  runTest({ key: 'y' }, send)
  expect(send).toHaveBeenCalledWith('y')
})

test('key - Ctrl+y', () => {
  const send = jest.fn()
  runTest({ key: 'y', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0019`)
})

test('key - z', () => {
  const send = jest.fn()
  runTest({ key: 'z' }, send)
  expect(send).toHaveBeenCalledWith('z')
})

test('key - Ctrl+z', () => {
  const send = jest.fn()
  runTest({ key: 'z', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001a`)
})

test('key - F1', () => {
  const send = jest.fn()
  runTest({ key: 'F1' }, send)
  expect(send).toHaveBeenCalledWith(`\x1bOP`)
})

test('key - F2', () => {
  const send = jest.fn()
  runTest({ key: 'F2' }, send)
  expect(send).toHaveBeenCalledWith(`\x1bOQ`)
})

test('key - F3', () => {
  const send = jest.fn()
  runTest({ key: 'F3' }, send)
  expect(send).toHaveBeenCalledWith(`\x1bOR`)
})

test('key - F4', () => {
  const send = jest.fn()
  runTest({ key: 'F4' }, send)
  expect(send).toHaveBeenCalledWith(`\x1bOS`)
})

test('key - F5', () => {
  const send = jest.fn()
  runTest({ key: 'F5' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[15~`)
})

test('key - F6', () => {
  const send = jest.fn()
  runTest({ key: 'F6' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[17~`)
})

test('key - F7', () => {
  const send = jest.fn()
  runTest({ key: 'F7' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[18~`)
})

test('key - F8', () => {
  const send = jest.fn()
  runTest({ key: 'F8' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[19~`)
})

test('key - F9', () => {
  const send = jest.fn()
  runTest({ key: 'F9' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[20~`)
})

test('key - F10', () => {
  const send = jest.fn()
  runTest({ key: 'F10' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[21~`)
})

test('key - F11', () => {
  const send = jest.fn()
  runTest({ key: 'F11' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[23~`)
})

test('key - F12', () => {
  const send = jest.fn()
  runTest({ key: 'F12' }, send)
  expect(send).toHaveBeenCalledWith(`\x1b[24~`)
})

test('key - /', () => {
  const send = jest.fn()
  runTest({ key: '/' }, send)
  expect(send).toHaveBeenCalledWith(`/`)
})
