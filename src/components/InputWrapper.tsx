'use client';

import React from 'react';
import { Input } from './ui/input'; // Adjust the import path to be outside of the app directory

interface InputWrapperProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ label, ...props }) => {
  return (
    <div className="input-wrapper">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input {...props} />
    </div>
  );
};

export default InputWrapper;