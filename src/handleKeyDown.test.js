import { transformKey } from './handleKeyDown.js'

test('key 33', () => {
  expect(transformKey({ key: '!', shiftKey: true })).toBe('!')
})

test('key 34', () => {
  expect(transformKey({ key: '"', shiftKey: true })).toBe('"')
})

test('key 35', () => {
  expect(transformKey({ key: '#', shiftKey: true })).toBe('#')
})

test('key 36', () => {
  expect(transformKey({ key: '$', shiftKey: true })).toBe('$')
})

test('key 37', () => {
  expect(transformKey({ key: '%', shiftKey: true })).toBe('%')
})

test('key 38', () => {
  expect(transformKey({ key: '&', shiftKey: true })).toBe('&')
})

test('key 39', () => {
  expect(transformKey({ key: "'", shiftKey: true })).toBe("'")
})

test('key 40', () => {
  expect(transformKey({ key: '(', shiftKey: true })).toBe('(')
})

test('key 41', () => {
  expect(transformKey({ key: ')', shiftKey: true })).toBe(')')
})

test('key 42', () => {
  expect(transformKey({ key: '*', shiftKey: true })).toBe('*')
})

test('key 43', () => {
  expect(transformKey({ key: '+', shiftKey: true })).toBe('+')
})

test('key 44', () => {
  expect(transformKey({ key: ',' })).toBe(',')
})

test('key 45', () => {
  expect(transformKey({ key: '-' })).toBe('-')
})

test('key 46', () => {
  expect(transformKey({ key: '.' })).toBe('.')
})

test('key 47', () => {
  expect(transformKey({ key: '/' })).toBe('/')
})

test('key 48', () => {
  expect(transformKey({ key: '0' })).toBe('0')
})

test('key 49', () => {
  expect(transformKey({ key: '1' })).toBe('1')
})

test('key 50', () => {
  expect(transformKey({ key: '2' })).toBe('2')
})

test('key 51', () => {
  expect(transformKey({ key: '3' })).toBe('3')
})

test('key 52', () => {
  expect(transformKey({ key: '4' })).toBe('4')
})

test('key 53', () => {
  expect(transformKey({ key: '5' })).toBe('5')
})

test('key 54', () => {
  expect(transformKey({ key: '6' })).toBe('6')
})

test('key 55', () => {
  expect(transformKey({ key: '7' })).toBe('7')
})

test('key 56', () => {
  expect(transformKey({ key: '8' })).toBe('8')
})

test('key 57', () => {
  expect(transformKey({ key: '9' })).toBe('9')
})

test('key 58', () => {
  expect(transformKey({ key: ':', shiftKey: true })).toBe(':')
})

test('key 59', () => {
  expect(transformKey({ key: ';' })).toBe(';')
})

test('key 60', () => {
  expect(transformKey({ key: '<', shiftKey: true })).toBe('<')
})

test('key 61', () => {
  expect(transformKey({ key: '=' })).toBe('=')
})

test('key 62', () => {
  expect(transformKey({ key: '>', shiftKey: true })).toBe('>')
})

test('key 63', () => {
  expect(transformKey({ key: '?', shiftKey: true })).toBe('?')
})

test('key 64', () => {
  expect(transformKey({ key: '@', shiftKey: true })).toBe('@')
})

test('key 65', () => {
  expect(transformKey({ key: 'A', shiftKey: true })).toBe('A')
})

test('key 66', () => {
  expect(transformKey({ key: 'B', shiftKey: true })).toBe('B')
})

test('key 67', () => {
  expect(transformKey({ key: 'C', shiftKey: true })).toBe('C')
})

test('key 68', () => {
  expect(transformKey({ key: 'D', shiftKey: true })).toBe('D')
})

test('key 69', () => {
  expect(transformKey({ key: 'E', shiftKey: true })).toBe('E')
})

test('key 70', () => {
  expect(transformKey({ key: 'F', shiftKey: true })).toBe('F')
})

