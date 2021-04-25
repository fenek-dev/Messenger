import io from 'socket.io-client'

const createSocket = (user_id: string) => {
  return io({
    query: {
      user_id,
    },
  })
}

export default createSocket
