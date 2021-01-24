import { createHandleKeyDown } from './lib/handleKeyDown.js'

const worker = new Worker('worker.js', { type: 'module' })

const send = (text) => {
  worker.postMessage({
    command: 'send',
    text,
  })
}

const handleKeyDown = createHandleKeyDown(send)
const handlePaste = (event) => {
  const text = event.clipboardData.getData('Text')
  send(text)
}

let scheduled = false
const playBellAudio = () => {
  if (scheduled) {
    return
  }
  scheduled = true
  requestIdleCallback(() => {
    const audio = document.createElement('audio')
    audio.src = `https://raw.githubusercontent.com/ubuntu/yaru/master/sounds/src/stereo/bell.oga`
    audio.play()
    scheduled = false
  })
}

const setWindowTitle = (title) => {
  document.title = title
}

const handleMessage = ({ data }) => {
  switch (data.command) {
    case 'bell':
      playBellAudio()
      break
    case 'setWindowTitle':
      setWindowTitle(data.title)
      break
  }
}

const supportsModernCanvas = (() => {
  try {
    const canvas = document.createElement('Canvas')
    canvas.width = 1
    canvas.height = 1
    canvas.transferControlToOffscreen()
    return true
  } catch {
    return false
  }
})()
const __initialize__ = () => {
  if (!supportsModernCanvas) {
    window.location.href = '/legacy'
  }
  const canvasText = document
    .getElementById('CanvasText')
    .transferControlToOffscreen()
  const canvasCursor = document
    .getElementById('CanvasCursor')
    .transferControlToOffscreen()
  window.addEventListener('keydown', handleKeyDown)
  document.addEventListener('paste', handlePaste)
  worker.postMessage(
    {
      command: 'init',
      canvasText,
      canvasCursor,
    },
    [canvasText, canvasCursor],
  )
  worker.onmessage = handleMessage

  // setTimeout(() => {
  //   for (const key of 'ls -lR /usr/lib\n') {
  //     handleKeyDown({ key, preventDefault: () => {} })
  //   }
  // }, 200)
}

__initialize__()
