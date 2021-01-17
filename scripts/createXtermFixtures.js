import fs from 'fs'
import path from 'path'

const createFixtureHtml = (inFile) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="/public/termterm.css" />
  </head>
  <body>
    <div id="Terminal">
      <canvas id="CanvasText"></canvas>
      <canvas id="CanvasCursor"></canvas>
    </div>

    <script type="module">
      import { createTerminal } from '/public/lib/createTerminal.js'

      const canvasText = document.getElementById('CanvasText')
      const canvasCursor = document.getElementById('CanvasCursor')
      const terminal = createTerminal(canvasText, canvasCursor, {})

      fetch('/${inFile}')
        .then((res) => res.text())
        .then(terminal.pasteText)
    </script>
  </body>
</html>
`
}

const files = fs.readdirSync('e2e/data/xterm')
const inFiles = files.filter((file) => file.endsWith('.in'))

fs.mkdirSync('e2e/fixtures/xterm', { recursive: true })

for (const inFile of inFiles) {
  const relativePath = `e2e/data/xterm/${inFile}`
  const html = createFixtureHtml(relativePath)
  fs.writeFileSync(`e2e/fixtures/xterm/${inFile.slice(0, -3)}.html`, html)
}
