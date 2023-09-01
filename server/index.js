require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const PORT = 4000

const http = require('http').Server(app)
const cors = require('cors')
const fs = require('fs')
const rawData = fs.readFileSync('./model/messages.json')
const usersRawData = fs.readFileSync('./model/users.json')
const messagesData = JSON.parse(rawData)
const usersData = JSON.parse(usersRawData)

connectDB()


app.use(cors())

const socketIO = require('socket.io')(http, {
   cors: {
      origin: "http://localhost:5173",
     methods: ["GET", "POST"]

   }
})

let users = [];
let activeUsers = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
/////////////////////////
  // // Add the new user to the list of active users
  // activeUsers.push({ socketID: socket.id, userName: socket.userName });
  // // Emit an event to all connected sockets with the updated list of active users
  // socketIO.emit('activeUsers', activeUsers);


  // var list = socketIO.sockets.sockets;
  // console.log("Connected sockets:");
  // list.forEach(function(s) {
  //     console.log("    socket.id = ", s.id);
  // });

  // socket.on('join', function(name) {
  //   socket.join(name);

  //   // list all rooms
  //   console.log("Active rooms:");
  //   var rooms = io.sockets.adapter.rooms;
  //   for (var room in rooms) {
  //       if (rooms.hasOwnProperty(room)) {
  //           console.log("     ", room);
  //       }
  //   }

  //   // list all rooms this socket is in:
  //   console.log("Active rooms for this socket:");
  //   io.sockets.connected[socket.id].rooms.forEach(function(room) {
  //       console.log("    ", room);
  //   });


// });
/////////////////////

// socket.on('leave', function(name) {
//     socket.leave(name);
// });

// client.on("UserEnteredRoom", (userData) => {
//   var enteredRoomMessage = {message: `${userData.username} has entered the chat`, username: "", userID: 0, timeStamp: null}
//   chatRoomData.push(enteredRoomMessage)
//   sendUpdatedChatRoomData(client)
//   connectedClients[client.id] = userData

// })

  socket.on("message", data => {
    messagesData["messages"].push(data)
    const stringData = JSON.stringify(messagesData, null, 2)
    fs.writeFile("./model/messages.json", stringData, (err)=> {
      console.error(err)
    })
    socketIO.emit("messageResponse", data)
  })

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data))
  socket.on('noLongerTyping', ({data}) => {
    socket.broadcast.emit('typingResponse', data)
  })

  socket.on("newUser", data => {
    
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  })
  // socketIO.emit("newUserResponse")


  //Listens when a new user joins the server
  // socket.on('newUser', (data) => {
  //   //Adds the new user to the list of users
  //   // users.push(data);
  //   usersData["users"].push(data)
  //   // console.log(users);
  //   //Sends the list of users to the client
  //   socketIO.emit('newUserResponse', users);
  // });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');

    console.log('🔥: A user disconnected');
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});

app.get('/api', (req,res) => {
   res.json(
      messagesData
   )
})
app.get('/users', (req,res) => {
   res.json(
      usersData
   )
})

// mongoose.connection.once('open', () => {
  // console.log('Connected to MongoDB');
  http.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
 })
// })

