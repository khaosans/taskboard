const { parse } = require('url')
const { createServer } = require('http')
const next = require('next')
const WebSocket = require('ws')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const wss = new WebSocket.Server({ noServer: true })

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('received: %s', message)
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message)
        }
      })
    })
  })

  server.on('upgrade', (request, socket, head) => {
    const pathname = parse(request.url).pathname

    if (pathname === '/api/websocket') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request)
      })
    } else {
      socket.destroy()
    }
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
