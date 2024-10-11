import axios from 'axios';

const VERCEL_KV_URL = process.env.VERCEL_KV_URL;
const VERCEL_KV_TOKEN = process.env.VERCEL_KV_TOKEN;

export const setKV = async (key: string, value: any) => {
    try {
        await axios.post(`${VERCEL_KV_URL}/set`, {
            key,
            value,
        }, {
            headers: {
                Authorization: `Bearer ${VERCEL_KV_TOKEN}`,
            },
        });
    } catch (error) {
        console.error('Error setting value in Vercel KV:', error);
    }
};

export const getKV = async (key: string) => {
    try {
        const response = await axios.get(`${VERCEL_KV_URL}/get`, {
            params: { key },
            headers: {
                Authorization: `Bearer ${VERCEL_KV_TOKEN}`,
            },
        });
        return response.data.value;
    } catch (error) {
        console.error('Error getting value from Vercel KV:', error);
        return null;
    }
};