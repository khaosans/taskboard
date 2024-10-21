import React from 'react';

export const ChartContainer: React.FC<{ children: React.ReactNode; config: any; className?: string }> = ({ children, config, className }) => (
  <div className={`chart-container ${className}`}>{children}</div>
);

export const ChartTooltip: React.FC<{ content: React.ReactNode }> = ({ content }) => (
  <div className="chart-tooltip">{content}</div>
);

export const ChartTooltipContent: React.FC<{ active?: boolean; payload?: any[] }> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip-content">
        <p>{`Price: $${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};
