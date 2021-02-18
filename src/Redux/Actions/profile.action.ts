import { ADD_PROFILE, CLEAN_PROFILE } from '../Constants';
import { IProfileState } from '../Reducers/Reducers';
import { IAction, IThunkAction } from './Actions';

export const AddProfileAction: IAction<IProfileState> = (payload) => ({
  type: ADD_PROFILE,
  payload,
});

export const CleanProfile: IAction = () => ({
  type: CLEAN_PROFILE,
});

export const GetProfileThunk: IThunkAction = (user_id: string) => async (
  dispatch
) => {
  try {
    dispatch(CleanProfile(''));
    const res = await fetch('/api/auth/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
    console.log(data);

    dispatch(AddProfileAction(data));
  } catch (error) {
    console.error(error.message);
  }
};
