export const transformKey = (event) => {
  const modifiers =
    (event.shiftKey ? 1 : 0) |
    (event.altKey ? 2 : 0) |
    (event.ctrlKey ? 4 : 0) |
    (event.metaKey ? 8 : 0)
  switch (event.key) {
    case 'A':
    case 'B':
    case 'C':
    case 'D':
    case 'E':
    case 'F':
    case 'G':
    case 'H':
    case 'I':
    case 'J':
    case 'K':
    case 'L':
    case 'M':
    case 'N':
    case 'O':
    case 'P':
    case 'Q':
    case 'R':
    case 'S':
    case 'T':
    case 'U':
    case 'V':
    case 'W':
    case 'X':
    case 'Y':
    case 'Z':
      if (event.ctrlKey) {
        const char = String.fromCharCode(event.key.charCodeAt() - 64)
        if (event.altKey) {
          return `\u001b${char}`
        }
        return char
      }
      return event.key
    case 'a':
    case 'b':
    case 'c':
    case 'd':
    case 'e':
    case 'f':
    case 'g':
    case 'h':
    case 'i':
    case 'j':
    case 'k':
    case 'l':
    case 'm':
    case 'n':
    case 'o':
    case 'p':
    case 'q':
    case 'r':
    case 's':
    case 't':
    case 'u':
    case 'v':
    case 'w':
    case 'x':
    case 'y':
    case 'z':
      if (event.ctrlKey) {
        // if (event.key === 'r' || event.key === 'l') {
        //   event.preventDefault()
        // }
        const char = String.fromCharCode(event.key.charCodeAt() - 96)
        if (event.altKey) {
          return `\u001b${char}`
        }
        return char
      }
      return event.key
    case 'F1':
      return '\u001bOP'
    case 'F2':
      return '\u001bOQ'
    case 'F3':
      return '\u001bOR'
    case 'F4':
      return '\u001bOS'
    case 'F5':
      return '\u001b[15~'
    case 'F6':
      return '\u001b[17~'
    case 'F7':
      return '\u001b[18~'
    case 'F8':
      return '\u001b[19~'
    case 'F9':
      return '\u001b[20~'
    case 'F10':
      return '\u001b[21~'
    case 'F11':
      return '\u001b[23~'
    case 'F12':
      return '\u001b[24~'
    case 'Home':
      if (modifiers) {
        return `\u001b[1;${modifiers + 1}H`
      }
      return `\u001b[H`
    case 'End':
      if (modifiers) {
        return `\u001b[1;${modifiers + 1}F`
      }
      return `\u001b[F`
    case 'Insert':
      if (event.shiftKey || event.ctrlKey) {
        return ''
      }
      return '\u001b[2~'
    case 'Delete':
      if (modifiers) {
        return `\u001b[3;${modifiers + 1}~`
      }
      return '\u001b[3~'
    case 'ArrowUp':
      // event.preventDefault()
      if (modifiers) {
        return `\u001b[1;${modifiers + 1}A`
      }
      return '\u001b[A'
    case 'ArrowDown':
      // event.preventDefault()
      if (modifiers) {
        return `\u001b[1;${modifiers + 1}B`
      }
      return '\u001b[B'
    case 'ArrowRight':
      // event.preventDefault()
      if (modifiers) {
        return `\u001b[1;${modifiers + 1}C`
      }
      return '\u001b[C'
    case 'ArrowLeft':
      // event.preventDefault()
      if (modifiers) {
        return `\u001b[1;${modifiers + 1}D`
      }
      return '\u001b[D'
    case 'UIKeyInputUpArrow':
      return '\u001b[A'
    case 'UIKeyInputDownArrow':
      return '\u001b[B'
    case 'UIKeyInputRightArrow':
      return '\u001b[C'
    case 'UIKeyInputLeftArrow':
      return '\u001b[D'
    case 'Enter':
      if (event.altKey) {
        return '\u001b\r'
      }
      return '\n'
    case 'PageUp':
      if (event.ctrlKey) {
        return `\u001b[5;5~`
      }
      return '\u001b[5~'
    case 'PageDown':
      if (event.ctrlKey) {
        return `\u001b[6;5~`
      }
      return `\u001b[6~`
    case 'Backspace':
      if (event.altKey) {
        return '\x17'
      }
      if (event.shiftKey) {
        return '\u0008'
      }
      return '\x7f'
    case 'Tab':
      // event.preventDefault()
      if (event.shiftKey) {
        return '\u001b[Z'
      }
      return '\t'
    case 'Escape':
      if (event.altKey) {
        return '\u001b\u001b'
      }
      return '\u001b'
    case '/':
      // event.preventDefault()
      return '/'
    case '?':
      if (event.ctrlKey) {
        return '\u007f'
      }
      if (event.altKey) {
        return `\u001b?`
      }
      return event.key
    case '|':
      if (event.ctrlKey) {
        return '\u001c'
      }
      if (event.altKey) {
        return `\u001b|`
      }
      return event.key
    case '{':
      if (event.ctrlKey) {
        return '\u001b'
      }
      if (event.altKey) {
        return `\u001b{`
      }
      return event.key
    case '}':
      if (event.ctrlKey) {
        return '\u001d'
      }
      if (event.altKey) {
        return `\u001b}`
      }
      return event.key
    case '_':
      if (event.ctrlKey) {
        return '\u001f'
      }
      if (event.altKey) {
        return `\u001b_`
      }
      return event.key
    case '^':
      if (event.ctrlKey) {
        return '\u001e'
      }
      if (event.altKey) {
        return `\u001b^`
      }
      return event.key
    case '@':
      if (event.ctrlKey) {
        return '\u0000'
      }
      if (event.altKey) {
        return `\u001b@`
      }
      return event.key
    case ' ':
      // event.preventDefault()
      return ` `
    default:
      if (event.key.length > 1) {
        return ''
      }
      if (event.altKey) {
        return `\u001b${event.key}`
      }
      return event.key
  }
}
