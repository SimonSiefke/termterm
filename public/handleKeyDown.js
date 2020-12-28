export const handleKeyDown = (webSocket) => (event) => {
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
          webSocket.send(`\u001b${char}`)
          break
        }
        webSocket.send(char)
        break
      }
      webSocket.send(event.key)
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
          webSocket.send(`\u001b${char}`)
          break
        }
        webSocket.send(char)
        break
      }
      webSocket.send(event.key)
      break
    case 'F1':
      webSocket.send('\u001bOP')
      break
    case 'F2':
      webSocket.send('\u001bOQ')
      break
    case 'F3':
      webSocket.send('\u001bOR')
      break
    case 'F4':
      webSocket.send('\u001bOS')
      break
    case 'F5':
      webSocket.send('\u001b[15~')
      break
    case 'F6':
      webSocket.send('\u001b[17~')
      break
    case 'F7':
      webSocket.send('\u001b[18~')
      break
    case 'F8':
      webSocket.send('\u001b[19~')
      break
    case 'F9':
      webSocket.send('\u001b[20~')
      break
    case 'F10':
      webSocket.send('\u001b[21~')
      break
    case 'F11':
      webSocket.send('\u001b[23~')
      break
    case 'F12':
      webSocket.send('\u001b[24~')
      break
    case 'Home':
      if (modifiers) {
        webSocket.send(`\u001b[1;${modifiers + 1}H`)
        break
      }
      webSocket.send(`\u001b[H`)
      break
    case 'End':
      if (modifiers) {
        webSocket.send(`\u001b[1;${modifiers + 1}F`)
        break
      }
      webSocket.send(`\u001b[F`)
      break
    case 'Insert':
      if (event.shiftKey || event.ctrlKey) {
        break
      }
      webSocket.send('\u001b[2~')
      break
    case 'Delete':
      if (modifiers) {
        webSocket.send(`\u001b[3;${modifiers + 1}~`)
      }
      webSocket.send('\u001b[3~')
      break
    case 'ArrowUp':
      event.preventDefault()
      if (modifiers) {
        webSocket.send(`\u001b[1;${modifiers + 1}A`)
        break
      }
      webSocket.send('\u001b[A')
      break
    case 'ArrowDown':
      event.preventDefault()
      if (modifiers) {
        webSocket.send(`\u001b[1;${modifiers + 1}B`)
        break
      }
      webSocket.send('\u001b[B')
      break
    case 'ArrowRight':
      event.preventDefault()
      if (modifiers) {
        webSocket.send(`\u001b[1;${modifiers + 1}C`)
        break
      }
      webSocket.send('\u001b[C')
      break
    case 'ArrowLeft':
      event.preventDefault()
      if (modifiers) {
        webSocket.send(`\u001b[1;${modifiers + 1}D`)
        break
      }
      webSocket.send('\u001b[D')
      break
    case 'UIKeyInputUpArrow':
      webSocket.send('\u001b[A')
      break
    case 'UIKeyInputDownArrow':
      webSocket.send('\u001b[B')
      break
    case 'UIKeyInputRightArrow':
      webSocket.send('\u001b[C')
      break
    case 'UIKeyInputLeftArrow':
      webSocket.send('\u001b[D')
      break
    case 'Enter':
      if (event.altKey) {
        webSocket.send('\u001b\r')
        break
      }
      webSocket.send('\n')
      break
    case 'PageUp':
      if (event.ctrlKey) {
        webSocket.send(`\u001b[5;5~`)
        break
      }
      webSocket.send('\u001b[5~')
      break
    case 'PageDown':
      if (event.ctrlKey) {
        webSocket.send(`\u001b[6;5~`)
        break
      }
      webSocket.send(`\u001b[6~`)
      break
    case 'Backspace':
      if (event.altKey) {
        webSocket.send('\x17')
        break
      }
      if (event.shiftKey) {
        webSocket.send('\u0008')
        break
      }
      webSocket.send('\x7f')
      break
    case 'Tab':
      event.preventDefault()
      if (event.shiftKey) {
        webSocket.send('\u001b[Z')
        break
      }
      webSocket.send('\t')
      break
    case 'Escape':
      if (event.altKey) {
        webSocket.send('\u001b\u001b')
        break
      }
      webSocket.send('\u001b')
      break
    case '/':
      event.preventDefault()
      webSocket.send('/')
      break
    case '?':
      if (event.ctrlKey) {
        webSocket.send('\u007f')
        break
      }
      if (event.altKey) {
        webSocket.send(`\u001b?`)
        break
      }
      webSocket.send(event.key)
      break
    case '|':
      if (event.ctrlKey) {
        webSocket.send('\u001c')
        break
      }
      if (event.altKey) {
        webSocket.send(`\u001b|`)
        break
      }
      webSocket.send(event.key)
      break
    case '{':
      if (event.ctrlKey) {
        webSocket.send('\u001b')
        break
      }
      if (event.altKey) {
        webSocket.send(`\u001b{`)
        break
      }
      webSocket.send(event.key)
      break
    case '}':
      if (event.ctrlKey) {
        webSocket.send('\u001d')
        break
      }
      if (event.altKey) {
        webSocket.send(`\u001b}`)
        break
      }
      webSocket.send(event.key)
      break
    case '_':
      if (event.ctrlKey) {
        webSocket.send('\u001f')
        break
      }
      if (event.altKey) {
        webSocket.send(`\u001b_`)
        break
      }
      webSocket.send(event.key)
      break
    case '^':
      if (event.ctrlKey) {
        webSocket.send('\u001e')
        break
      }
      if (event.altKey) {
        webSocket.send(`\u001b^`)
        break
      }
      webSocket.send(event.key)
      break
    case '@':
      if (event.ctrlKey) {
        webSocket.send('\u0000')
        break
      }
      if (event.altKey) {
        webSocket.send(`\u001b@`)
        break
      }
      webSocket.send(event.key)
      break
    default:
      if (event.key.length > 1) {
        break
      }
      if (event.altKey) {
        webSocket.send(`\u001b${event.key}`)
        break
      }
      webSocket.send(event.key)
      break
  }
}

// export const handleBeforeInput = (webSocket) => (event) => {
//   event.preventDefault()
//   if (event.data) {
//     webSocket.send(event.data)
//   }
// }
