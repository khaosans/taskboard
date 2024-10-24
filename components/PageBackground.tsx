import React from 'react';

interface PageBackgroundProps {
  children: React.ReactNode;
}

const PageBackground: React.FC<PageBackgroundProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {children}
    </div>
  );
};

export default PageBackground;
