import React from 'react'
import ConversationHeader from '../../Components/ConversationHeader/ConversationHeader'
import './Conversation.scss'

import user from '../../icons/user.jpg'
import ConvInput from '../../Components/Conv-input/ConvInput'
import Message from '../../Components/Message/Message'
const Conversation = () => {
    return (
        <section className='conversation'>
            <ConversationHeader name='Arthur Moore' photoUrl={user} />
            <div className="conversation-chat">
                
            <Message text='LoremLorem ipsum dolor sit amet consectetur adipisicing elit. A ratione, amet sunt dolore nulla facere, deserunt pariatur earum deleniti tenetur modi maiores, vero quia recusandae praesentium quo aperiam cumque adipisci? ' photoUrl={user} date='12:20' type='foreign'  />
            <Message text='LoremLorem ipsum dolor sit amet consectetur adipisicing elit. A ratione, amet sunt dolore nulla facere, deserunt pariatur earum deleniti tenetur modi maiores, vero quia recusandae praesentium quo aperiam cumque adipisci? ' photoUrl={user} date='12:20' type='own'  />
            <Message text='LoremLorem ipsum dolor sit amet consectetur adipisicing elit. A ratione, amet sunt dolore nulla facere, deserunt pariatur earum deleniti tenetur modi maiores, vero quia recusandae praesentium quo aperiam cumque adipisci? ' photoUrl={user} date='12:20' type='own'  />
            <Message text='LoremLorem ipsum dolor sit amet consectetur adipisicing elit. A ratione, amet sunt dolore nulla facere, deserunt pariatur earum deleniti tenetur modi maiores, vero quia recusandae praesentium quo aperiam cumque adipisci? ' photoUrl={user} date='12:20' type='foreign'  />
            <Message text='LoremLorem ipsum dolor sit amet consectetur adipisicing elit. A ratione, amet sunt dolore nulla facere, deserunt pariatur earum deleniti tenetur modi maiores, vero quia recusandae praesentium quo aperiam cumque adipisci? ' photoUrl={user} date='12:20' type='foreign'  />
            </div>
            <ConvInput/>
            
        </section>
    )
}

export default Conversation
