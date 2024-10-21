import React from 'react'
import './chatcard.css'
import Avatar from '@mui/material/Avatar';

const Chatcard = () => {
  return (
    <div className='recent_chat_body'>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      <div className='chat_content'>
        <p className='chat_name'>John Doe</p>
        <p className='chat_message'>Hello, how are you?</p>
      </div>
    </div>
  )
}

export default Chatcard
