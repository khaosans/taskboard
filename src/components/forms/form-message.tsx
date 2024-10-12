'use client';

import React from 'react';

interface FormMessageProps {
  message: string;
}

export const FormMessage: React.FC<FormMessageProps> = ({ message }) => {
  return (
    <div className="text-red-500 text-sm mt-2">
      {message}
    </div>
  );
};
