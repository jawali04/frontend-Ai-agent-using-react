// src/components/UserInput.jsx
import React, { useState } from 'react';
import axios from 'axios';

const UserInput = ({ addMessage }) => {
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (input.trim() === '') return;

    // Add user message to UI
    addMessage({ sender: 'user', text: input });

    try {
      const res = await axios.post('http://localhost:8000/api/chat', {
        message: input,
      });
      addMessage({ sender: 'ai', text: res.data.response });
    } catch (error) {
      addMessage({ sender: 'ai', text: 'Error: Could not reach server' });
    }

    setInput('');
  };

  return (
    <div className="user-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default UserInput;



