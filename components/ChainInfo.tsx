import React from 'react';
import { useRouter } from 'next/router';

interface ChainInfoProps {
  chainId: string;
}

const ChainInfo: React.FC<ChainInfoProps> = ({ chainId }) => {
  const [chainInfo, setChainInfo] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchChainInfo = async () => {
      try {
        const response = await fetch(`/api/chain?id=${chainId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch chain info');
        }
        const data = await response.json();
        setChainInfo(data);
      } catch (err) {
        setError('Error fetching chain info');
      } finally {
        setLoading(false);
      }
    };

    fetchChainInfo();
  }, [chainId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!chainInfo) return null;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{chainInfo.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-400">Chain ID:</p>
          <p>{chainInfo.id}</p>
        </div>
        <div>
          <p className="text-gray-400">Community ID:</p>
          <p>{chainInfo.community_id}</p>
        </div>
        <div>
          <p className="text-gray-400">Native Token:</p>
          <p>{chainInfo.native_token_id}</p>
        </div>
        <div>
          <p className="text-gray-400">Wrapped Token:</p>
          <p>{chainInfo.wrapped_token_id}</p>
        </div>
      </div>
      {chainInfo.logo_url && (
        <img src={chainInfo.logo_url} alt={`${chainInfo.name} logo`} className="mt-4 w-16 h-16" />
      )}
    </div>
  );
};

export default ChainInfo;
