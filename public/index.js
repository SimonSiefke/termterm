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

const __initialize__ = () => {
  window.addEventListener('keydown', handleKeyDown)
  worker.postMessage(
    {
      command: 'init',
      canvas,
    },
    [canvas],
  )
}

__initialize__()
