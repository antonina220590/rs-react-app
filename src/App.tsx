import './App.css';
import { Routes, Route } from 'react-router';
import SearchPage from './components/searchPage/searchPage';
import ErrorBoundary from './utils/errorBoundary';
// import Error404Page from './components/404Page/404Page';
import DetailsPage from './components/detailsPage/detailsPage';
import { ThemeProvider } from './utils/context/themeContext';
import { useTheme } from './utils/context/useThemeHook';

function App() {
  return (
    <ThemeProvider>
      <Content />
    </ThemeProvider>
  );
}

const Content = () => {
  const { isDarkTheme } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col items-center ${isDarkTheme ? 'bg-[#474b4f]' : 'bg-[#bab2b5]'} bg-cover`}
    >
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchPage />}>
            <Route path="/character/:id" element={<DetailsPage />} />
          </Route>
          {/* <Route path="*" element={<Error404Page />} /> */}
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
