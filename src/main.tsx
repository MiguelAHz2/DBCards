import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Solo importamos las variantes que realmente usamos
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';

// Aseguramos que el elemento root existe
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
