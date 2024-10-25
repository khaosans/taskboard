import React from 'react';

interface CustomCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ children, onClick, className }) => {
  return (
    <div
      className={`p-4 border rounded-lg shadow-md transition-transform transform hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CustomCard;
