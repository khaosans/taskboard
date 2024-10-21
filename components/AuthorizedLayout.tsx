import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClerkSupabaseClient } from '@components/lib/supabase';

const AuthorizedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const client = await createClerkSupabaseClient();
            const { data: { user } } = await client.auth.getUser();
            if (!user) {
                router.push('/login');
            } else {
                setUser(user);
                setLoading(false);
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
