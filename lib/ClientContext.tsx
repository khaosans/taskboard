import React, { createContext, useContext } from 'react';
import { ClerkProvider } from '@clerk/nextjs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ClientContext = createContext({ supabase });

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ClerkProvider>
      <ClientContext.Provider value={{ supabase }}>
        {children}
      </ClientContext.Provider>
    </ClerkProvider>
  );
};

export const useClient = () => useContext(ClientContext);
