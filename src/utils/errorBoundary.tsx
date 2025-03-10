import { Component } from 'react';
import { IProps, IState } from './interface';

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  componentDidCatch(error: Error) {
    if (error) {
      this.setState({ hasError: true });
    }
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className="flex flex-col w-[1320px] mx-auto bg-gray-500/70 backdrop-blur-2xl border border-white/18 rounded-xl min-h-screen items-center justify-center gap-8 shadow-xl shadow-gray-700/20">
          <h1>Something went wrong...</h1>
          <button
            className="w-[150px] h-[50px] cursor-pointer rounded-md bg-[#5555ff] text-white text-2xl border-none"
            type="button"
            onClick={this.refreshPage}
          >
            Reload Page
          </button>
        </div>
      );
    }
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
