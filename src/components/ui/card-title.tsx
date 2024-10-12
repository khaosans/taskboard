import React from 'react';

interface CardTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardTitle: React.FC<CardTitleProps> = ({ children, ...props }) => {
  return (
    <div className="card-title" {...props}>
      {children}
    </div>
  );
};