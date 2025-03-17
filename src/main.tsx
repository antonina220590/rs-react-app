import { Profiler, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import onRenderCallback from './onRender/onRender.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Profiler id="App" onRender={onRenderCallback}>
        <App />
      </Profiler>
    </StrictMode>
  );
}
