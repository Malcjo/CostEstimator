import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FrontendApp from './FrontendApp.jsx';

const adminRoot = document.getElementById('root');
const frontendRoot = document.getElementById('estimator-root');

if(adminRoot){
  createRoot(adminRoot).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

if(frontendRoot){
  createRoot(frontendRoot).render(
    <StrictMode>
      <FrontendApp />
    </StrictMode>,
  );
}