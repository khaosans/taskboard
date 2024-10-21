'use client';

import React, { useState } from 'react';
import Modal from './Modal';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, `You: ${message}`]);

      // Send the message to the chatbot API
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChatHistory((prev) => [...prev, `Bot: ${data.reply}`]); // Assuming the API returns a reply field
      setMessage('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chatbot">
      <div className="flex flex-col h-96">
        <div className="flex-grow overflow-auto mb-4">
          {chatHistory.map((msg, index) => (
            <p key={index} className="mb-2 text-white">{msg}</p>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-grow mr-2 p-2 rounded bg-gray-700 text-white"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatbotModal;
