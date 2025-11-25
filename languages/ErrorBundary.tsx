// components/ErrorBoundary.tsx
"use client";

import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "fixed",
            top: "10px",
            right: "10px",
            zIndex: 9999,
            background: "white",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          Language switcher loading...
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
