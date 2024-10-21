import React, { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Layout from '@/components/Layout';
import { createClerkSupabaseClient } from '@/components/lib/supabase';
import Spinner from '@/components/Spinner';

interface AuthorizedLayoutProps {
  children: ReactNode;
}

const AuthorizedLayout: React.FC<AuthorizedLayoutProps> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuthorization = async () => {
      const client = await createClerkSupabaseClient();
      const { data: { user } } = await client.auth.getUser();
      
      if (user) {
        setIsAuthorized(true);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };

    checkAuthorization();
  }, [router]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Spinner size="large" />
        </div>
      </Layout>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <Layout>{children}</Layout>;
};

export default AuthorizedLayout;
