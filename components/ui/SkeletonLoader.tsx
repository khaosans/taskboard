import React from 'react';

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={`bg-gray-700 animate-pulse rounded ${className}`} />
    );
};

export default SkeletonLoader;