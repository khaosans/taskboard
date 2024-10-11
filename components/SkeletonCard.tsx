import React from 'react';

const SkeletonCard: React.FC = () => {
    return (
        <div className="animate-pulse bg-gray-200 rounded-lg p-4">
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
        </div>
    );
};

export default SkeletonCard;