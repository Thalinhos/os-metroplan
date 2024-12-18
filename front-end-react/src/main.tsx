import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { OrdemServico } from './OrdemServico.js'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <OrdemServico />
  </StrictMode>,
)
