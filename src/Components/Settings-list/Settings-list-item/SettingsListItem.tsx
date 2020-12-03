//===== React and styles =====
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './SettingsListItem.scss';

//===== Interface =====
interface ISettingsListItem {
  readonly text: string;
  readonly link: string;
  readonly onClick?: any;
}

//===== Main =====
const SettingsListItem: React.FC<ISettingsListItem> = ({
  text,
  link,
  onClick,
}) => {
  return (
    <div data-testid='wrapper' onClick={onClick} className='settings-list-item'>
      <Link role='link' to={`${link}`}>
        <h4>{text}</h4>
      </Link>
    </div>
  );
};

export default memo(SettingsListItem);
