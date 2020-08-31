import React from 'react';

const ChatPanel = (props) => {
  const checkColor = (color) => {
    if (color === null) {
      return '#ff00ff';
    }
    return color;
  };

  const chats = (
    <ul>
      {props.msg.map((chat) => (
        <li
          className='chat-msg'
          key={chat.id}
          style={{
            //borderColor: checkColor(chat.color),
            borderImage: `linear-gradient(
                to bottom,
                ${checkColor(chat.color)},
                rgba(0,0,0,0.8)) 1 10%`,
          }}
        >
          <h5 style={{ color: checkColor(chat.color), margin: 5 }}>
            {chat.user}: <span>{chat.text}</span>
          </h5>
        </li>
      ))}
    </ul>
  );
  return <>{chats}</>;
};

export default ChatPanel;
