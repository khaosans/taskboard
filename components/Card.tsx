import React from 'react';
import '@/styles/globals.css';

const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="card">{children}</div>;
};

export default Card;
