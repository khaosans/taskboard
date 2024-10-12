'use client';

import React from 'react';

export default function AuthHandler() {
    return (
        <div>
            <h1>Login</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
            <button>Login with Google</button>
        </div>
    );
}