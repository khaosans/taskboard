import React from 'react';

interface YourComponentProps {
    propName?: string;
}

const YourComponent: React.FC<YourComponentProps> = ({ propName }) => {
    return (
        <div>
            <h1>{propName || 'Default Text'}</h1>
        </div>
    );
};

export default YourComponent;