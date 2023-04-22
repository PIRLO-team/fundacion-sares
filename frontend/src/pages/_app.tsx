import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

// Redux
import { Provider } from 'react-redux';
import { store } from '../store';

// Notifications
import { Toaster } from 'sonner';

// Chakra UI Provider
import { ChakraProvider } from '@chakra-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster richColors closeButton duration={10000} />
      <Provider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}