test('key 71', () => {
  expect(transformKey({ key: 'G', shiftKey: true })).toBe('G')
})

test('key 72', () => {
  expect(transformKey({ key: 'H', shiftKey: true })).toBe('H')
})

test('key 73', () => {
  expect(transformKey({ key: 'I', shiftKey: true })).toBe('I')
})

test('key 74', () => {
  expect(transformKey({ key: 'J', shiftKey: true })).toBe('J')
})

test('key 75', () => {
  expect(transformKey({ key: 'K', shiftKey: true })).toBe('K')
})

test('key 76', () => {
  expect(transformKey({ key: 'L', shiftKey: true })).toBe('L')
})

test('key 77', () => {
  expect(transformKey({ key: 'M', shiftKey: true })).toBe('M')
})

test('key 78', () => {
  expect(transformKey({ key: 'N', shiftKey: true })).toBe('N')
})

test('key 79', () => {
  expect(transformKey({ key: 'O', shiftKey: true })).toBe('O')
})

test('key 80', () => {
  expect(transformKey({ key: 'P', shiftKey: true })).toBe('P')
})

test('key 81', () => {
  expect(transformKey({ key: 'Q', shiftKey: true })).toBe('Q')
})

test('key 82', () => {
  expect(transformKey({ key: 'R', shiftKey: true })).toBe('R')
})

test('key 83', () => {
  expect(transformKey({ key: 'S', shiftKey: true })).toBe('S')
})

test('key 84', () => {
  expect(transformKey({ key: 'T', shiftKey: true })).toBe('T')
})

test('key 85', () => {
  expect(transformKey({ key: 'U', shiftKey: true })).toBe('U')
})

test('key 86', () => {
  expect(transformKey({ key: 'V', shiftKey: true })).toBe('V')
})

test('key 87', () => {
  expect(transformKey({ key: 'W', shiftKey: true })).toBe('W')
})

test('key 88', () => {
  expect(transformKey({ key: 'X', shiftKey: true })).toBe('X')
})

test('key 89', () => {
  expect(transformKey({ key: 'Y', shiftKey: true })).toBe('Y')
})

test('key 90', () => {
  expect(transformKey({ key: 'Z', shiftKey: true })).toBe('Z')
})

test('key 91', () => {
  expect(transformKey({ key: '[' })).toBe('[')
})

test('key - 92', () => {
  expect(transformKey({ key: '\\' })).toBe('\\')
})

test('key 93', () => {
  expect(transformKey({ key: ']' })).toBe(']')
})

test('key 94', () => {
  expect(transformKey({ key: '^', shiftKey: true })).toBe('^')
})

test('key 95', () => {
  expect(transformKey({ key: '_', shiftKey: true })).toBe('_')
})

test('key 96', () => {
  expect(transformKey({ key: '`' })).toBe('`')
})

test('key 97', () => {
  expect(transformKey({ key: 'a' })).toBe('a')
})

test('key 98', () => {
  expect(transformKey({ key: 'b' })).toBe('b')
})

test('key 99', () => {
  expect(transformKey({ key: 'c' })).toBe('c')
})

test('key 100', () => {
  expect(transformKey({ key: 'd' })).toBe('d')
})

test('key 101', () => {
  expect(transformKey({ key: 'e' })).toBe('e')
})

test('key 102', () => {
  expect(transformKey({ key: 'f' })).toBe('f')
})

test('key 103', () => {
  expect(transformKey({ key: 'g' })).toBe('g')
})

test('key 104', () => {
  expect(transformKey({ key: 'h' })).toBe('h')
})

test('key 105', () => {
  expect(transformKey({ key: 'i' })).toBe('i')
})

test('key 106', () => {
  expect(transformKey({ key: 'j' })).toBe('j')
})

test('key 107', () => {
  expect(transformKey({ key: 'k' })).toBe('k')
})

test('key 108', () => {
  expect(transformKey({ key: 'l' })).toBe('l')
})

