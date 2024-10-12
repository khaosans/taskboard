'use client';

import React from 'react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

const Notification: React.FC<{ message: string; type: 'success' | 'warning' | 'info' }> = ({ message, type }) => {
    return (
        <div className={`flex items-center p-4 mb-2 rounded ${type === 'success' ? 'bg-green-100' : type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
            {type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mr-2" />}
            {type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />}
            {type === 'info' && <Info className="h-5 w-5 text-blue-600 mr-2" />}
            <span>{message}</span>
        </div>
    );
};

export default Notification;