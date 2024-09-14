import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageBox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch private messages for the user
    axios.get('/api/user/messages')
      .then(response => setMessages(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="message-box">
      <h1>Private Messages</h1>
      <div className="message-list">
        {messages.map(message => (
          <div className="message" key={message.id}>
            <h2>Message from {message.companyName}</h2>
            <p>{message.body}</p>
            <p><strong>Post:</strong> {message.relatedPostTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBox;
