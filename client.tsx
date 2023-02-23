import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App';
import { worker } from './mocks/worker';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

const container = document.getElementById('app');
const root = createRoot(container as Element);

root.render(<App />);
