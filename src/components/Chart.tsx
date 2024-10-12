'use client';

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const Chart: React.FC = () => {
  const [data, setData] = useState<number[]>([10, 20, 30, 40, 50]);

  useEffect(() => {
    const updateData = () => {
      setData((prevData) => {
        const newData = [...prevData];
        newData.shift(); // Remove the first element
        newData.push(Math.floor(Math.random() * 100)); // Add a new random element
        return newData;
      });
    };

    const randomInterval = () => Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;

    const intervalId = setInterval(() => {
      updateData();
      setTimeout(() => {
        clearInterval(intervalId);
        setInterval(updateData, randomInterval());
      }, randomInterval());
    }, randomInterval());

    return () => clearInterval(intervalId);
  }, []);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Random Data',
        data: data,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default Chart;