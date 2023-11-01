import { ReactNode } from 'react';
import { RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ui';
import { router } from '@/router';

function App(): ReactNode {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export { App };
