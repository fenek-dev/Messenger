import { Schema, model, Document } from 'mongoose';
import { IMessageModel } from './types';

const messageSchema = new Schema({
  from: { type: String, required: true },
  body: String,
  created_at: { type: Number, required: true },
  received: Boolean,
  edited: Boolean,
  reply: {
    from: { type: String, required: true },
    body: String,
    created_at: { type: Number, required: true },
  },
});

export default model<IMessageModel & Document>('Message', messageSchema);
