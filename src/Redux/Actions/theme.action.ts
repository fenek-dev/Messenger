import {ADD_THEME} from '../Constants'
import {TTheme} from '../Reducers/Reducers'
import {IAction} from './Actions'

export const AddThemeAction: IAction<{theme: TTheme}> = payload => ({
  type: ADD_THEME,
  payload,
})
