import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { NotFoundPage } from '@/pages/not-found-page';
import { SearchPage } from '@/pages/search-page';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<SearchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export { router };
