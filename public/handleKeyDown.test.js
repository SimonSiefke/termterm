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

test('key - A', () => {
  const send = jest.fn()
  runTest({ key: 'A' }, send)
  expect(send).toHaveBeenCalledWith(`A`)
})

test('key - B', () => {
  const send = jest.fn()
  runTest({ key: 'B' }, send)
  expect(send).toHaveBeenCalledWith('B')
})

test('key - C', () => {
  const send = jest.fn()
  runTest({ key: 'C' }, send)
  expect(send).toHaveBeenCalledWith('C')
})

test('key - D', () => {
  const send = jest.fn()
  runTest({ key: 'D' }, send)
  expect(send).toHaveBeenCalledWith('D')
})

test('key - E', () => {
  const send = jest.fn()
  runTest({ key: 'E' }, send)
  expect(send).toHaveBeenCalledWith('E')
})

test('key - F', () => {
  const send = jest.fn()
  runTest({ key: 'F' }, send)
  expect(send).toHaveBeenCalledWith('F')
})

test('key - G', () => {
  const send = jest.fn()
  runTest({ key: 'G' }, send)
  expect(send).toHaveBeenCalledWith('G')
})

test('key - H', () => {
  const send = jest.fn()
  runTest({ key: 'H' }, send)
  expect(send).toHaveBeenCalledWith('H')
})

test('key - I', () => {
  const send = jest.fn()
  runTest({ key: 'I' }, send)
  expect(send).toHaveBeenCalledWith('I')
})

test('key - J', () => {
  const send = jest.fn()
  runTest({ key: 'J' }, send)
  expect(send).toHaveBeenCalledWith('J')
})

test('key - K', () => {
  const send = jest.fn()
  runTest({ key: 'K' }, send)
  expect(send).toHaveBeenCalledWith('K')
})

test('key - L', () => {
  const send = jest.fn()
  runTest({ key: 'L' }, send)
  expect(send).toHaveBeenCalledWith('L')
})

test('key - M', () => {
  const send = jest.fn()
  runTest({ key: 'M' }, send)
  expect(send).toHaveBeenCalledWith('M')
})

test('key - N', () => {
  const send = jest.fn()
  runTest({ key: 'N' }, send)
  expect(send).toHaveBeenCalledWith('N')
})

test('key - O', () => {
  const send = jest.fn()
  runTest({ key: 'O' }, send)
  expect(send).toHaveBeenCalledWith('O')
})

test('key - P', () => {
  const send = jest.fn()
  runTest({ key: 'P' }, send)
  expect(send).toHaveBeenCalledWith('P')
})

test('key - Q', () => {
  const send = jest.fn()
  runTest({ key: 'Q' }, send)
  expect(send).toHaveBeenCalledWith('Q')
})

test('key - R', () => {
  const send = jest.fn()
  runTest({ key: 'R' }, send)
  expect(send).toHaveBeenCalledWith('R')
})

test('key - S', () => {
  const send = jest.fn()
  runTest({ key: 'S' }, send)
  expect(send).toHaveBeenCalledWith('S')
})

test('key - T', () => {
  const send = jest.fn()
  runTest({ key: 'T' }, send)
  expect(send).toHaveBeenCalledWith('T')
})

test('key - U', () => {
  const send = jest.fn()
  runTest({ key: 'U' }, send)
  expect(send).toHaveBeenCalledWith('U')
})

test('key - V', () => {
  const send = jest.fn()
  runTest({ key: 'V' }, send)
  expect(send).toHaveBeenCalledWith('V')
})

test('key - W', () => {
  const send = jest.fn()
  runTest({ key: 'W' }, send)
  expect(send).toHaveBeenCalledWith('W')
})

test('key - X', () => {
  const send = jest.fn()
  runTest({ key: 'X' }, send)
  expect(send).toHaveBeenCalledWith('X')
})

test('key - Y', () => {
  const send = jest.fn()
  runTest({ key: 'Y' }, send)
  expect(send).toHaveBeenCalledWith('Y')
})

test('key - Z', () => {
  const send = jest.fn()
  runTest({ key: 'Z' }, send)
  expect(send).toHaveBeenCalledWith('Z')
})

