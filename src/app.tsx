import { ReactNode } from 'react';

import { ErrorBoundary } from '@/components/ui';
import { SearchPage } from '@/pages/search-page';

function App(): ReactNode {
  return (
    <ErrorBoundary>
      <SearchPage />
    </ErrorBoundary>
  );
}

export { App };
