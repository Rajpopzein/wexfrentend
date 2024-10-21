import React from 'react'
import './ChatBubble.css'
import { Avatar } from '@mui/material'

const ChatBubble = ({message, alinement, images}) => {
  return (
    <div className={alinement ? 'main_bubble message_sender': 'main_bubble' }>
      <Avatar alt='Raj' src={images}/>
      <div className={alinement ? 'message_content message_content_sender':'message_content'}>
        {message}
      </div>
    </div>
  )
}

export default ChatBubble
