import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@/app';
import '@/index.module.scss';
import '@/vars.module.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
