import React from "react";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, children, ...props }) => (
    <button {...props} disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {isLoading ? 'Loading...' : children}
    </button>
);
