import { parseArray } from './parseArray.js'

const $Output = document.getElementById('Output')

const webSocket = new WebSocket('ws://localhost:5555')

webSocket.onopen = () => {
  console.log('open')
}

const goToHome = () => {
  console.warn('goToHome not implemented')
}

const eraseToEndOfLine = () => {
  console.warn('eraseToEndOfLine not implemented')
}

const eraseInDisplay2 = () => {
  $Output.textContent = ''
}

const setCharAttributes = () => {
  console.warn('setCharAttributes not implemented')
}

webSocket.onmessage = async ({ data }) => {
  console.log({ data: await data.text() })
  const arrayBuffer = await data.arrayBuffer()
  const uint8Array = new Uint8Array(arrayBuffer)
  console.log(uint8Array)
  const parsed = parseArray(uint8Array, {
    goToHome,
    eraseToEndOfLine,
    eraseInDisplay2,
    setCharAttributes,
  })
  $Output.textContent += parsed
  $Output.textContent += '\n'
  console.log(parsed)
  // console.log(uint8Array)
  // $Output.textContent += await data.arrayBuffer()
  // $Output.textContent += '\n'
}
