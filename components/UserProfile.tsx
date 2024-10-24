'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UserProfile: React.FC = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      // Fetch user data from Supabase
      const fetchUserData = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('clerk_user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user data:', error);
        } else {
          setUserData(data);
        }
      };

      fetchUserData();
    }
  }, [user]);

  if (!user) return <div>Not logged in</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Clerk User ID: {user.id}</p>
      <p>Email: {user.primaryEmailAddress?.emailAddress}</p>
      {userData && (
        <div>
          <h2>Supabase User Data</h2>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
