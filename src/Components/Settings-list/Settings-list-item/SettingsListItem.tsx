import React from 'react'
import { Link } from 'react-router-dom'
import './SettingsListItem.scss'

export interface ISettingsListItem {
    text: string
    link: string
}
const SettingsListItem:React.FC<ISettingsListItem> = ({text, link}) => {
    return (
        
        <div className='settings-list-item'>
            <Link to={`${link}`}>
            <h4>{text}</h4>
            </Link>
        </div>
        
    )
}

export default SettingsListItem
