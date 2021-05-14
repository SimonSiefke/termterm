// based on https://github.com/xtermjs/xterm.js/blob/master/test/api/InputHandler.api.ts
// import playwright from 'playwright'
import { spawn } from 'child_process'

let browser
let page
let server

async function setupBrowser(options) {
  // browser = await playwright['chromium'].launch({ headless: false })
  // const context = await browser.newContext()
  // page = await context.newPage()
  // await browser.close()
}

async function closeBrowser() {
  await browser.close()
  browser = undefined
  page = undefined
}

const setupServer = () => {
  server = spawn('node', ['demo/server.js'], {
    stdio: 'inherit',
  })
  server.on('error', (error) => {
    throw error
  })
}

const closeServer = async () => {
  server.kill()
  server = undefined
}

async function getLines(start, end) {
  return await page.evaluate(`
  (() => {
    const lines = window.terminal.lines.slice(${start}, ${end})
    const stringLines = lines.map(line => new TextDecoder().decode(line))
    return stringLines
  })()
  `)
}

// const writeText = async (text) => {
//   await page.evaluate(
//     `window.terminal.write(new TextEncoder().encode(\`${text}\`))`,
//   )
// }

beforeAll(async () => {
  await setupServer()
  console.log('server is ready')
  await setupBrowser()
  await page.goto('http://localhost:5555/blank.html')
})

afterAll(async () => {
  await closeBrowser()
  await closeServer()
})

test.skip('basic', async () => {
  await page.evaluate(`
    terminal.writeText('foo')
    terminal.writeText('bar')
  `)
  const lines = await page.evaluate(`terminal.lines`)
  console.log(lines)
  // const lines = await getLines(0, 2)
  // expect(lines[1].startsWith('abc')).toBe(true)
})

test.skip('cursor down CSI PS A', async () => {
  // await page.evaluate(`
  // terminal.writeText('\x1b[2Bb')
  // \x1b[Ba`)
})
