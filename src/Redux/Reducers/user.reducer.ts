//===== Redux =====
import { IUserPayload } from '../Actions/Actions';
import { IUserReducerState } from './Reducers';

//===== Constants =====
import { ADD_USER, UPDATE_USER_PHOTO } from '../Constants';

const initialState: IUserReducerState = {
  user_id: '',
  status: '',
  name: '',
  photo: '',
  socket: '',
};

const reducer = (
  state = initialState,
  {
    type,
    payload,
  }: { type: string; payload: IUserPayload & { theme: boolean } }
) => {
  switch (type) {
    case ADD_USER:
      return { ...state, ...payload };

    case UPDATE_USER_PHOTO:
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default reducer;