test('key 109', () => {
  expect(transformKey({ key: 'm' })).toBe('m')
})

test('key 110', () => {
  expect(transformKey({ key: 'n' })).toBe('n')
})

test('key 111', () => {
  expect(transformKey({ key: 'o' })).toBe('o')
})

test('key 112', () => {
  expect(transformKey({ key: 'p' })).toBe('p')
})

test('key 113', () => {
  expect(transformKey({ key: 'q' })).toBe('q')
})

test('key 114', () => {
  expect(transformKey({ key: 'r' })).toBe('r')
})

test('key 115', () => {
  expect(transformKey({ key: 's' })).toBe('s')
})

test('key 116', () => {
  expect(transformKey({ key: 't' })).toBe('t')
})

test('key 117', () => {
  expect(transformKey({ key: 'u' })).toBe('u')
})

test('key 118', () => {
  expect(transformKey({ key: 'v' })).toBe('v')
})

test('key 119', () => {
  expect(transformKey({ key: 'w' })).toBe('w')
})

test('key 120', () => {
  expect(transformKey({ key: 'x' })).toBe('x')
})

test('key 121', () => {
  expect(transformKey({ key: 'y' })).toBe('y')
})

test('key 122', () => {
  expect(transformKey({ key: 'z' })).toBe('z')
})

test('key 123', () => {
  expect(transformKey({ key: '{', shiftKey: true })).toBe('{')
})

test('key 124', () => {
  expect(transformKey({ key: '|', shiftKey: true })).toBe('|')
})

test('key 125', () => {
  expect(transformKey({ key: '}', shiftKey: true })).toBe('}')
})

test('key 126', () => {
  expect(transformKey({ key: '~', shiftKey: true })).toBe('~')
})

test('key - Ctrl+A', () => {
  expect(transformKey({ key: 'A', ctrlKey: true })).toBe('\u0001')
})

test('key - Ctrl+B', () => {
  expect(transformKey({ key: 'B', ctrlKey: true })).toBe('\u0002')
})

test('key - Ctrl+C', () => {
  expect(transformKey({ key: 'C', ctrlKey: true })).toBe('\u0003')
})

test('key - Ctrl+D', () => {
  expect(transformKey({ key: 'D', ctrlKey: true })).toBe('\u0004')
})

test('key - Ctrl+E', () => {
  expect(transformKey({ key: 'E', ctrlKey: true })).toBe('\u0005')
})

test('key - Ctrl+F', () => {
  expect(transformKey({ key: 'F', ctrlKey: true })).toBe('\u0006')
})

test('key - Ctrl+G', () => {
  expect(transformKey({ key: 'G', ctrlKey: true })).toBe('\u0007')
})

test('key - Ctrl+H', () => {
  expect(transformKey({ key: 'H', ctrlKey: true })).toBe('\u0008')
})

test('key - Ctrl+I', () => {
  expect(transformKey({ key: 'I', ctrlKey: true })).toBe('\u0009')
})

test('key - Ctrl+J', () => {
  expect(transformKey({ key: 'J', ctrlKey: true })).toBe('\u000a')
})

test('key - Ctrl+K', () => {
  expect(transformKey({ key: 'K', ctrlKey: true })).toBe('\u000b')
})

test('key - Ctrl+L', () => {
  expect(transformKey({ key: 'L', ctrlKey: true })).toBe('\u000c')
})

test('key - Ctrl+M', () => {
  expect(transformKey({ key: 'M', ctrlKey: true })).toBe('\u000d')
})

test('key - Ctrl+N', () => {
  expect(transformKey({ key: 'N', ctrlKey: true })).toBe('\u000e')
})

test('key - Ctrl+O', () => {
  expect(transformKey({ key: 'O', ctrlKey: true })).toBe('\u000f')
})

test('key - Ctrl+P', () => {
  expect(transformKey({ key: 'P', ctrlKey: true })).toBe('\u0010')
})

