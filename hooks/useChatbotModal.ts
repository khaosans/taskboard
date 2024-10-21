import { useState } from 'react';

export function useChatbotModal() {
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  const openChatbotModal = () => setIsChatbotModalOpen(true);
  const closeChatbotModal = () => setIsChatbotModalOpen(false);

  return {
    isChatbotModalOpen,
    openChatbotModal,
    closeChatbotModal,
  };
}
