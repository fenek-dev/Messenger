import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './SettingsListItem.scss';

export interface ISettingsListItem {
  readonly text: string;
  readonly link: string;
  readonly onClick?: any;
}
const SettingsListItem: React.FC<ISettingsListItem> = ({
  text,
  link,
  onClick,
}) => {
  return (
    <div onClick={onClick} className='settings-list-item'>
      <Link to={`${link}`}>
        <h4>{text}</h4>
      </Link>
    </div>
  );
};

export default memo(SettingsListItem);
