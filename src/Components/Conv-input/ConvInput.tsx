import React from 'react'
import './ConvInput.scss'

const ConvInput = () => {
    return (
        <div className='conv-input'>
            <input type="text" placeholder='Type your message'/>
            <button type='submit' className='conv-input-btn'>Send</button>
        </div>
    )
}

export default ConvInput
