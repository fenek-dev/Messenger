import { ADD_USER_IN_SEARCH, CLEAN_SEARCH } from '../Constants';
import { ISearchState } from '../Reducers/Reducers';
import { IAction, IThunkAction } from './Actions';

export const AddUserInSearchAction: IAction<ISearchState> = (payload) => ({
  type: ADD_USER_IN_SEARCH,
  payload,
});

export const CleanSearchAction: IAction = () => ({
  type: CLEAN_SEARCH,
});

export const SearchThunk: IThunkAction = (value: string) => async (
  dispatch
) => {
  try {
    const res = await fetch('/api/search/find', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }

    dispatch(CleanSearchAction(''));
    data.forEach((user: any) => {
      dispatch(
        AddUserInSearchAction({
          user_id: user.user_id,
          user_name: user.user_name,
          user_photo: user.user_photo || '',
        })
      );
    });
  } catch (error) {
    console.error(error.message);
  }
};
