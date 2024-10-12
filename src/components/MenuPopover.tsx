"use client"

import React from 'react';
import Dropdown from '@/components/Dropdown';

const MenuPopover = () => {
    const dropdownItems = [
        { label: 'Dashboard', onClick: () => window.location.href = '/dashboard' },
        { label: 'Profile', onClick: () => window.location.href = '/profile' },
        { label: 'Settings', onClick: () => window.location.href = '/settings' },
    ];

    return (
        <Dropdown label="Menu" items={dropdownItems} />
    );
};

export default MenuPopover;