import { createHandleKeyDown } from './lib/handleKeyDown.js'

const $Canvas = document.getElementById('Canvas')
const canvas = $Canvas.transferControlToOffscreen()
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

const __initialize__ = () => {
  window.addEventListener('keydown', handleKeyDown)
  worker.postMessage(
    {
      command: 'init',
      canvas,
    },
    [canvas],
  )

  worker.onmessage = handleMessage
}

__initialize__()
