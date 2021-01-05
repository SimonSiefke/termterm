import { jest } from '@jest/globals'
import { createHandleKeyDown } from './handleKeyDown.js'

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
  createHandleKeyDown(send)({ key, preventDefault, shiftKey, altKey, ctrlKey })
}

test('key 33', () => {
  const send = jest.fn()
  runTest({ key: '!', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`!`)
})

test('key 34', () => {
  const send = jest.fn()
  runTest({ key: '"', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`"`)
})

test('key 35', () => {
  const send = jest.fn()
  runTest({ key: '#', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`#`)
})

test('key 36', () => {
  const send = jest.fn()
  runTest({ key: '$', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`$`)
})

test('key 37', () => {
  const send = jest.fn()
  runTest({ key: '%', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`%`)
})

test('key 38', () => {
  const send = jest.fn()
  runTest({ key: '&', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`&`)
})

test('key 39', () => {
  const send = jest.fn()
  runTest({ key: "'", shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`'`)
})

test('key 40', () => {
  const send = jest.fn()
  runTest({ key: '(', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`(`)
})

test('key 41', () => {
  const send = jest.fn()
  runTest({ key: ')', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`)`)
})

test('key 42', () => {
  const send = jest.fn()
  runTest({ key: '*', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`*`)
})

test('key 43', () => {
  const send = jest.fn()
  runTest({ key: '+', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`+`)
})

test('key 44', () => {
  const send = jest.fn()
  runTest({ key: ',' }, send)
  expect(send).toHaveBeenCalledWith(`,`)
})

test('key 45', () => {
  const send = jest.fn()
  runTest({ key: '-' }, send)
  expect(send).toHaveBeenCalledWith(`-`)
})

test('key 46', () => {
  const send = jest.fn()
  runTest({ key: '.' }, send)
  expect(send).toHaveBeenCalledWith(`.`)
})

test('key 47', () => {
  const send = jest.fn()
  runTest({ key: '/' }, send)
  expect(send).toHaveBeenCalledWith(`/`)
})

test('key 48', () => {
  const send = jest.fn()
  runTest({ key: '0' }, send)
  expect(send).toHaveBeenCalledWith(`0`)
})

test('key 49', () => {
  const send = jest.fn()
  runTest({ key: '1' }, send)
  expect(send).toHaveBeenCalledWith(`1`)
})

test('key 50', () => {
  const send = jest.fn()
  runTest({ key: '2' }, send)
  expect(send).toHaveBeenCalledWith(`2`)
})

test('key 51', () => {
  const send = jest.fn()
  runTest({ key: '3' }, send)
  expect(send).toHaveBeenCalledWith(`3`)
})

test('key 52', () => {
  const send = jest.fn()
  runTest({ key: '4' }, send)
  expect(send).toHaveBeenCalledWith(`4`)
})

test('key 53', () => {
  const send = jest.fn()
  runTest({ key: '5' }, send)
  expect(send).toHaveBeenCalledWith(`5`)
})

test('key 54', () => {
  const send = jest.fn()
  runTest({ key: '6' }, send)
  expect(send).toHaveBeenCalledWith(`6`)
})

test('key 55', () => {
  const send = jest.fn()
  runTest({ key: '7' }, send)
  expect(send).toHaveBeenCalledWith(`7`)
})

test('key 56', () => {
  const send = jest.fn()
  runTest({ key: '8' }, send)
  expect(send).toHaveBeenCalledWith(`8`)
})

test('key 57', () => {
  const send = jest.fn()
  runTest({ key: '9' }, send)
  expect(send).toHaveBeenCalledWith(`9`)
})

test('key 58', () => {
  const send = jest.fn()
  runTest({ key: ':', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`:`)
})

test('key 59', () => {
  const send = jest.fn()
  runTest({ key: ';' }, send)
  expect(send).toHaveBeenCalledWith(`;`)
})

test('key 60', () => {
  const send = jest.fn()
  runTest({ key: '<', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`<`)
})

test('key 61', () => {
  const send = jest.fn()
  runTest({ key: '=' }, send)
  expect(send).toHaveBeenCalledWith(`=`)
})

test('key 62', () => {
  const send = jest.fn()
  runTest({ key: '>', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`>`)
})

test('key 63', () => {
  const send = jest.fn()
  runTest({ key: '?', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`?`)
})

test('key 64', () => {
  const send = jest.fn()
  runTest({ key: '@', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`@`)
})

test('key 65', () => {
  const send = jest.fn()
  runTest({ key: 'A', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`A`)
})

test('key 66', () => {
  const send = jest.fn()
  runTest({ key: 'B', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('B')
})

test('key 67', () => {
  const send = jest.fn()
  runTest({ key: 'C', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('C')
})

test('key 68', () => {
  const send = jest.fn()
  runTest({ key: 'D', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('D')
})

test('key 69', () => {
  const send = jest.fn()
  runTest({ key: 'E', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('E')
})

test('key 70', () => {
  const send = jest.fn()
  runTest({ key: 'F', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('F')
})

test('key 71', () => {
  const send = jest.fn()
  runTest({ key: 'G', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('G')
})

test('key 72', () => {
  const send = jest.fn()
  runTest({ key: 'H', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('H')
})

test('key 73', () => {
  const send = jest.fn()
  runTest({ key: 'I', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('I')
})

test('key 74', () => {
  const send = jest.fn()
  runTest({ key: 'J', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('J')
})

test('key 75', () => {
  const send = jest.fn()
  runTest({ key: 'K', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('K')
})

test('key 76', () => {
  const send = jest.fn()
  runTest({ key: 'L', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('L')
})

test('key 77', () => {
  const send = jest.fn()
  runTest({ key: 'M', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('M')
})

test('key 78', () => {
  const send = jest.fn()
  runTest({ key: 'N', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('N')
})

test('key 79', () => {
  const send = jest.fn()
  runTest({ key: 'O', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('O')
})

test('key 80', () => {
  const send = jest.fn()
  runTest({ key: 'P', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('P')
})

test('key 81', () => {
  const send = jest.fn()
  runTest({ key: 'Q', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('Q')
})

test('key 82', () => {
  const send = jest.fn()
  runTest({ key: 'R', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('R')
})

test('key 83', () => {
  const send = jest.fn()
  runTest({ key: 'S', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('S')
})

test('key 84', () => {
  const send = jest.fn()
  runTest({ key: 'T', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('T')
})

test('key 85', () => {
  const send = jest.fn()
  runTest({ key: 'U', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('U')
})

test('key 86', () => {
  const send = jest.fn()
  runTest({ key: 'V', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('V')
})

test('key 87', () => {
  const send = jest.fn()
  runTest({ key: 'W', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('W')
})

test('key 88', () => {
  const send = jest.fn()
  runTest({ key: 'X', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('X')
})

test('key 89', () => {
  const send = jest.fn()
  runTest({ key: 'Y', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('Y')
})

test('key 90', () => {
  const send = jest.fn()
  runTest({ key: 'Z', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('Z')
})

test('key 91', () => {
  const send = jest.fn()
  runTest({ key: '[' }, send)
  expect(send).toHaveBeenCalledWith(`[`)
})

test('key - 92', () => {
  const send = jest.fn()
  runTest({ key: '\\' }, send)
  expect(send).toHaveBeenCalledWith(`\\`)
})

test('key 93', () => {
  const send = jest.fn()
  runTest({ key: ']' }, send)
  expect(send).toHaveBeenCalledWith(`]`)
})

test('key 94', () => {
  const send = jest.fn()
  runTest({ key: '^', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`^`)
})

test('key 95', () => {
  const send = jest.fn()
  runTest({ key: '_', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`_`)
})

test('key 96', () => {
  const send = jest.fn()
  runTest({ key: '`' }, send)
  expect(send).toHaveBeenCalledWith('`')
})

test('key 97', () => {
  const send = jest.fn()
  runTest({ key: 'a' }, send)
  expect(send).toHaveBeenCalledWith(`a`)
})

test('key 98', () => {
  const send = jest.fn()
  runTest({ key: 'b' }, send)
  expect(send).toHaveBeenCalledWith(`b`)
})

test('key 99', () => {
  const send = jest.fn()
  runTest({ key: 'c' }, send)
  expect(send).toHaveBeenCalledWith(`c`)
})

test('key 100', () => {
  const send = jest.fn()
  runTest({ key: 'd' }, send)
  expect(send).toHaveBeenCalledWith(`d`)
})

test('key 101', () => {
  const send = jest.fn()
  runTest({ key: 'e' }, send)
  expect(send).toHaveBeenCalledWith(`e`)
})

test('key 102', () => {
  const send = jest.fn()
  runTest({ key: 'f' }, send)
  expect(send).toHaveBeenCalledWith(`f`)
})

test('key 103', () => {
  const send = jest.fn()
  runTest({ key: 'g' }, send)
  expect(send).toHaveBeenCalledWith('g')
})

test('key 104', () => {
  const send = jest.fn()
  runTest({ key: 'j' }, send)
  expect(send).toHaveBeenCalledWith('j')
})

test('key 105', () => {
  const send = jest.fn()
  runTest({ key: 'h' }, send)
  expect(send).toHaveBeenCalledWith('h')
})

test('key 106', () => {
  const send = jest.fn()
  runTest({ key: 'i' }, send)
  expect(send).toHaveBeenCalledWith('i')
})

test('key 107', () => {
  const send = jest.fn()
  runTest({ key: 'k' }, send)
  expect(send).toHaveBeenCalledWith('k')
})

test('key 108', () => {
  const send = jest.fn()
  runTest({ key: 'l' }, send)
  expect(send).toHaveBeenCalledWith('l')
})

test('key 109', () => {
  const send = jest.fn()
  runTest({ key: 'm' }, send)
  expect(send).toHaveBeenCalledWith('m')
})

test('key 110', () => {
  const send = jest.fn()
  runTest({ key: 'n' }, send)
  expect(send).toHaveBeenCalledWith('n')
})

test('key 111', () => {
  const send = jest.fn()
  runTest({ key: 'o' }, send)
  expect(send).toHaveBeenCalledWith('o')
})

test('key 112', () => {
  const send = jest.fn()
  runTest({ key: 'p' }, send)
  expect(send).toHaveBeenCalledWith('p')
})

test('key 113', () => {
  const send = jest.fn()
  runTest({ key: 'q' }, send)
  expect(send).toHaveBeenCalledWith('q')
})

test('key 114', () => {
  const send = jest.fn()
  runTest({ key: 'r' }, send)
  expect(send).toHaveBeenCalledWith('r')
})

test('key 115', () => {
  const send = jest.fn()
  runTest({ key: 's' }, send)
  expect(send).toHaveBeenCalledWith('s')
})

test('key 116', () => {
  const send = jest.fn()
  runTest({ key: 't' }, send)
  expect(send).toHaveBeenCalledWith('t')
})

test('key 117', () => {
  const send = jest.fn()
  runTest({ key: 'u' }, send)
  expect(send).toHaveBeenCalledWith('u')
})

test('key 118', () => {
  const send = jest.fn()
  runTest({ key: 'v' }, send)
  expect(send).toHaveBeenCalledWith('v')
})

test('key 119', () => {
  const send = jest.fn()
  runTest({ key: 'w' }, send)
  expect(send).toHaveBeenCalledWith('w')
})

test('key 120', () => {
  const send = jest.fn()
  runTest({ key: 'x' }, send)
  expect(send).toHaveBeenCalledWith('x')
})

test('key 121', () => {
  const send = jest.fn()
  runTest({ key: 'y' }, send)
  expect(send).toHaveBeenCalledWith('y')
})

test('key 122', () => {
  const send = jest.fn()
  runTest({ key: 'z' }, send)
  expect(send).toHaveBeenCalledWith('z')
})

test('key 123', () => {
  const send = jest.fn()
  runTest({ key: '{', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`{`)
})

test('key 124', () => {
  const send = jest.fn()
  runTest({ key: '|', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`|`)
})

test('key 125', () => {
  const send = jest.fn()
  runTest({ key: '}', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`}`)
})

test('key 126', () => {
  const send = jest.fn()
  runTest({ key: '~', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith('~')
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

test('key - Shift+Insert', () => {
  const send = jest.fn()
  runTest({ key: 'Insert', shiftKey: true }, send)
  expect(send).not.toHaveBeenCalled()
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

test('key - Alt+Delete', () => {
  const send = jest.fn()
  runTest({ key: 'Delete', altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[3;3~`)
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

test('key - Alt+_', () => {
  const send = jest.fn()
  runTest({ key: '_', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b_`)
})

test('key - Alt+{', () => {
  const send = jest.fn()
  runTest({ key: '{', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b{`)
})

test('key - Alt+}', () => {
  const send = jest.fn()
  runTest({ key: '}', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b}`)
})

test('key - Alt+|', () => {
  const send = jest.fn()
  runTest({ key: '|', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b|`)
})

test('key - Alt+?', () => {
  const send = jest.fn()
  runTest({ key: '?', altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b?`)
})

test('key - Ctrl+!', () => {
  const send = jest.fn()
  runTest({ key: '!', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`!`)
})

test('key - Ctrl+@', () => {
  const send = jest.fn()
  runTest({ key: '@', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u0000`)
})

test('key - Ctrl+#', () => {
  const send = jest.fn()
  runTest({ key: '#', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`#`)
})

test('key - Ctrl+$', () => {
  const send = jest.fn()
  runTest({ key: '$', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`$`)
})

test('key - Ctrl+%', () => {
  const send = jest.fn()
  runTest({ key: '%', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`%`)
})

test('key - Ctrl+^', () => {
  const send = jest.fn()
  runTest({ key: '^', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001e`)
})

test('key - Ctrl+&', () => {
  const send = jest.fn()
  runTest({ key: '&', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`&`)
})

test('key - Ctrl+*', () => {
  const send = jest.fn()
  runTest({ key: '*', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`*`)
})

test('key - Ctrl+(', () => {
  const send = jest.fn()
  runTest({ key: '(', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`(`)
})

test('key - Ctrl+_', () => {
  const send = jest.fn()
  runTest({ key: '_', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001f`)
})

test('key - Ctrl+{', () => {
  const send = jest.fn()
  runTest({ key: '{', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b`)
})

test('key - Ctrl+}', () => {
  const send = jest.fn()
  runTest({ key: '}', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001d`)
})

test('key - Ctrl+|', () => {
  const send = jest.fn()
  runTest({ key: '|', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001c`)
})

test('key - Ctrl+:', () => {
  const send = jest.fn()
  runTest({ key: ':', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`:`)
})

test('key - Ctrl+"', () => {
  const send = jest.fn()
  runTest({ key: '"', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`"`)
})

test('key - Ctrl+?', () => {
  const send = jest.fn()
  runTest({ key: '?', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u007f`)
})

test('key - Ctrl+<', () => {
  const send = jest.fn()
  runTest({ key: '<', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`<`)
})

test('key - Ctrl+>', () => {
  const send = jest.fn()
  runTest({ key: '>', ctrlKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`>`)
})

test('key Ctrl+Alt+a', () => {
  const send = jest.fn()
  runTest({ key: 'a', ctrlKey: true, altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b\u0001`)
})

test('key Ctrl+Alt+A', () => {
  const send = jest.fn()
  runTest({ key: 'A', ctrlKey: true, altKey: true, shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b\u0001`)
})

test('key Ctrl+Alt+,', () => {
  const send = jest.fn()
  runTest({ key: ',', ctrlKey: true, altKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b,`)
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

test('key - AltGraph', () => {
  const send = jest.fn()
  runTest({ key: 'AltGraph' }, send)
  expect(send).not.toHaveBeenCalled()
})

test('key - PageUp', () => {
  const send = jest.fn()
  runTest({ key: 'PageUp' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[5~`)
})

test('key Ctrl+PageUp', () => {
  const send = jest.fn()
  runTest({ key: 'PageUp', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[5;5~`)
})

test('key - PageDown', () => {
  const send = jest.fn()
  runTest({ key: 'PageDown' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[6~`)
})

test('key Ctrl+PageDown', () => {
  const send = jest.fn()
  runTest({ key: 'PageDown', ctrlKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[6;5~`)
})

test('key - End', () => {
  const send = jest.fn()
  runTest({ key: 'End' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[F`)
})

test('key - Shift+End', () => {
  const send = jest.fn()
  runTest({ key: 'End', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;2F`)
})

test('key - Home', () => {
  const send = jest.fn()
  runTest({ key: 'Home' }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[H`)
})

test('key - Shift+Home', () => {
  const send = jest.fn()
  runTest({ key: 'Home', shiftKey: true }, send)
  expect(send).toHaveBeenCalledWith(`\u001b[1;2H`)
})

test('key 😀', () => {
  const send = jest.fn()
  runTest({ key: 'AltGraph' }, send)
  expect(send).not.toHaveBeenCalled()
})
