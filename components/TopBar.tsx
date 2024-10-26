'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Bell, Settings, MessageCircle, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ChatbotModal from './ChatbotModal';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Web3SignIn from './Web3SignIn';
import { motion } from 'framer-motion';
import { useNotifications } from '@/hooks/useNotifications';
import { createClerkSupabaseClient } from 'lib/supabase';

interface TopBarProps {
    onWalletChange: (wallet: any) => void;
    selectedWallet: any;
}

const TopBar: React.FC<TopBarProps> = ({ onWalletChange, selectedWallet }) => {
    return (
        <div>
            {/* TopBar content */}
        </div>
    );
};

export default TopBar;
