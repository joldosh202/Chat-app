import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages, lastMessageRef,typingStatus }: {messages: any}) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message:any) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p className='sender__text'>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p className='recipient__name'>{message.name}</p>
              <div className="message__recipient">
                <p className='sender__text'>{message.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef}></div>

{/* <div className='msgstatus__box'>

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
</div> */}

      </div>
    </>
  );
};

export default ChatBody;