test('key - Ctrl+A', () => {
  const send = jest.fn()
  runTest({ key: 'A', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0001`)
})

test('key - Ctrl+B', () => {
  const send = jest.fn()
  runTest({ key: 'B', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0002')
})

test('key - Ctrl+C', () => {
  const send = jest.fn()
  runTest({ key: 'C', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0003')
})

test('key - Ctrl+D', () => {
  const send = jest.fn()
  runTest({ key: 'D', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0004')
})

test('key - Ctrl+E', () => {
  const send = jest.fn()
  runTest({ key: 'E', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0005')
})

test('key - Ctrl+F', () => {
  const send = jest.fn()
  runTest({ key: 'F', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0006')
})

test('key - Ctrl+G', () => {
  const send = jest.fn()
  runTest({ key: 'G', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0007')
})

test('key - Ctrl+H', () => {
  const send = jest.fn()
  runTest({ key: 'H', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0008')
})

test('key - Ctrl+I', () => {
  const send = jest.fn()
  runTest({ key: 'I', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0009')
})

test('key - Ctrl+J', () => {
  const send = jest.fn()
  runTest({ key: 'J', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u000a')
})

test('key - Ctrl+K', () => {
  const send = jest.fn()
  runTest({ key: 'K', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u000b')
})

test('key - Ctrl+L', () => {
  const send = jest.fn()
  runTest({ key: 'L', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u000c')
})

test('key - Ctrl+M', () => {
  const send = jest.fn()
  runTest({ key: 'M', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u000d')
})

test('key - Ctrl+N', () => {
  const send = jest.fn()
  runTest({ key: 'N', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u000e')
})

test('key - Ctrl+O', () => {
  const send = jest.fn()
  runTest({ key: 'O', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u000f')
})

test('key - Ctrl+P', () => {
  const send = jest.fn()
  runTest({ key: 'P', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0010')
})

test('key - Ctrl+Q', () => {
  const send = jest.fn()
  runTest({ key: 'Q', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0011')
})

test('key - Ctrl+R', () => {
  const send = jest.fn()
  runTest({ key: 'R', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0012')
})

test('key - Ctrl+S', () => {
  const send = jest.fn()
  runTest({ key: 'S', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0013')
})

test('key - Ctrl+T', () => {
  const send = jest.fn()
  runTest({ key: 'T', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0014')
})

test('key - Ctrl+U', () => {
  const send = jest.fn()
  runTest({ key: 'U', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0015')
})

test('key - Ctrl+V', () => {
  const send = jest.fn()
  runTest({ key: 'V', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0016')
})

test('key - Ctrl+W', () => {
  const send = jest.fn()
  runTest({ key: 'W', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0017')
})

test('key - Ctrl+X', () => {
  const send = jest.fn()
  runTest({ key: 'X', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0018')
})

test('key - Ctrl+Y', () => {
  const send = jest.fn()
  runTest({ key: 'Y', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u0019')
})

test('key - Ctrl+Z', () => {
  const send = jest.fn()
  runTest({ key: 'Z', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith('\u001a')
})

test('key - Shift', () => {
  const send = jest.fn()
  runTest({ key: 'Shift' }, send)
  expect(send).not.toHaveBeenCalled()
})

test('key - Alt', () => {
  const send = jest.fn()
  runTest({ key: 'Alt' }, send)
  expect(send).not.toHaveBeenCalled()
})

test('key - Insert', () => {
  const send = jest.fn()
  runTest({ key: 'Insert' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[2~`)
})

test('key - Delete', () => {
  const send = jest.fn()
  runTest({ key: 'Delete' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[3~`)
})

test('key - Shift+Delete', () => {
  const send = jest.fn()
  runTest({ key: 'Delete', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[3;2~`)
})

test('key - Ctrl+Delete', () => {
  const send = jest.fn()
  runTest({ key: 'Delete', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[3;5~`)
})

test('key - Ctrl+Shift+Delete', () => {
  const send = jest.fn()
  runTest({ key: 'Delete', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[3;6~`)
})

test('key - ArrowUp', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowUp' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[A`)
})

test('key - Ctrl+ArrowUp', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowUp', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;5A`)
})

test('key - Ctrl+Shift+ArrowUp', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowUp', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;6A`)
})

test('key - ArrowDown', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowDown' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[B`)
})

test('key - Ctrl+ArrowDown', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowDown', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;5B`)
})

test('key - Ctrl+Shift+ArrowDown', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowDown', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;6B`)
})

test('key - ArrowRight', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowRight' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[C`)
})

test('key - Ctrl+ArrowRight', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowRight', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;5C`)
})

test('key - Ctrl+Shift+ArrowRight', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowRight', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;6C`)
})

