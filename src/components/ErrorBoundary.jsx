import React from 'react';
import PropTypes from 'prop-types';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Top-level React Error Boundary preventing unhandled UI rendering exceptions
 * from producing a blank screen during live hackathon evaluations.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Explicit ErrorBoundary guard: log context cleanly and preserve recovery UI
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6"
        >
          <div className="max-w-xl w-full bg-slate-900 border border-rose-500/30 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center space-x-3 text-rose-400 mb-4">
              <AlertTriangle className="w-8 h-8" aria-hidden="true" />
              <h1 className="text-xl font-bold">Runtime Guard Triggered</h1>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              An unexpected error occurred during rendering. The AeroShield AI recovery boundary
              prevented a blank screen crash.
            </p>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono text-rose-300 mb-6 overflow-x-auto max-h-40">
              {this.state.error?.toString()}
            </div>
            <button
              type="button"
              onClick={this.handleReset}
              className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Reload Application Safely</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
