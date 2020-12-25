import { forkPtyAndExecvp } from 'fork-pty'
import { ReadStream } from 'tty'
import fs from 'fs'

const fd = forkPtyAndExecvp('bash', ['bash', '-i'])

const readStream = new ReadStream(fd, { writable: true })

setTimeout(() => {
  readStream.pipe(fs.createWriteStream('fixtures/ls.txt'))
  readStream.write('ls -lR /usr/lib\n')
}, 100)

setTimeout(() => {
  process.exit(0)
}, 10000)
