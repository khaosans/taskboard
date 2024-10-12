'use client';

import React, { useState } from 'react';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
    const [toasts, setToasts] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);
    let toastId = 0;

    const addToast = (message: string, type: 'success' | 'error' | 'info') => {
        if (toasts.length < 3) { // Limit the number of toasts
            setToasts(prev => [...prev, { id: toastId++, message, type }]);
        }
    };

    const removeToast = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <div className="fixed top-0 right-0 p-4">
            {toasts.map(toast => (
                <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

export default ToastContainer;