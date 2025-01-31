import { Component } from 'react';
import { IProps, IState } from './interface';
import Error404Page from '../components/404Page/404page';

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
      return <Error404Page />;
    }
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
