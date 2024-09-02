import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { queryClient } from './config/query.ts';
import { QueryClientProvider } from 'react-query';
import { Toaster } from './component/ui/toast.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster duration={2000} position='top-right' richColors closeButton />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