test('key - ArrowLeft', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowLeft' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[D`)
})

test('key - Ctrl+ArrowLeft', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowLeft', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;5D`)
})

test('key - Ctrl+Shift+ArrowLeft', () => {
  const send = jest.fn()
  runTest({ key: 'ArrowLeft', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;6D`)
})

test('key - Enter', () => {
  const send = jest.fn()
  runTest({ key: 'Enter' }, send)
  expect(send).toHaveBeenCalledWith(`\n`)
})

test('key - Alt+Enter', () => {
  const send = jest.fn()
  runTest({ key: 'Enter', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b\r`)
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
  expect(send).toHaveBeenCalledWith(`\u001b[Z`)
})

test('key - Escape', () => {
  const send = jest.fn()
  runTest({ key: 'Escape' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b`)
})

test('key - Alt+Escape', () => {
  const send = jest.fn()
  runTest({ key: 'Escape', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b\u001b`)
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

test('key - b', () => {
  const send = jest.fn()
  runTest({ key: 'b' }, send)
  expect(send).toHaveBeenCalledWith(`b`)
})

test('key - c', () => {
  const send = jest.fn()
  runTest({ key: 'c' }, send)
  expect(send).toHaveBeenCalledWith(`c`)
})

test('key - d', () => {
  const send = jest.fn()
  runTest({ key: 'd' }, send)
  expect(send).toHaveBeenCalledWith(`d`)
})

test('key - e', () => {
  const send = jest.fn()
  runTest({ key: 'e' }, send)
  expect(send).toHaveBeenCalledWith(`e`)
})

test('key - f', () => {
  const send = jest.fn()
  runTest({ key: 'f' }, send)
  expect(send).toHaveBeenCalledWith(`f`)
})

test('key - g', () => {
  const send = jest.fn()
  runTest({ key: 'g' }, send)
  expect(send).toHaveBeenCalledWith('g')
})

test('key - j', () => {
  const send = jest.fn()
  runTest({ key: 'j' }, send)
  expect(send).toHaveBeenCalledWith('j')
})

test('key - h', () => {
  const send = jest.fn()
  runTest({ key: 'h' }, send)
  expect(send).toHaveBeenCalledWith('h')
})

test('key - i', () => {
  const send = jest.fn()
  runTest({ key: 'i' }, send)
  expect(send).toHaveBeenCalledWith('i')
})

test('key - k', () => {
  const send = jest.fn()
  runTest({ key: 'k' }, send)
  expect(send).toHaveBeenCalledWith('k')
})

test('key - l', () => {
  const send = jest.fn()
  runTest({ key: 'l' }, send)
  expect(send).toHaveBeenCalledWith('l')
})

test('key - m', () => {
  const send = jest.fn()
  runTest({ key: 'm' }, send)
  expect(send).toHaveBeenCalledWith('m')
})

test('key - n', () => {
  const send = jest.fn()
  runTest({ key: 'n' }, send)
  expect(send).toHaveBeenCalledWith('n')
})

test('key - o', () => {
  const send = jest.fn()
  runTest({ key: 'o' }, send)
  expect(send).toHaveBeenCalledWith('o')
})

test('key - p', () => {
  const send = jest.fn()
  runTest({ key: 'p' }, send)
  expect(send).toHaveBeenCalledWith('p')
})

test('key - q', () => {
  const send = jest.fn()
  runTest({ key: 'q' }, send)
  expect(send).toHaveBeenCalledWith('q')
})

test('key - r', () => {
  const send = jest.fn()
  runTest({ key: 'r' }, send)
  expect(send).toHaveBeenCalledWith('r')
})

test('key - s', () => {
  const send = jest.fn()
  runTest({ key: 's' }, send)
  expect(send).toHaveBeenCalledWith('s')
})

test('key - t', () => {
  const send = jest.fn()
  runTest({ key: 't' }, send)
  expect(send).toHaveBeenCalledWith('t')
})

test('key - u', () => {
  const send = jest.fn()
  runTest({ key: 'u' }, send)
  expect(send).toHaveBeenCalledWith('u')
})

test('key - v', () => {
  const send = jest.fn()
  runTest({ key: 'v' }, send)
  expect(send).toHaveBeenCalledWith('v')
})

test('key - w', () => {
  const send = jest.fn()
  runTest({ key: 'w' }, send)
  expect(send).toHaveBeenCalledWith('w')
})

test('key - x', () => {
  const send = jest.fn()
  runTest({ key: 'x' }, send)
  expect(send).toHaveBeenCalledWith('x')
})

test('key - y', () => {
  const send = jest.fn()
  runTest({ key: 'y' }, send)
  expect(send).toHaveBeenCalledWith('y')
})

test('key - z', () => {
  const send = jest.fn()
  runTest({ key: 'z' }, send)
  expect(send).toHaveBeenCalledWith('z')
})

test('key - Ctrl+a', () => {
  const send = jest.fn()
  runTest({ key: 'a', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0001`)
})

test('key - Ctrl+b', () => {
  const send = jest.fn()
  runTest({ key: 'b', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0002`)
})

test('key - Ctrl+c', () => {
  const send = jest.fn()
  runTest({ key: 'c', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0003`)
})

test('key - Ctrl+d', () => {
  const send = jest.fn()
  runTest({ key: 'd', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0004`)
})

test('key - Ctrl+e', () => {
  const send = jest.fn()
  runTest({ key: 'e', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0005`)
})

test('key - Ctrl+f', () => {
  const send = jest.fn()
  runTest({ key: 'f', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0006`)
})

test('key - Ctrl+g', () => {
  const send = jest.fn()
  runTest({ key: 'g', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0007`)
})

test('key - Ctrl+h', () => {
  const send = jest.fn()
  runTest({ key: 'h', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0008`)
})

test('key - Ctrl+i', () => {
  const send = jest.fn()
  runTest({ key: 'i', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0009`)
})

test('key - Ctrl+j', () => {
  const send = jest.fn()
  runTest({ key: 'j', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000a`)
})

test('key - Ctrl+k', () => {
  const send = jest.fn()
  runTest({ key: 'k', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000b`)
})

test('key - Ctrl+l', () => {
  const send = jest.fn()
  runTest({ key: 'l', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000c`)
})

test('key - Ctrl+m', () => {
  const send = jest.fn()
  runTest({ key: 'm', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000d`)
})

test('key - Ctrl+n', () => {
  const send = jest.fn()
  runTest({ key: 'n', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000e`)
})

test('key - Ctrl+o', () => {
  const send = jest.fn()
  runTest({ key: 'o', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u000f`)
})

test('key - Ctrl+p', () => {
  const send = jest.fn()
  runTest({ key: 'p', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0010`)
})

test('key - Ctrl+q', () => {
  const send = jest.fn()
  runTest({ key: 'q', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0011`)
})

test('key - Ctrl+r', () => {
  const send = jest.fn()
  runTest({ key: 'r', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0012`)
})

test('key - Ctrl+s', () => {
  const send = jest.fn()
  runTest({ key: 's', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0013`)
})

test('key - Ctrl+t', () => {
  const send = jest.fn()
  runTest({ key: 't', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0014`)
})

test('key - Ctrl+u', () => {
  const send = jest.fn()
  runTest({ key: 'u', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0015`)
})

test('key - Ctrl+v', () => {
  const send = jest.fn()
  runTest({ key: 'v', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0016`)
})

test('key - Ctrl+w', () => {
  const send = jest.fn()
  runTest({ key: 'w', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0017`)
})

test('key - Ctrl+x', () => {
  const send = jest.fn()
  runTest({ key: 'x', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0018`)
})

test('key - Ctrl+y', () => {
  const send = jest.fn()
  runTest({ key: 'y', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0019`)
})

test('key - Ctrl+z', () => {
  const send = jest.fn()
  runTest({ key: 'z', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001a`)
})

test('key - F1', () => {
  const send = jest.fn()
  runTest({ key: 'F1' }, send)
  expect(send).toHaveBeenCalledWith(`\u001bOP`)
})

test('key - F2', () => {
  const send = jest.fn()
  runTest({ key: 'F2' }, send)
  expect(send).toHaveBeenCalledWith(`\u001bOQ`)
})

test('key - F3', () => {
  const send = jest.fn()
  runTest({ key: 'F3' }, send)
  expect(send).toHaveBeenCalledWith(`\u001bOR`)
})

test('key - F4', () => {
  const send = jest.fn()
  runTest({ key: 'F4' }, send)
  expect(send).toHaveBeenCalledWith(`\u001bOS`)
})

test('key - F5', () => {
  const send = jest.fn()
  runTest({ key: 'F5' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[15~`)
})

test('key - F6', () => {
  const send = jest.fn()
  runTest({ key: 'F6' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[17~`)
})

test('key - F7', () => {
  const send = jest.fn()
  runTest({ key: 'F7' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[18~`)
})

test('key - F8', () => {
  const send = jest.fn()
  runTest({ key: 'F8' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[19~`)
})

test('key - F9', () => {
  const send = jest.fn()
  runTest({ key: 'F9' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[20~`)
})

test('key - F10', () => {
  const send = jest.fn()
  runTest({ key: 'F10' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[21~`)
})

test('key - F11', () => {
  const send = jest.fn()
  runTest({ key: 'F11' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[23~`)
})

test('key - F12', () => {
  const send = jest.fn()
  runTest({ key: 'F12' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[24~`)
})

test('key - /', () => {
  const send = jest.fn()
  runTest({ key: '/' }, send)
  expect(send).toHaveBeenCalledWith(`/`)
})

test('key - 0', () => {
  const send = jest.fn()
  runTest({ key: '0' }, send)
  expect(send).toHaveBeenCalledWith(`0`)
})

test('key - 1', () => {
  const send = jest.fn()
  runTest({ key: '1' }, send)
  expect(send).toHaveBeenCalledWith(`1`)
})

test('key - 2', () => {
  const send = jest.fn()
  runTest({ key: '2' }, send)
  expect(send).toHaveBeenCalledWith(`2`)
})

test('key - 3', () => {
  const send = jest.fn()
  runTest({ key: '3' }, send)
  expect(send).toHaveBeenCalledWith(`3`)
})

test('key - 4', () => {
  const send = jest.fn()
  runTest({ key: '4' }, send)
  expect(send).toHaveBeenCalledWith(`4`)
})

test('key - 5', () => {
  const send = jest.fn()
  runTest({ key: '5' }, send)
  expect(send).toHaveBeenCalledWith(`5`)
})

test('key - 6', () => {
  const send = jest.fn()
  runTest({ key: '6' }, send)
  expect(send).toHaveBeenCalledWith(`6`)
})

test('key - 7', () => {
  const send = jest.fn()
  runTest({ key: '7' }, send)
  expect(send).toHaveBeenCalledWith(`7`)
})

test('key - 8', () => {
  const send = jest.fn()
  runTest({ key: '8' }, send)
  expect(send).toHaveBeenCalledWith(`8`)
})

test('key - 9', () => {
  const send = jest.fn()
  runTest({ key: '9' }, send)
  expect(send).toHaveBeenCalledWith(`9`)
})

test('key - Alt+0', () => {
  const send = jest.fn()
  runTest({ key: '0', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b0`)
})

test('key - Alt+1', () => {
  const send = jest.fn()
  runTest({ key: '1', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b1`)
})

test('key - Alt+2', () => {
  const send = jest.fn()
  runTest({ key: '2', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b2`)
})

test('key - Alt+3', () => {
  const send = jest.fn()
  runTest({ key: '3', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b3`)
})

test('key - Alt+4', () => {
  const send = jest.fn()
  runTest({ key: '4', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b4`)
})

test('key - Alt+5', () => {
  const send = jest.fn()
  runTest({ key: '5', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b5`)
})

test('key - Alt+6', () => {
  const send = jest.fn()
  runTest({ key: '6', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b6`)
})

test('key - Alt+7', () => {
  const send = jest.fn()
  runTest({ key: '7', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b7`)
})

test('key - Alt+8', () => {
  const send = jest.fn()
  runTest({ key: '8', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b8`)
})

test('key - Alt+9', () => {
  const send = jest.fn()
  runTest({ key: '9', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b9`)
})

test('key - )', () => {
  const send = jest.fn()
  runTest({ key: ')', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`)`)
})

test('key - !', () => {
  const send = jest.fn()
  runTest({ key: '!', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`!`)
})

test('key - @', () => {
  const send = jest.fn()
  runTest({ key: '@', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`@`)
})

test('key - #', () => {
  const send = jest.fn()
  runTest({ key: '#', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`#`)
})

test('key - $', () => {
  const send = jest.fn()
  runTest({ key: '$', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`$`)
})

test('key - %', () => {
  const send = jest.fn()
  runTest({ key: '%', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`%`)
})

test('key - ^', () => {
  const send = jest.fn()
  runTest({ key: '^', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`^`)
})

test('key - &', () => {
  const send = jest.fn()
  runTest({ key: '&', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`&`)
})

test('key - *', () => {
  const send = jest.fn()
  runTest({ key: '*', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`*`)
})

test('key - (', () => {
  const send = jest.fn()
  runTest({ key: '(', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`(`)
})

test('key - -', () => {
  const send = jest.fn()
  runTest({ key: '-' }, send)
  expect(send).toHaveBeenCalledWith(`-`)
})

test('key - _', () => {
  const send = jest.fn()
  runTest({ key: '_' }, send)
  expect(send).toHaveBeenCalledWith(`_`)
})

test('key - +', () => {
  const send = jest.fn()
  runTest({ key: '+' }, send)
  expect(send).toHaveBeenCalledWith(`+`)
})

test('key - =', () => {
  const send = jest.fn()
  runTest({ key: '=' }, send)
  expect(send).toHaveBeenCalledWith(`=`)
})

test('key - ,', () => {
  const send = jest.fn()
  runTest({ key: ',' }, send)
  expect(send).toHaveBeenCalledWith(`,`)
})

test('key - .', () => {
  const send = jest.fn()
  runTest({ key: '.' }, send)
  expect(send).toHaveBeenCalledWith(`.`)
})

test('key - <', () => {
  const send = jest.fn()
  runTest({ key: '<' }, send)
  expect(send).toHaveBeenCalledWith(`<`)
})

test('key - >', () => {
  const send = jest.fn()
  runTest({ key: '>' }, send)
  expect(send).toHaveBeenCalledWith(`>`)
})

test('key - {', () => {
  const send = jest.fn()
  runTest({ key: '{' }, send)
  expect(send).toHaveBeenCalledWith(`{`)
})

test('key - }', () => {
  const send = jest.fn()
  runTest({ key: '}' }, send)
  expect(send).toHaveBeenCalledWith(`}`)
})

test('key - [', () => {
  const send = jest.fn()
  runTest({ key: '[' }, send)
  expect(send).toHaveBeenCalledWith(`[`)
})

test('key - ]', () => {
  const send = jest.fn()
  runTest({ key: ']' }, send)
  expect(send).toHaveBeenCalledWith(`]`)
})

test('key - \\', () => {
  const send = jest.fn()
  runTest({ key: '\\' }, send)
  expect(send).toHaveBeenCalledWith(`\\`)
})

test('key - |', () => {
  const send = jest.fn()
  runTest({ key: '|' }, send)
  expect(send).toHaveBeenCalledWith(`|`)
})

test('key - `', () => {
  const send = jest.fn()
  runTest({ key: '`' }, send)
  expect(send).toHaveBeenCalledWith('`')
})

test('key - ~', () => {
  const send = jest.fn()
  runTest({ key: '~' }, send)
  expect(send).toHaveBeenCalledWith('~')
})

test('key - Alt+)', () => {
  const send = jest.fn()
  runTest({ key: ')', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b)`)
})

test('key - Alt+!', () => {
  const send = jest.fn()
  runTest({ key: '!', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b!`)
})

test('key - Alt+@', () => {
  const send = jest.fn()
  runTest({ key: '@', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b@`)
})

test('key - Alt+#', () => {
  const send = jest.fn()
  runTest({ key: '#', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b#`)
})

test('key - Alt+$', () => {
  const send = jest.fn()
  runTest({ key: '$', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b$`)
})

test('key - Alt+%', () => {
  const send = jest.fn()
  runTest({ key: '%', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b%`)
})

test('key - Alt+^', () => {
  const send = jest.fn()
  runTest({ key: '^', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b^`)
})

test('key - Alt+&', () => {
  const send = jest.fn()
  runTest({ key: '&', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b&`)
})

test('key - Alt+*', () => {
  const send = jest.fn()
  runTest({ key: '*', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b*`)
})

test('key - Alt+(', () => {
  const send = jest.fn()
  runTest({ key: '(', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b(`)
})

test('key - UIKeyInputUpArrow', () => {
  const send = jest.fn()
  runTest({ key: 'UIKeyInputUpArrow' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[A`)
})

test('key - UIKeyInputDownArrow', () => {
  const send = jest.fn()
  runTest({ key: 'UIKeyInputDownArrow' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[B`)
})

test('key - UIKeyInputRightArrow', () => {
  const send = jest.fn()
  runTest({ key: 'UIKeyInputRightArrow' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[C`)
})

test('key - UIKeyInputLeftArrow', () => {
  const send = jest.fn()
  runTest({ key: 'UIKeyInputLeftArrow' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[D`)
})
