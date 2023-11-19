import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { DogBreedDetails } from '@/components/dog-breed-details';
import { ErrorBoundary } from '@/components/ui';
import { NotFoundPage } from '@/pages/not-found-page';
import { SearchPage } from '@/pages/search-page';

const routes = (
  <Route>
    <Route
      path="/"
      element={
        <ErrorBoundary>
          <SearchPage />
        </ErrorBoundary>
      }
    >
      <Route path="details" element={<DogBreedDetails />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export { router, routes };
