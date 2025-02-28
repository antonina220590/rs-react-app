import type { AppProps } from 'next/app';
import { ThemeProvider } from '../utils/context/themeContext';
import ErrorBoundary from '../utils/errorBoundary';
import { wrapper } from '../services/store';
import { Provider } from 'react-redux';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
