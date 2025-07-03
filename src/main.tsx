import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css';
import App from './App.tsx';
import { StyledEngineProvider } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      {/* <GlobalStyles styles="@layer theme, base, mui, components, utilities" /> */}
      <App />
    </StyledEngineProvider>
  </StrictMode>
);
