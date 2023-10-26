import { Component, ErrorInfo, PropsWithChildren } from 'react';

import { FallbackUI } from '.';

class ErrorBoundary extends Component<PropsWithChildren> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI />;
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
