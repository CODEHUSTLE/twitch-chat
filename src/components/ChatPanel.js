import React from 'react';

const ChatPanel = (props) => {
  console.log(props);
  const chats = (
    <ul>
      {props.msg.map((chat) => (
        <li key={chat.id}>
          {chat.user} {chat.text}
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <h1>HEllo from ChatPAnel</h1>
      {chats}
    </>
  );
};

export default ChatPanel;
