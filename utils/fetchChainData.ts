import axios from 'axios';

const COINGECKO_API_URL = process.env.COINGECKO_API_URL;

export const fetchTopChains = async () => {
    try {
        const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 10,
                page: 1,
                sparkline: false,
            },
        });
        return response.data; // This will return the top 10 chains
    } catch (error) {
        console.error('Error fetching top chains:', error);
        throw error;
    }
};

export const fetchEthereumBalance = async (address: string) => {
    const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
    try {
        const response = await axios.get('https://api.etherscan.io/api', {
            params: {
                module: 'account',
                action: 'balance',
                address,
                tag: 'latest',
                apikey: ETHERSCAN_API_KEY,
            },
        });
        return response.data.result; // Balance in Wei
    } catch (error) {
        console.error('Error fetching Ethereum balance:', error);
        throw error;
    }
};