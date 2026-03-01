import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Signal to prerender plugin that app is ready
if (typeof window !== 'undefined') {
  document.dispatchEvent(new Event('app-rendered'));
}
