//===== React and styles =====
import React, {memo} from 'react'
import './SettingsItem.scss'

//===== Interface =====
interface ISettingsItem extends React.HTMLAttributes<HTMLDivElement> {}

//===== Main =====
const SettingsItem: React.FC<ISettingsItem> = ({children, ...props}) => {
  return (
    <div data-testid="wrapper" className="settings-item" {...props}>
      {children}
    </div>
  )
}

export default memo(SettingsItem)
