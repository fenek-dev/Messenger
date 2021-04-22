//===== React and styles =====
import React, {memo} from 'react'
import './SettingsHeader.scss'

//===== Interface =====
interface ISettingsHeader {
  title: string
}

//===== Main =====
const SettingsHeader: React.FC<ISettingsHeader> = ({title}) => {
  return (
    <div className="settings-header">
      <h4 className="settings-header__title">{title}</h4>
    </div>
  )
}

export default memo(SettingsHeader)
