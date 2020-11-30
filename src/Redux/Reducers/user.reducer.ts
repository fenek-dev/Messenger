//===== Redux =====
import { IUserPayload } from '../Actions/Actions';
import { IUserReducerState } from './Reducers';

//===== Constants =====
import { ADD_USER } from '../Constants';

const initialState: IUserReducerState = {
  user_id: '',
  status: '',
  name: '',
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

    default:
      return state;
  }
};
export default reducer;
