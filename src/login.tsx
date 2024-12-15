import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import LoginLayout from '@/layouts/login';

console.log(LoginLayout);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginLayout></LoginLayout>
  </StrictMode>
);
