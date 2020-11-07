import React from 'react'
import ListItem from '../../Components/ListItem/ListItem'
import './Chats.scss'
import user from '../../icons/user.jpg'
import search from '../../icons/loupe.svg'


const Chats = () => {
    return (
        <section className='chats'>
            <div className="chats-search">
            <img src={search} alt="search" className='icon-24'/>
            <input type="text" className='chats-search__input' placeholder='Search'/>
            </div>
            <div className="chats-list">
                
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Arthur Moore' photoUrl={user} lastMessage='How are you' date='12:20' className='active-chat'/>
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />
                <ListItem name='Maks Fenek' photoUrl={user} lastMessage='Hi there' date='12:20' />

            </div>
            
        </section>
    )
}

export default Chats
