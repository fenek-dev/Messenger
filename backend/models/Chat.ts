import { Schema, model, Document } from 'mongoose';

export interface IMessage {
  readonly from: string;
  readonly body: string;
  readonly created_at: number;
  readonly received: boolean;
  readonly edited: boolean;
  readonly reply?: {
    readonly from: string;
    readonly body: string;
    readonly created_at: number;
  };
}
export interface IChat extends Document {
  readonly members: string[];
  readonly last_message: string;
  readonly created_at: number;
  readonly messages: IMessage[];
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
      edited: Boolean,
      reply: {
        from: { type: String, required: true },
        body: String,
        created_at: { type: Number, required: true },
      },
    },
  ],
});

export default model<IChat>('Chat', schema);