test('key - Ctrl+Q', () => {
  expect(transformKey({ key: 'Q', ctrlKey: true })).toBe('\u0011')
})

test('key - Ctrl+R', () => {
  expect(transformKey({ key: 'R', ctrlKey: true })).toBe('\u0012')
})

test('key - Ctrl+S', () => {
  expect(transformKey({ key: 'S', ctrlKey: true })).toBe('\u0013')
})

test('key - Ctrl+T', () => {
  expect(transformKey({ key: 'T', ctrlKey: true })).toBe('\u0014')
})

test('key - Ctrl+U', () => {
  expect(transformKey({ key: 'U', ctrlKey: true })).toBe('\u0015')
})

test('key - Ctrl+V', () => {
  expect(transformKey({ key: 'V', ctrlKey: true })).toBe('\u0016')
})

test('key - Ctrl+W', () => {
  expect(transformKey({ key: 'W', ctrlKey: true })).toBe('\u0017')
})

test('key - Ctrl+X', () => {
  expect(transformKey({ key: 'X', ctrlKey: true })).toBe('\u0018')
})

test('key - Ctrl+Y', () => {
  expect(transformKey({ key: 'Y', ctrlKey: true })).toBe('\u0019')
})

test('key - Ctrl+Z', () => {
  expect(transformKey({ key: 'Z', ctrlKey: true })).toBe('\u001a')
})

test('key - Shift', () => {
  expect(transformKey({ key: 'Shift' })).toBe('')
})

test('key - Alt', () => {
  expect(transformKey({ key: 'Alt' })).toBe('')
})

test('key - Insert', () => {
  expect(transformKey({ key: 'Insert' })).toBe('\u001b[2~')
})

test('key - Shift+Insert', () => {
  expect(transformKey({ key: 'Insert', shiftKey: true })).toBe('')
})

test('key - Delete', () => {
  expect(transformKey({ key: 'Delete' })).toBe('\u001b[3~')
})

test('key - Shift+Delete', () => {
  expect(transformKey({ key: 'Delete', shiftKey: true })).toBe('\u001b[3;2~')
})

test('key - Ctrl+Delete', () => {
  expect(transformKey({ key: 'Delete', ctrlKey: true })).toBe('\u001b[3;5~')
})

test('key - Alt+Delete', () => {
  expect(transformKey({ key: 'Delete', altKey: true })).toBe('\u001b[3;3~')
})

test('key - Ctrl+Shift+Delete', () => {
  expect(transformKey({ key: 'Delete', ctrlKey: true, shiftKey: true })).toBe(
    '\u001b[3;6~',
  )
})

test('key - ArrowUp', () => {
  expect(transformKey({ key: 'ArrowUp' })).toBe('\u001b[A')
})

test('key - Ctrl+ArrowUp', () => {
  expect(transformKey({ key: 'ArrowUp', ctrlKey: true })).toBe('\u001b[1;5A')
})

test('key - Ctrl+Shift+ArrowUp', () => {
  expect(transformKey({ key: 'ArrowUp', ctrlKey: true, shiftKey: true })).toBe(
    '\u001b[1;6A',
  )
})

test('key - ArrowDown', () => {
  expect(transformKey({ key: 'ArrowDown' })).toBe('\u001b[B')
})

test('key - Ctrl+ArrowDown', () => {
  expect(transformKey({ key: 'ArrowDown', ctrlKey: true })).toBe('\u001b[1;5B')
})

test('key - Ctrl+Shift+ArrowDown', () => {
  expect(
    transformKey({ key: 'ArrowDown', ctrlKey: true, shiftKey: true }),
  ).toBe('\u001b[1;6B')
})

test('key - ArrowRight', () => {
  expect(transformKey({ key: 'ArrowRight' })).toBe('\u001b[C')
})

test('key - Ctrl+ArrowRight', () => {
  expect(transformKey({ key: 'ArrowRight', ctrlKey: true })).toBe('\u001b[1;5C')
})

