import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

console.log("Bamboo Chicken Billboard: Initializing React App mounting...");

const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error("Bamboo Chicken Billboard ERROR: #root element not found in DOM!");
} else {
  console.log("Bamboo Chicken Billboard: Found #root element, rendering app...");
  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  );
}


