import React, { useState, useEffect } from 'react';
import Feathers from './Feathers';

import ChatPanel from './components/ChatPanel';
import './App.css';

function App() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const messages = Feathers.service('messages');
    // Add new messages to the message list
    messages.on('created', (message) => {
      setChats((chats) => [...chats, message]);
    });
  }, []);

  if (chats.length >= 8) {
    chats.shift();
  }

  return (
    <div className='App'>
      <ChatPanel msg={chats}></ChatPanel>
    </div>
  );
}

export default App;
