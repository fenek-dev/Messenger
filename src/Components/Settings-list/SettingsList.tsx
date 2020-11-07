import React from 'react'
import SettingsListItem from './Settings-list-item/SettingsListItem'
import './SettingsList.scss'
const SettingsList = () => {
    return (
        <section className='settings'>
            <div className="settings-list">
                <SettingsListItem text='Account' link='/account' />
                <SettingsListItem text='Theme' link='/theme' />
                

            </div>
            
        </section>
    )
}

export default SettingsList
