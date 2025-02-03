import { Component } from 'react';
import './App.css';
import SearchPage from './components/searchPage/searchPage';
import ErrorBoundary from './utils/errorBoundary';

class App extends Component {
  render() {
    return (
      <div className="min-h-screen flex flex-col items-center bg-[#bab2b5] bg-cover ">
        <ErrorBoundary>
          <SearchPage />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
