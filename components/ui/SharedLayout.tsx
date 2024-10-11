import React, { ReactNode } from 'react';

interface SharedLayoutProps {
    children: ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {children}
            </div>
        </div>
    );
};

export default SharedLayout;