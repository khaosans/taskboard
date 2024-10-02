"use client"

import React, { useState } from 'react';
import { Modal, Button, Input } from '@geist-ui/core';

interface AddTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (task: { title: string; description: string; }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddTask = () => {
        if (title.trim() && description.trim()) {
            onAdd({ title, description });
            setTitle('');
            setDescription('');
            onClose();
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Modal.Title>Add New Task</Modal.Title>
            <Modal.Content>
                <Input
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Input
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </Modal.Content>
            <Modal.Action passive onClick={onClose}>Cancel</Modal.Action>
            <Modal.Action onClick={handleAddTask}>Add Task</Modal.Action>
        </Modal>
    );
};

export default AddTaskModal;