import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto p-4">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Close
        </button>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;