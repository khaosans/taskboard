'use client';

import React from 'react';

const Slider: React.FC<{ value: number; onChange: (value: number) => void; max?: number; min?: number; step?: number }> = ({ value, onChange, max = 100, min = 0, step = 1 }) => {
    return (
        <input
            type="range"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            max={max}
            min={min}
            step={step}
            className="w-full"
        />
    );
};

export default Slider;