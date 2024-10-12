'use client';

import React from 'react';

export const AvatarImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
    />
  );
};