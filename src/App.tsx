import { Component } from 'react';

import { ErrorBoundary } from '@/components/error-ui';
import { SearchPage } from '@/pages/search-page';

class App extends Component {
  render(): JSX.Element {
    return (
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    );
  }
}

export { App };
