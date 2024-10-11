import { useEffect } from 'react';
import { AppProps } from 'next/app';
import logger from '@/lib/logger';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Log available environment variables
    logger.info('Available Environment Variables:');
    logger.info(`DEBANK_API_KEY: ${process.env.DEBANK_API_KEY ? 'Set' : 'Not Set'}`);
    logger.info(`NEXT_PUBLIC_SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
    logger.info(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not Set'}`);
    // Add more variables as needed
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;