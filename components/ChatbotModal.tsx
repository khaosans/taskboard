'use client';

import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatbotModalProps {
  onClose: () => void;
}

const ChatbotModal: React.FC<ChatbotModalProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Greetings, space traveler! How may I assist you on your cosmic journey today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Analyzing your query through the quantum network...", isUser: false }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 w-full max-w-md rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-blue-900">
          <h2 className="text-xl font-bold text-cyan-300">AI Co-pilot</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-6 w-6 text-cyan-300" />
          </Button>
        </div>
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`rounded-lg p-2 max-w-xs ${message.isUser ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-cyan-100'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-800">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-gray-700 text-white border-cyan-500"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} className="bg-cyan-500 text-black hover:bg-cyan-400">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotModal;
