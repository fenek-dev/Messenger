// Root Reducer
export interface RootReducerInterface {
  readonly user: IUserReducerState;
  readonly chats: IChats[];
  readonly theme: IThemeReducerState;
}

export type IGetState = () => Readonly<RootReducerInterface>;

// User Eeducer
export interface IUserReducerState {
  readonly user_id: string;
  readonly name: string;
  readonly status: string;
  socket: any;
}

export interface IThemeReducerState {
  readonly theme: TTheme;
  readonly textSize: number;
  readonly messageTheme: string;
  readonly messageBorderRadius: number;
  readonly chatBackgroundImg: string;
}

export type TTheme = 'dark' | null;
// Chats Reducer
export interface IMessage {
  readonly from: string;
  readonly body: string;
  readonly created_at: string | number;
  readonly received: boolean;
}

export interface IChats {
  readonly chat_id: string;
  readonly companion_id: string;
  readonly companion_name: string;
  readonly last_message: string;
  readonly created_at: string | number;
  readonly messages: IMessage[];
}
