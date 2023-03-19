import '@/styles/globals.scss';
import type { AppProps } from 'next/app';

// Redux
import { Provider } from 'react-redux';
import { store } from '../store';

// Notifications
import { Toaster } from 'sonner';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster richColors closeButton />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}
