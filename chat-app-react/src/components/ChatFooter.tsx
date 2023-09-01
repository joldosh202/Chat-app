import React, {useState}  from 'react';
import checkPageStatus from '../utils/functions';
// import { socket } from '../socket';


const ChatFooter = ({socket,typingStatus,timeoutFunc,onKeyDownNotEnter}:{socket:any,typingStatus:any,timeoutFunc:any,onKeyDownNotEnter:any}) => {
  const [message, setMessage] = useState('');

  const handleTyping = () => {
    socket.emit('typing', `${localStorage.getItem('userName')}: is typing`)
  }

  const handleSendMessage = (e:any) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
      checkPageStatus(message, localStorage.getItem("userName")) 
    }
    setMessage('');
  };
   return (
      <div className='chat__footer'>
         <form className="form" onSubmit={handleSendMessage}>
          {/* <div>{typingStatus}</div> */}
        <input
          type="text"
          placeholder={typingStatus ? typingStatus : 'type message'}
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKeyDownNotEnter}
        />
        <button className="sendBtn">SEND</button>
      </form>
      </div>
   );
};

export default ChatFooter;
