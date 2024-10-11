'use client';

import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FloatingActionButton() {
  const isVisible = false; // Set this to true when you want to show the button

  if (!isVisible) return null;

  const handleClick = () => {
    // TODO: Implement action for button click
    console.log('Floating action button clicked');
  };

  return (
    <Button 
      size="icon" 
      className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg"
      onClick={handleClick}
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}