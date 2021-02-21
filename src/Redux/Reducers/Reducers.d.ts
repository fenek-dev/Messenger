// Root Reducer
export interface RootReducerInterface {
  readonly user: IUserReducerState;
  readonly chats: IChats[];
  readonly theme: IThemeReducerState;
  readonly search: ISearchState[];
  readonly profile: IProfileState;
}
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
  readonly _id: string;
  readonly from: string;
  readonly body: string;
  readonly created_at: string | number;
  readonly received: boolean;
  readonly reply: {
    created_at: number;
    body: string;
    from: string;
  };
}

export interface IChats {
  readonly chat_id: string;
  readonly companion_id: string;
  readonly companion_name: string;
  readonly companion_last_seen: number;
  readonly last_message: string;
  readonly created_at: string | number;
  messages: IMessage[];
}

export interface ISearchState {
  readonly user_id: string;
  readonly user_name: string;
  readonly user_photo: string;
}

export interface IProfileState {
  readonly user_id: string;
  readonly user_name: string;
  readonly user_photo: string;
  readonly user_status: string;
  readonly user_logs: {
    online: boolean;
    last_seen: number;
  };
}
