window.start = undefined

export const createHandleKeyDown = (send) => (event) => {
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
          send(`\u001b${char}`)
          break
        }
        send(char)
        break
      }
      send(event.key)
      break
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
        if (event.key === 'r' || event.key === 'l') {
          event.preventDefault()
        }
        const char = String.fromCharCode(event.key.charCodeAt() - 96)
        if (event.altKey) {
          send(`\u001b${char}`)
          break
        }
        send(char)
        break
      }
      send(event.key)
      break
    case 'F1':
      send('\u001bOP')
      break
    case 'F2':
      send('\u001bOQ')
      break
    case 'F3':
      send('\u001bOR')
      break
    case 'F4':
      send('\u001bOS')
      break
    case 'F5':
      send('\u001b[15~')
      break
    case 'F6':
      send('\u001b[17~')
      break
    case 'F7':
      send('\u001b[18~')
      break
    case 'F8':
      send('\u001b[19~')
      break
    case 'F9':
      send('\u001b[20~')
      break
    case 'F10':
      send('\u001b[21~')
      break
    case 'F11':
      send('\u001b[23~')
      break
    case 'F12':
      send('\u001b[24~')
      break
    case 'Home':
      if (modifiers) {
        send(`\u001b[1;${modifiers + 1}H`)
        break
      }
      send(`\u001b[H`)
      break
    case 'End':
      if (modifiers) {
        send(`\u001b[1;${modifiers + 1}F`)
        break
      }
      send(`\u001b[F`)
      break
    case 'Insert':
      if (event.shiftKey || event.ctrlKey) {
        break
      }
      send('\u001b[2~')
      break
    case 'Delete':
      if (modifiers) {
        send(`\u001b[3;${modifiers + 1}~`)
      }
      send('\u001b[3~')
      break
    case 'ArrowUp':
      event.preventDefault()
      if (modifiers) {
        send(`\u001b[1;${modifiers + 1}A`)
        break
      }
      send('\u001b[A')
      break
    case 'ArrowDown':
      event.preventDefault()
      if (modifiers) {
        send(`\u001b[1;${modifiers + 1}B`)
        break
      }
      send('\u001b[B')
      break
    case 'ArrowRight':
      event.preventDefault()
      if (modifiers) {
        send(`\u001b[1;${modifiers + 1}C`)
        break
      }
      send('\u001b[C')
      break
    case 'ArrowLeft':
      event.preventDefault()
      if (modifiers) {
        send(`\u001b[1;${modifiers + 1}D`)
        break
      }
      send('\u001b[D')
      break
    case 'UIKeyInputUpArrow':
      send('\u001b[A')
      break
    case 'UIKeyInputDownArrow':
      send('\u001b[B')
      break
    case 'UIKeyInputRightArrow':
      send('\u001b[C')
      break
    case 'UIKeyInputLeftArrow':
      send('\u001b[D')
      break
    case 'Enter':
      if (event.altKey) {
        send('\u001b\r')
        break
      }
      send('\n')
      break
    case 'PageUp':
      if (event.ctrlKey) {
        send(`\u001b[5;5~`)
        break
      }
      send('\u001b[5~')
      break
    case 'PageDown':
      if (event.ctrlKey) {
        send(`\u001b[6;5~`)
        break
      }
      send(`\u001b[6~`)
      break
    case 'Backspace':
      if (event.altKey) {
        send('\x17')
        break
      }
      if (event.shiftKey) {
        send('\u0008')
        break
      }
      send('\x7f')
      break
    case 'Tab':
      event.preventDefault()
      if (event.shiftKey) {
        send('\u001b[Z')
        break
      }
      send('\t')
      break
    case 'Escape':
      if (event.altKey) {
        send('\u001b\u001b')
        break
      }
      send('\u001b')
      break
    case '/':
      event.preventDefault()
      send('/')
      break
    case '?':
      if (event.ctrlKey) {
        send('\u007f')
        break
      }
      if (event.altKey) {
        send(`\u001b?`)
        break
      }
      send(event.key)
      break
    case '|':
      if (event.ctrlKey) {
        send('\u001c')
        break
      }
      if (event.altKey) {
        send(`\u001b|`)
        break
      }
      send(event.key)
      break
    case '{':
      if (event.ctrlKey) {
        send('\u001b')
        break
      }
      if (event.altKey) {
        send(`\u001b{`)
        break
      }
      send(event.key)
      break
    case '}':
      if (event.ctrlKey) {
        send('\u001d')
        break
      }
      if (event.altKey) {
        send(`\u001b}`)
        break
      }
      send(event.key)
      break
    case '_':
      if (event.ctrlKey) {
        send('\u001f')
        break
      }
      if (event.altKey) {
        send(`\u001b_`)
        break
      }
      send(event.key)
      break
    case '^':
      if (event.ctrlKey) {
        send('\u001e')
        break
      }
      if (event.altKey) {
        send(`\u001b^`)
        break
      }
      send(event.key)
      break
    case '@':
      if (event.ctrlKey) {
        send('\u0000')
        break
      }
      if (event.altKey) {
        send(`\u001b@`)
        break
      }
      send(event.key)
      break
    default:
      if (event.key.length > 1) {
        break
      }
      if (event.altKey) {
        send(`\u001b${event.key}`)
        break
      }
      send(event.key)
      break
  }
}

// export const handleBeforeInput = (webSocket) => (event) => {
//   event.preventDefault()
//   if (event.data) {
//     send(event.data)
//   }
// }
