//===== React and styles =====
import React, {memo} from 'react'
import {Link} from 'react-router-dom'
import './SettingsListItem.scss'

//===== Interface =====
interface ISettingsListItem extends React.HTMLAttributes<HTMLDivElement> {
  readonly text: string
  readonly link: string
}

//===== Main =====
const SettingsListItem: React.FC<ISettingsListItem> = ({
  text,
  link,
  ...props
}) => {
  return (
    <div data-testid="wrapper" className="settings-list-item" {...props}>
      <Link role="link" to={`${link}`}>
        <h4>{text}</h4>
      </Link>
    </div>
  )
}

export default memo(SettingsListItem)
