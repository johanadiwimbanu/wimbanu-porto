import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import FoxApp from './FoxApp.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoxApp />
  </StrictMode>
);
