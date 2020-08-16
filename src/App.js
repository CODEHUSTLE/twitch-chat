import React, { useState, useEffect } from 'react';
import Feathers from './Feathers';

import ChatPanel from './components/ChatPanel';
import './App.css';

function App() {
  const [chats, setChats] = useState([]);

  console.log(chats);
  useEffect(() => {
    const messages = Feathers.service('messages');

    // Add new messages to the message list
    messages.on('created', (message) => {
      console.log(chats);
      //setChats((chats) => chats.concat(message));
      setChats((chats) => [...chats, message]);
    });
    //loadMsg();
  }, [chats]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img
          src='https://cdn.discordapp.com/attachments/414823428449894410/735484509948084334/duh.png'
          className='App-logo'
          alt='logo'
        />
        <ChatPanel msg={chats}></ChatPanel>
      </header>
    </div>
  );
}

export default App;
