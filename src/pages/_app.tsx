import type { AppProps } from 'next/app';
import { ThemeProvider } from '../utils/context/themeContext';
import ErrorBoundary from '../utils/errorBoundary';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '../components/loader/loader';

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const start = () => {
    setIsLoading(true);
  };

  const end = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          {isLoading ? <Loader /> : <Component {...pageProps} />}
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
