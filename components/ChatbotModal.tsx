'use client';

import React from 'react';
import Modal from './Modal';

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chatbot">
      <div className="flex flex-col h-96">
        <div className="flex-grow overflow-auto mb-4">
          {/* Add your chat history here */}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-grow mr-2 p-2 rounded bg-gray-700 text-white"
            placeholder="Type your message..."
          />
          <button
            onClick={onClose}
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
