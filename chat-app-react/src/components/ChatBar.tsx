import React, { useState, useEffect } from 'react';


const ChatBar = ({ socket }: {socket: any}) => {
  const [users, setUsers]:any = useState([]);

  // useEffect(() => {
  //   try {
  //     socket.on('newUserResponse', (data:any) =>  {
  //       setUsers(prevUsers => [...prevUsers, ...data]
  //       // setUsers(data.users
  //       )});
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [socket]);
//   console.log(users);
  
//   useEffect(()=> {
//     function fetchMessages() {
//       fetch("http://localhost:4000/users")
//       .then(response => response.json())
//       .then(data => setUsers(data.users))
//       .catch(error => console.log(error))
//     }
//     fetchMessages()
// }, [])

useEffect(() => {

  socket.on('newUserResponse', (users) => {
    // Update the state with the new list of active users
    setUsers(users);
  });
},[socket,users])

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((user: any) => (
            <p key={user.socketID}>{user.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;