test('key - Ctrl+Shift+ArrowRight', () => {
  expect(
    transformKey({ key: 'ArrowRight', ctrlKey: true, shiftKey: true }),
  ).toBe('\u001b[1;6C')
})

test('key - ArrowLeft', () => {
  expect(transformKey({ key: 'ArrowLeft' })).toBe('\u001b[D')
})

test('key - Ctrl+ArrowLeft', () => {
  expect(transformKey({ key: 'ArrowLeft', ctrlKey: true })).toBe('\u001b[1;5D')
})

test('key - Ctrl+Shift+ArrowLeft', () => {
  expect(
    transformKey({ key: 'ArrowLeft', ctrlKey: true, shiftKey: true }),
  ).toBe('\u001b[1;6D')
})

test('key - Enter', () => {
  expect(transformKey({ key: 'Enter' })).toBe('\n')
})

test('key - Alt+Enter', () => {
  expect(transformKey({ key: 'Enter', altKey: true })).toBe('\u001b\r')
})

test('key - Backspace', () => {
  expect(transformKey({ key: 'Backspace' })).toBe('\x7f')
})

test('key - Alt+Backspace', () => {
  expect(transformKey({ key: 'Backspace', altKey: true })).toBe('\x17')
})

test('key - Shift+Backspace', () => {
  expect(transformKey({ key: 'Backspace', shiftKey: true })).toBe('\u0008')
})

test('key - Tab', () => {
  expect(transformKey({ key: 'Tab' })).toBe('\t')
})

test('key - Shift+Tab', () => {
  expect(transformKey({ key: 'Tab', shiftKey: true })).toBe('\u001b[Z')
})

test('key - Escape', () => {
  expect(transformKey({ key: 'Escape' })).toBe('\u001b')
})

test('key - Alt+Escape', () => {
  expect(transformKey({ key: 'Escape', altKey: true })).toBe('\u001b\u001b')
})

test('key - Control', () => {
  expect(transformKey({ key: 'Control' })).toBe('')
})

test('key - Ctrl+a', () => {
  expect(transformKey({ key: 'a', ctrlKey: true })).toBe('\u0001')
})

test('key - Ctrl+b', () => {
  expect(transformKey({ key: 'b', ctrlKey: true })).toBe('\u0002')
})

test('key - Ctrl+c', () => {
  expect(transformKey({ key: 'c', ctrlKey: true })).toBe('\u0003')
})

test('key - Ctrl+d', () => {
  expect(transformKey({ key: 'd', ctrlKey: true })).toBe('\u0004')
})

test('key - Ctrl+e', () => {
  expect(transformKey({ key: 'e', ctrlKey: true })).toBe('\u0005')
})

test('key - Ctrl+f', () => {
  expect(transformKey({ key: 'f', ctrlKey: true })).toBe('\u0006')
})

test('key - Ctrl+g', () => {
  expect(transformKey({ key: 'g', ctrlKey: true })).toBe('\u0007')
})

test('key - Ctrl+h', () => {
  expect(transformKey({ key: 'h', ctrlKey: true })).toBe('\u0008')
})

test('key - Ctrl+i', () => {
  expect(transformKey({ key: 'i', ctrlKey: true })).toBe('\u0009')
})

test('key - Ctrl+j', () => {
  expect(transformKey({ key: 'j', ctrlKey: true })).toBe('\u000a')
})

test('key - Ctrl+k', () => {
  expect(transformKey({ key: 'k', ctrlKey: true })).toBe('\u000b')
})

test('key - Ctrl+l', () => {
  expect(transformKey({ key: 'l', ctrlKey: true })).toBe('\u000c')
})

test('key - Ctrl+m', () => {
  expect(transformKey({ key: 'm', ctrlKey: true })).toBe('\u000d')
})

test('key - Ctrl+n', () => {
  expect(transformKey({ key: 'n', ctrlKey: true })).toBe('\u000e')
})

