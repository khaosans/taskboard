import React, { useState } from 'react';
import { useSolana } from 'hooks/useSolana';

const SolanaDataFetcher: React.FC = () => {
  const { data, loading, error, getAccountInfo, getBalance, getRecentBlockhash } = useSolana();
  const [publicKey, setPublicKey] = useState('');

  const handleFetchAccountInfo = () => {
    if (publicKey) {
      getAccountInfo(publicKey);
    }
  };

  const handleFetchBalance = () => {
    if (publicKey) {
      getBalance(publicKey);
    }
  };

  return (
    <div>
      <h2>Solana Data Fetcher</h2>
      <input
        type="text"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        placeholder="Enter public key"
      />
      <button onClick={handleFetchAccountInfo}>Fetch Account Info</button>
      <button onClick={handleFetchBalance}>Fetch Balance</button>
      <button onClick={getRecentBlockhash}>Fetch Recent Blockhash</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data.accountInfo && (
        <div>
          <h3>Account Info:</h3>
          <pre>{JSON.stringify(data.accountInfo, null, 2)}</pre>
        </div>
      )}
      {data.balance !== null && (
        <div>
          <h3>Balance:</h3>
          <p>{data.balance} SOL</p>
        </div>
      )}
      {data.recentBlockhash && (
        <div>
          <h3>Recent Blockhash:</h3>
          <p>{data.recentBlockhash}</p>
        </div>
      )}
    </div>
  );
};

export default SolanaDataFetcher;
