import { render, screen } from '@testing-library/react';
import { ReactElement } from 'react';

import { ErrorBoundary } from './error-boundary';

function TestComponent(): ReactElement {
  throw new Error('Test error');
}

describe('ErrorBoundry', () => {
  it('renders fallback ui on error in a nested component', () => {
    console.error = jest.fn();
    console.log = jest.fn();

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Sorry, something went wrong there/i)).toBeInTheDocument();
  });
});
