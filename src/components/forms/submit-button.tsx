import {useFormContext} from 'react-hook-form';
import React from "react";

type SubmitButtonProps = {
    children: React.ReactNode,
    isLoading?: boolean,
    type?: string
};

export const SubmitButton = ({children, isLoading}: SubmitButtonProps) => {
    const {formState: {isValid}} = useFormContext();

    return (
        <button
            type="submit"
            disabled={!isValid || isLoading} // Disable button if form is invalid or loading
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
            {isLoading ? 'Loading...' : children} {/* Show loading text if isLoading is true */}
        </button>
    );
};
