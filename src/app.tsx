import { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from '@/router';

function App(): ReactNode {
  return <RouterProvider router={router} />;
}

export { App };
