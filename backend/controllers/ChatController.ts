import express from 'express'
import socket from 'socket.io'
import Chat from '../models/Chat'
import Message from '../models/Message'

class ChatController {
  constructor(private io: socket.Server) {}

  public getChat = async (req: express.Request, res: express.Response) => {
    try {
      const {chat_id, user_id} = req.params
      const chat = await Chat.findById(chat_id)

      if (!chat) {
        throw new Error('Chat not found')
      }

      const members = chat!.members
      const companion_id = members.find(user => user !== user_id)
      const messages = await Message.find({chat_id})

      res.status(200).json({chat_id, companion_id, messages})
    } catch (error) {
      console.log(error)

      res.status(500).json(error)
    }
  }

  public create = async (req: express.Request, res: express.Response) => {
    try {
      const members = req.body

      const candidate = await Chat.findOne({members})

      if (candidate) {
        return res.status(400).json({error: 'There is same chat'})
      }

      const chat = new Chat({
        members,
        last_message: '',
        created_at: new Date().getTime(),
      })
      await chat.save()

      res.status(201).json({chat_id: chat._id})
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default ChatController
