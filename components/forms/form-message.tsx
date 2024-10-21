'use client';

import React from 'react';

export const FormMessage: React.FC<{ message: string }> = ({ message }) => (
  <p className="mt-2 text-sm text-red-600">{message}</p>
);
