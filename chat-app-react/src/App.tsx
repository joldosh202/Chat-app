import { useState, useEffect } from 'react'
// import * as io from "socket.io-client";
import socketIO from 'socket.io-client'
import { io, Socket } from 'socket.io-client';
const URL = 'http://localhost:4000';
const socket: Socket = io(URL);
import ChatPage from './components/ChatPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './components/Home';
import ChatRooms from './components/ChatRooms';


function App() {
  return (
    <>
      <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}/>
          <Route path="/chat" element={<ChatPage socket={socket} />}/>
          <Route path='/rooms' element={<ChatRooms/>}/>
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
