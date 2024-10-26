'use client';

import React from 'react';

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative">{children}</div>
);

export const DropdownMenuTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div>{children}</div>
);

export const DropdownMenuContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`absolute mt-2 bg-white shadow-lg rounded ${className}`}>{children}</div>
);

export const DropdownMenuItem: React.FC<{ children: React.ReactNode; onClick: () => void }> = ({ children, onClick }) => (
    <div onClick={onClick} className="p-2 hover:bg-gray-100 cursor-pointer">
        {children}
    </div>
);

export const DropdownMenuLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="p-2 font-bold">{children}</div>
);

export const DropdownMenuSeparator: React.FC = () => <div className="border-t my-1" />;
