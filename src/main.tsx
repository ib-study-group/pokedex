import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes.tsx';
import { PokemonProvider } from './view/components/PokemonProvider.tsx';

import '@fontsource/poppins/500.css';
import '@fontsource/poppins/700.css';
import './styles/reset.css';
import './styles/theme.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
  </React.StrictMode>
);
