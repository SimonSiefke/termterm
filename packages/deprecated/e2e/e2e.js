import express from 'express'
import puppeteer from 'puppeteer'

const app = express()

app.use(express.static('..'))

app.listen(3000)

const browser = await puppeteer.launch({
  headless: false,
})
const page = await browser.newPage()
await page.setViewport({ width: 1280, height: 1800 })
await page.goto('http://localhost:3000/e2e/index.html')
