'use client';

import React from 'react';

const Spinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
    );
};

export default Spinner;