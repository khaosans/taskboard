'use client';

import React, { useState } from 'react';
import ChatbotModal from '@/components/ChatbotModal';

const ChatPage: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => setIsChatOpen(!isChatOpen);

    return (
        <div>
            <button onClick={toggleChat}>Open Chat</button>
            <ChatbotModal   isOpen={isChatOpen} onClose={toggleChat} />
        </div>
    );
};

export default ChatPage;
