import express from 'express'
import socket from 'socket.io'
import User from '../models/User'

class SearchController {
  constructor(private io: socket.Server) {}

  public getMatches = async (req: express.Request, res: express.Response) => {
    try {
      const {value} = req.body
      const reg = new RegExp(value, 'ig')
      const users = await User.find({name: reg})

      const result = users.map(user => ({
        user_id: user._id,
        user_name: user.name,
        user_photo: user.photo,
        status: user.status,
      }))
      if (!users) {
        return res.status(400).json({message: 'There is no the same users'})
      }

      res.json(result)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  }
}

export default SearchController
