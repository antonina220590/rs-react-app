import './App.css';
import { Routes, Route } from 'react-router';
import SearchPage from './components/searchPage/searchPage';
import ErrorBoundary from './utils/errorBoundary';
import Error404Page from './components/404Page/404page';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#bab2b5] bg-cover ">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="error" element={<Error404Page />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
