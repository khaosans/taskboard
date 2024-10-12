'use client'

import React from 'react'

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h2>Chatbot Modal</h2>
        <button onClick={onClose}>Close</button>
        {/* Add more chatbot content here */}
      </div>
    </div>
  )
}

export default ChatbotModal