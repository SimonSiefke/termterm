import { createHandleKeyDown } from './lib/handleKeyDown.js'

const worker = new Worker('worker.js', { type: 'module' })

const send = (text) => {
  worker.postMessage({
    command: 'send',
    text,
  })
}

const handleKeyDown = createHandleKeyDown(send)

const playBellAudio = () => {
  const audio = document.createElement('audio')
  audio.src = `https://raw.githubusercontent.com/ubuntu/yaru/master/sounds/src/stereo/bell.oga`
  audio.play()
}

const handleMessage = ({ data }) => {
  switch (data.command) {
    case 'bell':
      playBellAudio()
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
  const canvas = document.getElementById('Canvas').transferControlToOffscreen()
  const cursor = document.getElementById('Cursor').transferControlToOffscreen()
  window.addEventListener('keydown', handleKeyDown)
  worker.postMessage(
    {
      command: 'init',
      canvas,
      cursor,
    },
    [canvas, cursor],
  )
  worker.onmessage = handleMessage

  // setTimeout(() => {
  //   for (const key of 'ls -lR /usr/lib\n') {
  //     handleKeyDown({ key, preventDefault: () => {} })
  //   }
  // }, 200)
}

__initialize__()
