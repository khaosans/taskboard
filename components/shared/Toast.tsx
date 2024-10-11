'use client';

import React from 'react';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    return (
        <div className={`flex items-center p-4 mb-2 rounded ${type === 'success' ? 'bg-green-100' : type === 'error' ? 'bg-red-100' : 'bg-blue-100'}`}>
            <span className="flex-grow">{message}</span>
            <button onClick={onClose} className="ml-4 text-gray-500 hover:text-gray-700">✖</button>
        </div>
    );
};

export default Toast;