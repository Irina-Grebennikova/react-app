import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { ErrorBoundary } from '@/components/ui';
import { NotFoundPage } from '@/pages/not-found-page';
import { SearchPage } from '@/pages/search-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <SearchPage />
          </ErrorBoundary>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
