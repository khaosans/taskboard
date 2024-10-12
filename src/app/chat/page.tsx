'use client';

import React, { useState } from 'react';
import ChatbotModal from '@/components/ChatbotModal';

const ChatPage: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-bold mb-8">Chat Room</h1>
            <button
                onClick={toggleChat}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {isChatOpen ? 'Close Chat' : 'Open Chat'}
            </button>
            {isChatOpen && <ChatbotModal onClose={toggleChat} />}
        </div>
    );
};

export default ChatPage;