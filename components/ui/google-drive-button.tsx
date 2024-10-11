import React from 'react';
import { Button } from './button'; // Adjust the import based on your button component location
import { Cloud } from 'lucide-react'; // Assuming you have an icon for Google Drive

interface GoogleDriveButtonProps {
    onClick: () => void;
}

export const GoogleDriveButton: React.FC<GoogleDriveButtonProps> = ({ onClick }) => {
    return (
        <Button onClick={onClick} className="flex items-center">
            <Cloud className="mr-2 h-4 w-4" />
            Link Google Drive
        </Button>
    );
};