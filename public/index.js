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

const __initialize__ = () => {
  const canvas = document.getElementById('Canvas').transferControlToOffscreen()
  const cacheCanvas = document
    .getElementById('CacheCanvas')
    .transferControlToOffscreen()
  window.addEventListener('keydown', handleKeyDown)
  worker.postMessage(
    {
      command: 'init',
      canvas,
      cacheCanvas,
    },
    [canvas, cacheCanvas],
  )
  worker.onmessage = handleMessage

  // setTimeout(() => {
  //   for (const key of 'ls -lR /usr/lib\n') {
  //     handleKeyDown({ key, preventDefault: () => {} })
  //   }
  // }, 200)
}

__initialize__()
