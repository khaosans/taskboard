'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';

const UserProfile: React.FC = () => {
    const { user } = useUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.firstName}!</h1>
            <p>Email: {user.emailAddresses[0].emailAddress}</p>
        </div>
    );
};

export default UserProfile;
