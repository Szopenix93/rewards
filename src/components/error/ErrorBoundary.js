import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.onUnhandledRejection);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.onUnhandledRejection);
  }

  onUnhandledRejection = (event) => {
    event.promise.catch((error) => {
      this.setState(ErrorBoundary.getDerivedStateFromError(error));
    });
  };

  componentDidCatch(error, info) {
    //we can log our errors somewhere in the future here
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;