test('key - Ctrl+o', () => {
  expect(transformKey({ key: 'o', ctrlKey: true })).toBe('\u000f')
})

test('key - Ctrl+p', () => {
  expect(transformKey({ key: 'p', ctrlKey: true })).toBe('\u0010')
})

test('key - Ctrl+q', () => {
  expect(transformKey({ key: 'q', ctrlKey: true })).toBe('\u0011')
})

test('key - Ctrl+r', () => {
  expect(transformKey({ key: 'r', ctrlKey: true })).toBe('\u0012')
})

test('key - Ctrl+s', () => {
  expect(transformKey({ key: 's', ctrlKey: true })).toBe('\u0013')
})

test('key - Ctrl+t', () => {
  expect(transformKey({ key: 't', ctrlKey: true })).toBe('\u0014')
})

test('key - Ctrl+u', () => {
  expect(transformKey({ key: 'u', ctrlKey: true })).toBe('\u0015')
})

test('key - Ctrl+v', () => {
  expect(transformKey({ key: 'v', ctrlKey: true })).toBe('\u0016')
})

test('key - Ctrl+w', () => {
  expect(transformKey({ key: 'w', ctrlKey: true })).toBe('\u0017')
})

test('key - Ctrl+x', () => {
  expect(transformKey({ key: 'x', ctrlKey: true })).toBe('\u0018')
})

test('key - Ctrl+y', () => {
  expect(transformKey({ key: 'y', ctrlKey: true })).toBe('\u0019')
})

test('key - Ctrl+z', () => {
  expect(transformKey({ key: 'z', ctrlKey: true })).toBe('\u001a')
})

test('key - F1', () => {
  expect(transformKey({ key: 'F1' })).toBe('\u001bOP')
})

test('key - F2', () => {
  expect(transformKey({ key: 'F2' })).toBe('\u001bOQ')
})

test('key - F3', () => {
  expect(transformKey({ key: 'F3' })).toBe('\u001bOR')
})

test('key - F4', () => {
  expect(transformKey({ key: 'F4' })).toBe('\u001bOS')
})

test('key - F5', () => {
  expect(transformKey({ key: 'F5' })).toBe('\u001b[15~')
})

test('key - F6', () => {
  expect(transformKey({ key: 'F6' })).toBe('\u001b[17~')
})

test('key - F7', () => {
  expect(transformKey({ key: 'F7' })).toBe('\u001b[18~')
})

test('key - F8', () => {
  expect(transformKey({ key: 'F8' })).toBe('\u001b[19~')
})

test('key - F9', () => {
  expect(transformKey({ key: 'F9' })).toBe('\u001b[20~')
})

test('key - F10', () => {
  expect(transformKey({ key: 'F10' })).toBe('\u001b[21~')
})

test('key - F11', () => {
  expect(transformKey({ key: 'F11' })).toBe('\u001b[23~')
})

test('key - F12', () => {
  expect(transformKey({ key: 'F12' })).toBe('\u001b[24~')
})

test('key - Alt+0', () => {
  expect(transformKey({ key: '0', altKey: true })).toBe('\u001b0')
})

test('key - Alt+1', () => {
  expect(transformKey({ key: '1', altKey: true })).toBe('\u001b1')
})

test('key - Alt+2', () => {
  expect(transformKey({ key: '2', altKey: true })).toBe('\u001b2')
})

test('key - Alt+3', () => {
  expect(transformKey({ key: '3', altKey: true })).toBe('\u001b3')
})

test('key - Alt+4', () => {
  expect(transformKey({ key: '4', altKey: true })).toBe('\u001b4')
})

test('key - Alt+5', () => {
  expect(transformKey({ key: '5', altKey: true })).toBe('\u001b5')
})

test('key - Alt+6', () => {
  expect(transformKey({ key: '6', altKey: true })).toBe('\u001b6')
})

test('key - Alt+7', () => {
  expect(transformKey({ key: '7', altKey: true })).toBe('\u001b7')
})

