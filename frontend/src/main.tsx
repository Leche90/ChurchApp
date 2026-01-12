import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Modal from 'react-modal';
import './styles/tailwind.css';
import App from './App';

Modal.setAppElement('#root');

const rootElement = document.getElementById('root') as HTMLElement;

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
}