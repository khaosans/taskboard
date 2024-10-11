'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Agent } from '@/types';

interface AgentDetailViewProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

const AgentDetailView: React.FC<AgentDetailViewProps> = ({ agent, isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-content bg-gray-800 text-white p-4 rounded">
        <h2 className="text-xl font-bold">{agent.name}</h2>
        <p><strong>Expertise:</strong> {agent.expertise}</p>
        <p><strong>Backstory:</strong> {agent.backstory}</p>
        <div className="flex justify-between mt-4">
          <Button onClick={onClose} className="bg-red-500">Close</Button>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailView;