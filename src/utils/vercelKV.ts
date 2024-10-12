import axios from 'axios';

const vercelKVClient = axios.create({
  baseURL: process.env.KV_REST_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
  },
});

export default vercelKVClient;
