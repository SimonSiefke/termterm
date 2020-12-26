export const handleKeyDown = (webSocket) => (event) => {
  switch (event.key) {
    case 'Shift':
      break
    case 'ArrowUp':
      event.preventDefault()
      webSocket.send('\u001b[A')
      break
    case 'ArrowDown':
      event.preventDefault()
      webSocket.send('\u001b[B')
      break
    case 'ArrowRight':
      event.preventDefault()
      webSocket.send('\u001b[C')
      break
    case 'ArrowLeft':
      event.preventDefault()
      webSocket.send('\u001b[D')
      break
    case 'Enter':
      webSocket.send('\n')
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
        webSocket.send('\x1b[Z')
        break
      }
      webSocket.send('\t')
      break
    case 'Escape':
      webSocket.send('\x1b')
      break
    case 'Control':
      break
    case 'a':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0001')
        break
      }
      webSocket.send('a')
      break
    case 'b':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0002')
        break
      }
      webSocket.send('b')
      break
    case 'c':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0003')
        break
      }
      webSocket.send('c')
      break
    case 'd':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0004')
        break
      }
      webSocket.send('d')
      break
    case 'e':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0005')
        break
      }
      webSocket.send('e')
      break
    case 'f':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0006')
        break
      }
      webSocket.send('f')
      break
    case 'g':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0007')
        break
      }
      webSocket.send('g')
      break
    case 'h':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0008')
        break
      }
      webSocket.send('h')
      break
    case 'i':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0009')
        break
      }
      webSocket.send('i')
      break
    case 'j':
      event.preventDefault()
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u000a')
        break
      }
      webSocket.send('j')
      break
    case 'k':
      event.preventDefault()
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u000b')
        break
      }
      webSocket.send('k')
      break
    case 'l':
      event.preventDefault()
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u000c')
        break
      }
      webSocket.send('l')
      break
    case 'm':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u000d')
        break
      }
      webSocket.send('m')
      break
    case 'n':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u000e')
        break
      }
      webSocket.send('n')
      break
    case 'o':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u000f')
        break
      }
      webSocket.send('o')
      break
    case 'p':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0010')
        break
      }
      webSocket.send('p')
      break
    case 'q':
      event.preventDefault()
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0011')
        break
      }
      webSocket.send('q')
      break
    case 'r':
      event.preventDefault()
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0012')
        break
      }
      webSocket.send('r')
      break
    case 's':
      event.preventDefault()
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0013')
        break
      }
      webSocket.send('s')
      break
    case 't':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0014')
        break
      }
      webSocket.send('t')
      break
    case 'u':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0015')
        break
      }
      webSocket.send('u')
      break
    case 'v':
      if (event.ctrlKey) {
        // TODO paste
        // webSocket.send('\u0016')
        break
      }
      event.preventDefault()
      webSocket.send('v')
      break
    case 'w':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0017')
        break
      }
      webSocket.send('w')
      break
    case 'x':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0018')
        break
      }
      webSocket.send('x')
      break
    case 'y':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u0019')
        break
      }
      webSocket.send('y')
      break
    case 'z':
      event.preventDefault()
      if (event.ctrlKey) {
        webSocket.send('\u001a')
        break
      }
      webSocket.send('z')
      break
    case 'F1':
      webSocket.send('\x1bOP')
      break
    case 'F2':
      webSocket.send('\x1bOQ')
      break
    case 'F3':
      webSocket.send('\x1bOR')
      break
    case 'F4':
      webSocket.send('\x1bOS')
      break
    case 'F5':
      webSocket.send('\x1b[15~')
      break
    case 'F6':
      webSocket.send('\x1b[17~')
      break
    case 'F7':
      webSocket.send('\x1b[18~')
      break
    case 'F8':
      webSocket.send('\x1b[19~')
      break
    case 'F9':
      webSocket.send('\x1b[20~')
      break
    case 'F10':
      webSocket.send('\x1b[21~')
      break
    case 'F11':
      webSocket.send('\x1b[23~')
      break
    case 'F12':
      webSocket.send('\x1b[24~')
      break
    case '/':
      event.preventDefault()
      webSocket.send('/')
      break
    default:
      console.log(event.key)
      webSocket.send(event.key)
      break
  }
}
