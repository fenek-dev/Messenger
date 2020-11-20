import React, { memo } from 'react';
import './DateBar.scss';

export interface IDateBar {
  date: string;
}

const DateBar: React.FC<IDateBar> = ({ date }) => {
  return <span className='datebar'>{date}</span>;
};

export default memo(DateBar);
