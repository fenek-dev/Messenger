import { IUserPayload } from '../Actions/Actions';
import { ADD_THEME, ADD_USER } from '../Constants';
import { IUserReducerState } from './Reducers';

const initialState: IUserReducerState = {
  user_id: '',
  name: '',
  theme: '',
  socket: '',
};

const reducer = (
  state = initialState,
  { type, payload }: { type: string; payload: IUserPayload & { theme: string } }
) => {
  switch (type) {
    case ADD_USER:
      return { ...state, ...payload };

    case ADD_THEME:
      return { ...state, theme: payload.theme };
    default:
      return state;
  }
};
export default reducer;
