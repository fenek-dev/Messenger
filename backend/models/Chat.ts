import { Schema, model, Document } from 'mongoose';

export interface IChat extends Document {
  members: string[];
  last_message: string;
  created_at: number;
  messages: [
    {
      from: string;
      body: string;
      created_at: number;
      received: boolean;
    }
  ];
}

const schema = new Schema({
  members: [{ type: String }],
  last_message: { type: String },
  created_at: { type: Number },
  messages: [
    {
      from: { type: String, required: true },
      body: String,
      created_at: { type: Number, required: true },
      received: Boolean,
    },
  ],
});

export default model<IChat>('Chat', schema);
