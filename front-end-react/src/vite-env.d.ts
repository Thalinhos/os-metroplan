/// <reference types="vite/client" />

declare module './OrdemServico.jsx' {
    const OrdemServico: any;
    export { OrdemServico };
  }
  
declare module "*.jsx" {
    const content: any;
    export default content;
  }
  