import { forkPtyAndExecvp } from 'fork-pty'
import { ReadStream } from 'tty'
import fs from 'fs'

const createFixture = async (fileName, command) => {
  const fd = forkPtyAndExecvp('bash', ['bash', '-i'])
  const readStream = new ReadStream(fd, { writable: true })

  readStream.write('nano\n')

  let buffer = ''

  readStream.on('data', (data) => {
    buffer += data
  })
  setTimeout(() => {
    console.log({ buffer })
  }, 400)
  // setTimeout(() => {
  //   readStream.pipe(fs.createWriteStream(fileName))
  //   readStream.write(command)
  // }, 100)
  // await new Promise((r) => setTimeout(r, 5000))
  // readStream.destroy()
}

const __initialize__ = async () => {
  createFixture()
  // await createFixture('fixtures/ls.txt', 'ls -lR /usr/lib\n')
  // await createFixture('fixtures/vim.txt', 'vim\n')
  // await createFixture('fixtures/nano.txt', 'nano\n')
  // process.exit(0)
}

__initialize__()

// setTimeout(() => {
//   process.exit(0)
// }, 10000)
