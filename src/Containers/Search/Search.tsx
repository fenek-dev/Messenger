import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchThunk } from '../../Redux/Actions/search.action';
import {
  ISearchState,
  RootReducerInterface,
} from '../../Redux/Reducers/Reducers';
import ListItem from '../../Components/ListItem/ListItem';
import userPhoto from '../../icons/user.jpg';

interface ISearch {
  readonly value: string;
}

const Search: React.FC<ISearch> = ({ value }) => {
  const state = useSelector(
    (state: Readonly<RootReducerInterface>) => state.search
  );

  const dispatch = useDispatch();
  const [matches, setMatches] = useState<ISearchState[]>([]);
  useEffect(() => {
    setMatches(state);
  }, [state]);

  useEffect(() => {
    if (value.length > 1) {
      dispatch(SearchThunk(value));
    }
  }, [value, dispatch]);
  return (
    <>
      {matches.length > 0 &&
        matches.map((user) => (
          <ListItem
            key={user.user_id}
            companion_id={user.user_id}
            name={user.user_name}
            photoUrl={userPhoto}
            prefix='profile/'
          />
        ))}
    </>
  );
};

export default memo(Search);
