import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../services/store';
import { makeStore } from '../services/store';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../utils/context/themeContext';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  route?: string;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = makeStore(),
    route = '/',
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>
          <ThemeProvider> {children}</ThemeProvider>
        </MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
