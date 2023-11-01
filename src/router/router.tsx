import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import { SearchPage } from '@/pages/search-page';

const router = createBrowserRouter(createRoutesFromElements(<Route path="/" element={<SearchPage />} />));

export { router };
