import React from 'react';

const AuthorizedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = true; // Replace with your own authentication check

    if (!isAuthenticated) {
        // Redirect to login page or show unauthorized message
        return <div>Unauthorized. Please log in.</div>;
    }

    return <>{children}</>;
};

export default AuthorizedLayout;
