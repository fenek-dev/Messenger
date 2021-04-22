import {IMessageModel} from '../models/types'

export type IMessageCreateReqBody = Pick<
  IMessageModel,
  'body' | 'chat_id' | 'created_at' | 'from' | 'reply'
>

export interface IMessageUpdateReqBody
  extends Pick<IMessageModel, 'body' | 'chat_id'> {
  readonly message_id: string
}
