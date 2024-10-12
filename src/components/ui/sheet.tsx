import React, {ReactNode} from 'react';

interface SheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({open, onOpenChange, children}) => {
    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black opacity-50" onClick={() => onOpenChange(false)}/>
            <div
                className={`absolute right-0 top-0 h-full w-80 bg-white transition-transform transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
                {children}
            </div>
        </div>
    );
};

interface SheetTriggerProps {
    asChild?: boolean;
    children: ReactNode;
}

export const SheetTrigger: React.FC<SheetTriggerProps> = ({children}) => {
    return <>{children}</>; // Render children directly, can be enhanced for more functionality
};

interface SheetContentProps {
    children: ReactNode,
    side?: 'left' | 'right',
    className?: string
}

export const SheetContent: React.FC<SheetContentProps> = ({children}) => {
    return <div className={`p-4`}>{children}</div>; // Add padding or styles as needed
};
