//===== React and styles =====
import React, { memo } from 'react';
import './DateBar.scss';

//===== Interface =====
interface IDateBar {
  readonly date: string;
}

//===== Main =====
const DateBar: React.FC<IDateBar> = ({ date }) => {
  return <span className='datebar'>{date}</span>;
};

export default memo(DateBar);
