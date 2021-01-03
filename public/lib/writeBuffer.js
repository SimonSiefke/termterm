const $BufferSize = document.getElementById('BufferSize')

export const throttle = (action) => {
  let pendingData = 0
  let bufferOffset = 0
  let writeBuffer = []
  let scheduled = false

  const innerWrite = () => {
    while (writeBuffer.length) {
      const data = writeBuffer.shift()
      action(data)
      pendingData -= data.length
      $BufferSize.textContent = pendingData
    }
    if (pendingData !== 0) {
      //   throw new Error('something wrong')
    }
    writeBuffer = []
    scheduled = false
  }

  const write = (data) => {
    pendingData += data.length
    $BufferSize.textContent = pendingData
    writeBuffer.push(data)
    if (!scheduled) {
      scheduled = true
      // requestAnimationFrame(innerWrite)
    }
  }

  return write
}
