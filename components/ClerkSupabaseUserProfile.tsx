'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ClerkSupabaseUserProfile: React.FC = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const syncUserData = async () => {
        setIsLoading(true);
        setError(null);

        try {
          // Check if user exists in Supabase
          let { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('clerk_user_id', user.id)
            .single();

          if (error && error.code !== 'PGRST116') {
            throw error;
          }

          if (!data) {
            // User doesn't exist, create new user
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert([
                {
                  clerk_user_id: user.id,
                  email: user.primaryEmailAddress?.emailAddress,
                  full_name: `${user.firstName} ${user.lastName}`,
                }
              ])
              .single();

            if (insertError) throw insertError;
            data = newUser;
          } else {
            // User exists, update their information
            const { data: updatedUser, error: updateError } = await supabase
              .from('users')
              .update({
                email: user.primaryEmailAddress?.emailAddress,
                full_name: `${user.firstName} ${user.lastName}`,
              })
              .eq('clerk_user_id', user.id)
              .single();

            if (updateError) throw updateError;
            data = updatedUser;
          }

          setUserData(data);
        } catch (err: any) {
          console.error('Error syncing user data:', err);
          setError(err.message || 'An error occurred while syncing user data');
        } finally {
          setIsLoading(false);
        }
      };

      syncUserData();
    }
  }, [user]);

  if (!user) return <div>Not logged in</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

export default ClerkSupabaseUserProfile;
