import { Server } from 'socket.io'
import { NextApiRequest } from 'next'
import { NextApiResponseServerIO } from '@/types/next'

const SocketHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('wallet-update', msg => {
        socket.broadcast.emit('wallet-update', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
