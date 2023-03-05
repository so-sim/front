import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
window.React = React;

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

const container = document.getElementById('app');
const root = createRoot(container as Element);

root.render(<App />);
