import { performance } from 'perf_hooks'
import { handleKeyDown } from './handleKeyDown.js'

const toEvent = ({
  key,
  shiftKey = false,
  altKey = false,
  ctrlKey = false,
  preventDefault = () => {},
}) => ({ key, preventDefault, shiftKey, altKey, ctrlKey })

const events = [
  {
    key: 'a',
  },
  {
    key: 'b',
  },
  {
    key: 'c',
  },
  {
    key: 'Enter',
  },
  {
    key: 'a',
  },
  {
    key: 'b',
    shiftKey: true,
    altKey: true,
  },
  {
    key: 'Insert',
  },
  {
    key: '$',
  },
  {
    key: 'ArrowUp',
  },
  {
    key: 'ArrowUp',
    shiftKey: true,
  },
  {
    key: 'ArrowRight',
  },
  {
    key: 'x',
  },
  {
    key: 'y',
  },
  {
    key: 'z',
  },
].map(toEvent)

const webSocket = {
  send: () => {},
}

const fn = handleKeyDown(webSocket)

let total = 0
for (let i = 0; i < 10_000; i++) {
  const start = performance.now()
  for (const event of events) {
    fn(event)
  }
  const end = performance.now()
  console.log(`took ${end - start}ms`)
  total += end - start
}
console.log(`average of 10_000: ${total / 10_000}ms`)
