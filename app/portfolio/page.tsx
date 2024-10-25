'use client';

import React, { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { supabase } from '@/utils/supabase';

interface ChainData {
  id: string;
  name: string;
  usd_value: number;
}

interface PortfolioData {
  total_usd_value: number;
  chain_list: ChainData[];
}

export default function PortfolioPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.error('Error fetching user session:', error);
        setUser(null);
        return;
      }
      setUser(session.user);
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchPortfolioData = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio')
          .select('*')
          .single();

        if (error) throw error;
        setPortfolioData(data);
      } catch (error) {
        console.error('Error fetching portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolioData();
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <div>Please sign in to view your portfolio.</div>;
  }

  if (!portfolioData) {
    return <div>No portfolio data available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your Portfolio</h1>
      <p>Total Balance: ${portfolioData.total_usd_value.toLocaleString()}</p>
      <h3 className="text-xl font-semibold mb-2">Chain Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioData.chain_list.map((chain) => (
          <div key={chain.id} className="bg-gray-800 text-white p-4 rounded">
            <h4>{chain.name}</h4>
            <p>${chain.usd_value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
