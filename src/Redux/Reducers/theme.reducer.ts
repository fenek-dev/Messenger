import { ADD_THEME } from '../Constants';
import { IThemeReducerState, TTheme } from './Reducers';

const initialState: IThemeReducerState = {
  theme: null,
  textSize: 10,
  messageTheme: '',
  messageBorderRadius: 5,
  chatBackgroundImg: '',
};

const reducer = (
  state = initialState,
  { type, payload }: { type: string; payload: { theme: TTheme } }
) => {
  switch (type) {
    case ADD_THEME:
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default reducer;
