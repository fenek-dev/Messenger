import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly logs: {
    readonly online: boolean;
    readonly last_seen: number;
  };
  readonly status: string;
  readonly photo: string;
}

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  logs: {
    online: { type: Boolean, required: true, default: false },
    last_seen: { type: Number },
  },
  status: { type: String },
  photo: { type: String, default: '' },
});

export default model<IUser>('User', schema);
