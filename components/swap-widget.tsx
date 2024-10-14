"use client"; // Mark this component as a Client Component

import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use'; // Ensure you have this package installed
import WalletConnect from './WalletConnect'; // Import the WalletConnect component
import './styles/SwapWidget.css'; // Ensure this path is correct

const SwapWidget = () => {
    const [tokens, setTokens] = useState<{ id: string; name: string; symbol: string }[]>([]); // Define token type
    const [amountIn, setAmountIn] = useState('');
    const [amountOut, setAmountOut] = useState('');
    const [sellToken, setSellToken] = useState('ETH'); // Default token
    const [buyToken, setBuyToken] = useState('DAI'); // Default token
    const [filteredTokens, setFilteredTokens] = useState(tokens);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPrice = async () => {
        // Fetch price from the 0x API
        try {
            const response = await fetch(`/api/price?sellToken=${sellToken}&buyToken=${buyToken}&amount=${amountIn}`);
            const data = await response.json();
            setAmountOut(data.buyAmount); // Assuming the API returns a buyAmount
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    };

    const handleSwap = async () => {
        const apiKey = process.env.NEXT_PUBLIC_0X_API_KEY; // Access the API key from environment variables
        if (!apiKey) {
            console.error('API key is not defined');
            return; // Exit if apiKey is not defined
        }
        const chainId = 1; // Change this to the appropriate chain ID if needed
        const sellAmount = amountIn; // Use the input amount
        const sellTokenAddress = sellToken; // Use the selected sell token
        const buyTokenAddress = buyToken; // Use the selected buy token

        try {
            const response = await fetch(`https://api.0x.org/gasless/quote?chainId=${chainId}&sellToken=${sellTokenAddress}&buyToken=${buyTokenAddress}&sellAmount=${sellAmount}&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`, {
                method: 'GET',
                headers: {
                    '0x-api-key': apiKey,
                    '0x-version': 'v2',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch swap quote');
            }

            const data = await response.json();
            console.log('Swap Quote:', data); // Log the swap quote for debugging
            setAmountOut(data.buyAmount); // Assuming the response contains a buyAmount
        } catch (error) {
            console.error('Error fetching swap quote:', error);
        }
    };

    useEffect(() => {
        const fetchTokens = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/coins/list'); // Example API
                const data = await response.json();
                setTokens(data); // Set the fetched tokens
                setFilteredTokens(data); // Initialize filtered tokens
            } catch (error) {
                console.error('Error fetching tokens:', error);
            }
        };

        fetchTokens();
    }, []);

    useEffect(() => {
        // Filter tokens based on search term
        const filtered = tokens.filter(token =>
            token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTokens(filtered);
    }, [searchTerm, tokens]); // Ensure tokens are included in the dependency array

    return (
        <div className="swap-widget">
            <WalletConnect /> {/* Add the WalletConnect component here */}
            <h2>Token Swap</h2>
            <div className="input-group">
                <input
                    type="text"
                    value={amountIn}
                    onChange={(e) => setAmountIn(e.target.value)}
                    placeholder="Amount to swap"
                    className="amount-input"
                />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search tokens"
                    className="search-input"
                />
            </div>
            <div className="select-group">
                <select value={sellToken} onChange={(e) => setSellToken(e.target.value)} className="token-select">
                    {filteredTokens.map(token => (
                        <option key={token.id} value={token.symbol}>
                            {token.name} ({token.symbol})
                        </option>
                    ))}
                </select>
                <select value={buyToken} onChange={(e) => setBuyToken(e.target.value)} className="token-select">
                    {filteredTokens.map(token => (
                        <option key={token.id} value={token.symbol}>
                            {token.name} ({token.symbol})
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleSwap} className="swap-button">Swap</button>
            <div className="amount-out">Amount Out: {amountOut}</div>
        </div>
    );
};

export default SwapWidget;
