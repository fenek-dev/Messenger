import React from 'react'
import './ListItem.scss'

export interface IListItem {
    name: string
    photoUrl: string
    lastMessage: string
    date: string
    className?:string
}

const ListItem:React.FC<IListItem> = ({name, photoUrl, lastMessage, date, className}) => {
    return (
        <div className={`list-item ${className && className}`}>
                    <img src={photoUrl} alt="avatar" className='list-item__avatar icon'/>
                    <div className="list-item__content">
                      <h5 className="list-item__content-name">
                    {name}
                    </h5>
                    <p className="list-item__content-last-message">
                    {lastMessage}
                    </p>  
                    </div>
                    
                    <span className="list-item__date">
                    {date}
                    </span>
                </div>
    )
}

export default ListItem
