import { Server } from 'socket.io'

let io: Server | null = null;

export async function GET(req: Request) {
  if (!io) {
    if (typeof window !== 'undefined') {
      window.console.log('Socket is initializing')
    }
    io = new Server((global as any).server)

    io.on('connection', (socket: any) => {
      socket.on('wallet-update', (msg: any) => {
        socket.broadcast.emit('wallet-update', msg)
      })
    })
  } else {
    if (typeof window !== 'undefined') {
      window.console.log('Socket is already running')
    }
  }

  return new Response(JSON.stringify({ message: 'WebSocket initialized' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}