test('key - Alt+8', () => {
  expect(transformKey({ key: '8', altKey: true })).toBe('\u001b8')
})

test('key - Alt+9', () => {
  expect(transformKey({ key: '9', altKey: true })).toBe('\u001b9')
})

test('key - Alt+)', () => {
  expect(transformKey({ key: ')', altKey: true, shiftKey: true })).toBe(
    '\u001b)',
  )
})

test('key - Alt+!', () => {
  expect(transformKey({ key: '!', altKey: true, shiftKey: true })).toBe(
    '\u001b!',
  )
})

test('key - Alt+@', () => {
  expect(transformKey({ key: '@', altKey: true, shiftKey: true })).toBe(
    '\u001b@',
  )
})

test('key - Alt+#', () => {
  expect(transformKey({ key: '#', altKey: true, shiftKey: true })).toBe(
    '\u001b#',
  )
})

test('key - Alt+$', () => {
  expect(transformKey({ key: '$', altKey: true, shiftKey: true })).toBe(
    '\u001b$',
  )
})

test('key - Alt+%', () => {
  expect(transformKey({ key: '%', altKey: true, shiftKey: true })).toBe(
    '\u001b%',
  )
})

test('key - Alt+^', () => {
  expect(transformKey({ key: '^', altKey: true, shiftKey: true })).toBe(
    '\u001b^',
  )
})

test('key - Alt+&', () => {
  expect(transformKey({ key: '&', altKey: true, shiftKey: true })).toBe(
    '\u001b&',
  )
})

test('key - Alt+*', () => {
  expect(transformKey({ key: '*', altKey: true, shiftKey: true })).toBe(
    '\u001b*',
  )
})

test('key - Alt+(', () => {
  expect(transformKey({ key: '(', altKey: true, shiftKey: true })).toBe(
    '\u001b(',
  )
})

test('key - Alt+_', () => {
  expect(transformKey({ key: '_', altKey: true, shiftKey: true })).toBe(
    '\u001b_',
  )
})

test('key - Alt+{', () => {
  expect(transformKey({ key: '{', altKey: true, shiftKey: true })).toBe(
    '\u001b{',
  )
})

test('key - Alt+}', () => {
  expect(transformKey({ key: '}', altKey: true, shiftKey: true })).toBe(
    '\u001b}',
  )
})

test('key - Alt+|', () => {
  expect(transformKey({ key: '|', altKey: true, shiftKey: true })).toBe(
    '\u001b|',
  )
})

test('key - Alt+?', () => {
  expect(transformKey({ key: '?', altKey: true, shiftKey: true })).toBe(
    '\u001b?',
  )
})

test('key - Ctrl+!', () => {
  expect(transformKey({ key: '!', ctrlKey: true, shiftKey: true })).toBe('!')
})

test('key - Ctrl+@', () => {
  expect(transformKey({ key: '@', ctrlKey: true, shiftKey: true })).toBe(
    '\u0000',
  )
})

test('key - Ctrl+#', () => {
  expect(transformKey({ key: '#', ctrlKey: true, shiftKey: true })).toBe('#')
})

test('key - Ctrl+$', () => {
  expect(transformKey({ key: '$', ctrlKey: true, shiftKey: true })).toBe('$')
})

test('key - Ctrl+%', () => {
  expect(transformKey({ key: '%', ctrlKey: true, shiftKey: true })).toBe('%')
})

test('key - Ctrl+^', () => {
  expect(transformKey({ key: '^', ctrlKey: true, shiftKey: true })).toBe(
    '\u001e',
  )
})

test('key - Ctrl+&', () => {
  expect(transformKey({ key: '&', ctrlKey: true, shiftKey: true })).toBe('&')
})

test('key - Ctrl+*', () => {
  expect(transformKey({ key: '*', ctrlKey: true, shiftKey: true })).toBe('*')
})

test('key - Ctrl+(', () => {
  expect(transformKey({ key: '(', ctrlKey: true, shiftKey: true })).toBe('(')
})

