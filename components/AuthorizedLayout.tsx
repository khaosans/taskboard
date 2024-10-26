'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const AuthorizedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const isAuthenticated = true; // Replace with your own authentication check

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return <>{children}</>;
};

export default AuthorizedLayout;
