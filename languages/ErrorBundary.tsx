// In a new DomErrorBoundary.tsx (client component)
"use client";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

class DomErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    if (error.message.includes("removeChild")) {
      return { hasError: true };
    }
    return { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (error.message.includes("removeChild")) {
      // Log or recover (e.g., force refresh)
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>Translation sync issue—refreshing...</div>; // Or null
    }
    return this.props.children;
  }
}

export default DomErrorBoundary;