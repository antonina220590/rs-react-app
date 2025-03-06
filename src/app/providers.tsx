import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from '@/utils/context/themeContext';

interface ProvidersProps {
  children: React.ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
