import express from 'express'
import cloudinary from '../core/cloudinary'
import User from '../models/User'

class UploadController {
  public create = async (req: express.Request, res: express.Response) => {
    try {
      const {userId, file} = req.body
      const uploadedImg = await cloudinary.v2.uploader.upload(file)
      await User.findByIdAndUpdate(userId, {
        photo: uploadedImg.url,
      })
      res.status(201).json({photo: uploadedImg.url})
    } catch (error) {
      console.error(error)
      res.status(500).json({message: error})
    }
  }
}

export default UploadController
