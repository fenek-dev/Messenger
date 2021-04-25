import {Schema, model} from 'mongoose'
import {IUserModel} from './types'

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  name: {type: String, required: true},
  logs: {
    online: {type: Boolean, required: true, default: false},
    last_seen: {type: Number},
  },
  status: {type: String},
  photo: {type: String, default: ''},
})

export default model<IUserModel>('User', schema)