test('key - Ctrl+_', () => {
  expect(transformKey({ key: '_', ctrlKey: true, shiftKey: true })).toBe(
    '\u001f',
  )
})

test('key - Ctrl+{', () => {
  expect(transformKey({ key: '{', ctrlKey: true, shiftKey: true })).toBe(
    '\u001b',
  )
})

test('key - Ctrl+}', () => {
  expect(transformKey({ key: '}', ctrlKey: true, shiftKey: true })).toBe(
    '\u001d',
  )
})

test('key - Ctrl+|', () => {
  expect(transformKey({ key: '|', ctrlKey: true, shiftKey: true })).toBe(
    '\u001c',
  )
})

test('key - Ctrl+:', () => {
  expect(transformKey({ key: ':', ctrlKey: true, shiftKey: true })).toBe(':')
})

test('key - Ctrl+"', () => {
  expect(transformKey({ key: '"', ctrlKey: true, shiftKey: true })).toBe('"')
})

test('key - Ctrl+?', () => {
  expect(transformKey({ key: '?', ctrlKey: true, shiftKey: true })).toBe(
    '\u007f',
  )
})

test('key - Ctrl+<', () => {
  expect(transformKey({ key: '<', ctrlKey: true, shiftKey: true })).toBe('<')
})

test('key - Ctrl+>', () => {
  expect(transformKey({ key: '>', ctrlKey: true, shiftKey: true })).toBe('>')
})

test('key Ctrl+Alt+a', () => {
  expect(transformKey({ key: 'a', ctrlKey: true, altKey: true })).toBe(
    '\u001b\u0001',
  )
})

test('key Ctrl+Alt+A', () => {
  expect(
    transformKey({ key: 'A', ctrlKey: true, altKey: true, shiftKey: true }),
  ).toBe('\u001b\u0001')
})

test('key Ctrl+Alt+,', () => {
  expect(transformKey({ key: ',', ctrlKey: true, altKey: true })).toBe(
    '\u001b,',
  )
})

test('key - UIKeyInputUpArrow', () => {
  expect(transformKey({ key: 'UIKeyInputUpArrow' })).toBe('\u001b[A')
})

test('key - UIKeyInputDownArrow', () => {
  expect(transformKey({ key: 'UIKeyInputDownArrow' })).toBe('\u001b[B')
})

test('key - UIKeyInputRightArrow', () => {
  expect(transformKey({ key: 'UIKeyInputRightArrow' })).toBe('\u001b[C')
})

test('key - UIKeyInputLeftArrow', () => {
  expect(transformKey({ key: 'UIKeyInputLeftArrow' })).toBe('\u001b[D')
})

test('key - AltGraph', () => {
  expect(transformKey({ key: 'AltGraph' })).toBe('')
})

test('key - PageUp', () => {
  expect(transformKey({ key: 'PageUp' })).toBe(`\u001b[5~`)
})

test('key Ctrl+PageUp', () => {
  expect(transformKey({ key: 'PageUp', ctrlKey: true })).toBe('\u001b[5;5~')
})

test('key - PageDown', () => {
  expect(transformKey({ key: 'PageDown' })).toBe('\u001b[6~')
})

test('key Ctrl+PageDown', () => {
  expect(transformKey({ key: 'PageDown', ctrlKey: true })).toBe('\u001b[6;5~')
})

test('key - End', () => {
  expect(transformKey({ key: 'End' })).toBe('\u001b[F')
})

test('key - Shift+End', () => {
  expect(transformKey({ key: 'End', shiftKey: true })).toBe('\u001b[1;2F')
})

test('key - Home', () => {
  expect(transformKey({ key: 'Home' })).toBe('\u001b[H')
})

test('key - Shift+Home', () => {
  expect(transformKey({ key: 'Home', shiftKey: true })).toBe('\u001b[1;2H')
})

test('key 😀', () => {
  expect(transformKey({ key: 'AltGraph' })).toBe('')
})
