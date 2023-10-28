import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

import { FallbackUI } from '.';

class ErrorBoundary extends Component<PropsWithChildren> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(): { hasError: true } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <FallbackUI />;
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
