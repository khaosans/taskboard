import React from 'react';

interface CodeEditorIconProps {
  onClick: () => void;
}

const CodeEditorIcon: React.FC<CodeEditorIconProps> = ({ onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
  </svg>
);

export default CodeEditorIcon;