"use client"

import { useState } from 'react';
import Dropdown from '@/components/Dropdown';

const MenuDropdown = () => {
    const dropdownItems = [
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Profile', href: '/profile' },
        { label: 'Settings', href: '/settings' },
    ];

    const handleItemClick = (href: string) => {
        window.location.href = href;
    };

    const items = dropdownItems.map(item => ({
        label: item.label,
        onClick: () => handleItemClick(item.href)
    }));

    return (
        <Dropdown label="Menu" items={items} />
    );
};

export { MenuDropdown };