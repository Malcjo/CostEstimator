import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import FrontendApp from './FrontendApp.jsx'; // New component for shortcode

const rootElement = document.getElementById('estimator-root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <FrontendApp />
    </StrictMode>
  );
}
