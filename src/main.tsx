import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { setupStore } from './app/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={setupStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
