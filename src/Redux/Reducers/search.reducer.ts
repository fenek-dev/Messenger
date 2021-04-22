import {ADD_USER_IN_SEARCH, CLEAN_SEARCH} from '../Constants'
import {ISearchState} from './Reducers'

const initialState: ISearchState[] = []

const reducer = (
  state = initialState,
  {type, payload}: {type: string; payload: any},
) => {
  switch (type) {
    case ADD_USER_IN_SEARCH:
      return [...state, payload]

    case CLEAN_SEARCH:
      return []

    default:
      return state
  }
}
export default reducer
