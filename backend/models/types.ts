import {Document} from 'mongoose'
export interface IChatModel extends Document {
  readonly members: string[]
  readonly last_message: string
  readonly created_at: number
}

export interface IUserModel extends Document {
  readonly email: string
  readonly password: string
  readonly name: string
  readonly logs: {
    readonly online: boolean
    readonly last_seen: number
  }
  readonly status: string
  readonly photo: string
}

export interface IMessageModel {
  readonly chat_id: string
  readonly from: string
  readonly body: string
  readonly created_at: number
  readonly received: boolean
  readonly edited: boolean
  readonly reply?: {
    readonly from: string
    readonly body: string
    readonly created_at: number
  }
}
