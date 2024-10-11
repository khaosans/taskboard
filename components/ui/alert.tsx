import React from 'react';

interface AlertProps {
    children: React.ReactNode;
}

export const Alert: React.FC<AlertProps> = ({ children }) => {
    return (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            {children}
        </div>
    );
};

export const AlertTitle: React.FC<AlertProps> = ({ children }) => {
    return (
        <strong className="font-bold">{children}</strong>
    );
};

export const AlertDescription: React.FC<AlertProps> = ({ children }) => {
    return (
        <span>{children}</span>
    );
};