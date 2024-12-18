import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import  OrdemServico  from './OrdemServico.jsx'


const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <OrdemServico />
    </StrictMode>,
  );
} else {
  console.error('Elemento root não encontrado!');
}