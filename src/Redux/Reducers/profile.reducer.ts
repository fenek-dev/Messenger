import {ADD_PROFILE, CLEAN_PROFILE} from '../Constants'
import {IProfileState} from './Reducers'

const initialState: IProfileState = {
  user_id: '',
  user_name: '',
  user_photo: '',
  user_status: '',
  user_logs: {
    online: false,
    last_seen: 0,
  },
}

const reducer = (
  state = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case ADD_PROFILE:
      return {...state, ...payload}

    case CLEAN_PROFILE:
      return {
        user_id: '',
        user_name: '',
        user_photo: '',
        user_logs: {
          online: false,
          last_seen: 0,
        },
      }
    default:
      return state
  }
}
export default reducer
