"use client"

import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const MenuPopover = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [wsConnected, setWsConnected] = useState(false);

    useEffect(() => {
        const storedPublicKey = localStorage.getItem('solanaPublicKey');
        if (storedPublicKey) {
            const newWs = new WebSocket('wss://api.mainnet-beta.solana.com');

            newWs.onopen = () => {
                setWsConnected(true);
                newWs.send(JSON.stringify({ type: 'subscribe', publicKey: storedPublicKey }));
            };

            newWs.onclose = () => setWsConnected(false);

            setWs(newWs);
        }

        return () => {
            if (ws) ws.close();
        };
    }, []);

    const dropdownItems = [
        { label: 'Dashboard', onClick: () => window.location.href = '/dashboard' },
        { label: 'Profile', onClick: () => window.location.href = '/profile' },
        { label: 'Settings', onClick: () => window.location.href = '/settings' },
    ];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                    Menu
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        {dropdownItems.map((item, index) => (
                            <Button key={index} variant="ghost" onClick={item.onClick}>
                                {item.label}
                            </Button>
                        ))}
                    </div>
                    <div className="text-sm text-gray-500">
                        WebSocket: {wsConnected ? 'Connected' : 'Disconnected'}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default MenuPopover;
