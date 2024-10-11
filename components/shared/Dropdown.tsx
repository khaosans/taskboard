'use client';

import React from 'react';

interface DropdownProps {
  label: string;
  items: { label: string; onClick: () => void }[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  return (
    <div className="dropdown">
      <button>{label}</button>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={item.onClick}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;