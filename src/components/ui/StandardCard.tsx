'use client';

import React from 'react';

interface StandardCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

const StandardCard: React.FC<StandardCardProps> = ({ title, description, children }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
            {children}
        </div>
    );
};

export default StandardCard;