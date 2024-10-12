import React from 'react';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 40, color = '#3B82F6' }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full border-t-2 border-b-2"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderColor: color,
        }}
      ></div>
    </div>
  );
};

export default Spinner;