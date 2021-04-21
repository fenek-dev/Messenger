import { Schema, model, Document } from 'mongoose';
import { IMessageModel } from './types';

const messageSchema = new Schema({
  chat_id: { type: String, required: true },
  from: { type: String, required: true },
  body: String,
  created_at: { type: Number, required: true },
  received: Boolean,
  edited: Boolean,
  reply: {
    from: { type: String },
    body: String,
    created_at: { type: Number },
  },
});

export default model<IMessageModel & Document>('Message', messageSchema);
