import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  logs: {
    online: boolean;
    last_activity: number;
  };
  status: string;
}

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  logs: {
    online: { type: Boolean, required: true, default: false },
    last_activity: { type: Number },
  },
  status: { type: String },
});

export default model<IUser>('User', schema);