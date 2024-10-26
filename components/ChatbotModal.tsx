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
    <Modal>
      {/* Chatbot content */}
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ChatbotModal;
