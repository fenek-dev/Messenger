//===== React and Redux =====
import React, {memo, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {SearchThunk} from '../../Redux/Actions/search.action'
import {ISearchState, RootReducerInterface} from '../../Redux/Reducers/Reducers'

//===== Components =====
import ListItem from '../../Components/ListItem/ListItem'

//===== Images =====
import userPhoto from '../../icons/user.jpg'

//===== Interface =====
interface ISearch {
  readonly value: string
}

//===== Main =====
const Search: React.FC<ISearch> = ({value}) => {
  const state = useSelector(
    (state: Readonly<RootReducerInterface>) => state.search,
  )

  const dispatch = useDispatch()
  const [matches, setMatches] = useState<ISearchState[]>([])
  useEffect(() => {
    setMatches(state)
  }, [state])

  useEffect(() => {
    if (value.length > 1) {
      dispatch(SearchThunk(value))
    }
  }, [value, dispatch])
  return (
    <>
      {matches.length > 0 &&
        matches.map(user => (
          <ListItem
            key={user.user_id}
            companion_id={user.user_id}
            name={user.user_name}
            photoUrl={user.user_photo || userPhoto}
            prefix="profile/"
          />
        ))}
    </>
  )
}

export default memo(Search)
