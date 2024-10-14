import React from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="tooltip-provider">{children}</div>;
};

export const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltip-content">{content}</span>
    </div>
  );
};

export const TooltipTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="tooltip-trigger">{children}</div>;
};

export const TooltipContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="tooltip-content">{children}</div>;
};
