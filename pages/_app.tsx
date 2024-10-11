import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ClerkProvider>
      <RedirectToSignIn />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default MyApp;