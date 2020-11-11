import { IUserPayload } from '../Actions/Actions';
import { ADD_USER } from '../Constants';
import { IUserReducerState } from './Reducers';

const initialState: IUserReducerState = {
  user_id: '',
  name: '',
};

const reducer = (
  state = initialState,
  { type, payload }: { type: string; payload: IUserPayload }
) => {
  switch (type) {
    case ADD_USER:
      return { ...state, ...payload };

    default:
      return state;
  }
};
export default reducer;
