import React, { useEffect, useRef, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

interface ChatBodyProps {
  messages:any;
  typingStatus:string;
  lastMessageRef: React.MutableRefObject<null | HTMLDivElement>
  socket: any
}

const ChatPage: React.FC<ChatBodyProps> = ({ socket }: {socket: any}) => {
  const [messages, setMessages]:any = useState([])
  const [typingStatus, setTypingStatus]:any[] = useState('')
  const lastMessageRef = useRef<null | HTMLDivElement>(null)
  const nickname = localStorage.getItem('userName')
///////////////////

let typing = false 
let timeout:any = undefined

function timeoutFunc():any {
  typing = false
  socket.emit('noLongerTyping', `${nickname} stopped typing`)
}

function onKeyDownNotEnter() {
  if(typing == false) {
    typing = true
    socket.emit("typing", `${nickname} is typing`)
    timeout = setTimeout(timeoutFunc, 5000)
  } else {
    clearTimeout(timeout)
    timeout = setTimeout(timeoutFunc, 5000)
  }
}

  ///////////////////
  useEffect(() => {
    socket.on('messageResponse', (data: any) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
  },[messages])

  useEffect(() => {
    socket.on('typingResponse', (data: any) => setTypingStatus(data))
  }, [socket])


   useEffect(()=> {
      function fetchMessages() {
        fetch("http://localhost:4000/api")
        .then(response => response.json())
        .then(data => setMessages(data.messages))
      }
      fetchMessages()
  }, [])
  
  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <ChatBody messages={messages}
        typingStatus={typingStatus}
        lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket} typingStatus={typingStatus} onKeyDownNotEnter={onKeyDownNotEnter}/>
      </div>
    </div>
  );
};

export default ChatPage;