import React from 'react';
import Modal from '@/components/Modal';

interface ChatBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatBotModal: React.FC<ChatBotModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Chat Bot">
      {/* Add chat bot content here */}
      <p>Chat bot content goes here.</p>
    </Modal>
  );
};