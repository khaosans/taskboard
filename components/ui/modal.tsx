import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4">
                <h2 className="text-lg font-bold">{title}</h2>
                <button onClick={onClose} className="absolute top-2 right-2">X</button>
            </div>
        </div>
    );
};

export default Modal;
