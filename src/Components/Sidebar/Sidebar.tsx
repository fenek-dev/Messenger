import React from 'react'
import './Sidebar.scss'
export interface ISidebar {
    title: string
}

const Sidebar:React.FC<ISidebar> = ({title}) => {
    return (
        <section className='sidebar'>
            <div className="sidebar-header">
                <h2 className="sidebar-header__title">
                    {title}
                </h2>
            </div>
            <div className="sidebar-tabs">
                <ul className='sidebar-tabs__list'>
                    <li className="sidebar-tabs__list-item active">
                        <h4>Chats</h4>
                    </li>
                    <li className="sidebar-tabs__list-item">
                        <h4>Important</h4>
                    </li>
                    <li className="sidebar-tabs__list-item">
                        <h4>Setting</h4>
                    </li>
                </ul>
            </div>
            
        </section>
    )
}

export default Sidebar
