'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react'; // Ensure lucide-react is installed and imported correctly
import supabase from '../utils/supabase'; // Adjust the import based on your file structure
import SkeletonLoader from './SkeletonLoader'; // Import Skeleton Loader
import LoaderSpinner from './LoaderSpinner'; // Import Loader Spinner

interface ChatModalProps {
    onClose: () => void;
    // Add any other props you're using
}

interface Message {
    role: 'user' | 'assistant';
    content: string;

}

//make a jsx modal type 
const ChatBotModal: React.FC<ChatModalProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [models, setModels] = useState<string[]>([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [showAssistantOnly, setShowAssistantOnly] = useState(false); // State for toggle
    const messagesEndRef = useRef<HTMLDivElement | null>(null); // Ref for scrolling

    useEffect(() => {
        fetchModels();
    }, []);

    useEffect(() => {
        // Scroll to the bottom of the messages whenever they change
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const fetchModels = async () => {
        try {
            const response = await fetch('/api/tags');
            if (!response.ok) {
                throw new Error('Failed to fetch models');
            }
            const data = await response.json();
            setModels(data.models);
            if (data.models.length > 0) {
                setSelectedModel(data.models[0]);
            }
        } catch (error) {
            console.error('Error fetching models:', error);
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() && !loading) {
            setLoading(true); // Set loading to true
            const userMessage: Message = { role: 'user', content: inputMessage };
            setMessages(prevMessages => [...prevMessages, userMessage]);
            setInputMessage('');

            try {
                const response = await fetch('http://localhost:11434/v1/chat/completions', { // Updated URL for Ollama API
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: selectedModel,
                        messages: [
                            { role: 'user', content: inputMessage }
                        ],
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text(); // Get the error message from the response
                    throw new Error(`Failed to fetch response: ${errorText}`);
                }

                const reader = response.body?.getReader();
                let assistantMessage = '';

                // Stream the response
                const decoder = new TextDecoder();
                while (true) {
                    const { done, value } = await reader!.read();
                    if (done) break;
                    const chunk = decoder.decode(value, { stream: true });
                    assistantMessage += chunk;

                    // Update the assistant message in the state
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { role: 'assistant', content: assistantMessage } // Append the assistant message
                    ]);
                }

                // Save messages to Supabase
                await supabase.from('messages').insert([
                    { content: inputMessage, role: 'user' },
                    { content: assistantMessage, role: 'assistant' }
                ]);

            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false); // Ensure loading state is reset
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Message copied to clipboard!'); // Optional: Notify the user
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 text-white rounded-lg w-full h-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Chat</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                <div className="flex items-center p-4 border-b border-gray-700">
                    <label className="mr-2">
                        <input
                            type="checkbox"
                            checked={showAssistantOnly}
                            onChange={() => setShowAssistantOnly(!showAssistantOnly)}
                        />
                        Show Assistant Responses Only
                    </label>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {messages.filter(msg => !showAssistantOnly || msg.role === 'assistant' || msg.role === 'user').map((msg, index) => (
                        <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <span className={`inline-block rounded px-2 py-1 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-600'}`}>
                                {msg.content}
                            </span>
                            <button onClick={() => copyToClipboard(msg.content)} className="ml-2 text-gray-300 hover:text-white">
                                Copy
                            </button>
                        </div>
                    ))}
                    {loading && (
                        <div className="flex justify-center items-center mb-4">
                        <LoaderSpinner /> {/* Spinner */}
                    </div>
                    )}
                    <div ref={messagesEndRef} /> {/* Empty div to scroll to */}
                </div>
                <div className="p-4 border-t border-gray-700">
                    <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full mb-2 bg-gray-700 text-white border border-gray-600 rounded px-2 py-1"
                    >
                        {models.map((model) => (
                            <option key={model} value={model}>{model}</option>
                        ))}
                    </select>
                    <div className="flex">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-l px-2 py-1"
                            placeholder="Type a message..."
                            disabled={loading}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-1 rounded-r"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatBotModal;