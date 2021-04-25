import {Schema, model} from 'mongoose'
import {IChatModel} from './types'

const schema = new Schema({
  members: [{type: String}],
  last_message: {type: String},
  created_at: {type: Number},
})

export default model<IChatModel>('Chat', schema)
