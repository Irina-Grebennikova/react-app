import { Component, ReactNode } from 'react';

import { ErrorBoundary } from '@/components/ui';
import { SearchPage } from '@/pages/search-page';

class App extends Component {
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    );
  }
}

export { App };
