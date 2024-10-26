import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClerkSupabaseClient } from '@/components/lib/supabase';
import logger from '@/lib/logger';

const AuthorizedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const client = await createClerkSupabaseClient();
                const { data: { user } } = await client.auth.getUser();
                if (!user) {
                    router.push('/login');
                } else {
                    setUser(user);
                    setLoading(false);
                }
            } catch (error) {
                logger.error('Error checking session:', error);
                router.push('/login');
            }
        };

        checkSession();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default AuthorizedLayout;
