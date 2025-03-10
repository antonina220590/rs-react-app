import { Routes, Route } from 'react-router';
import HomePage from './pages/home';
import ErrorPage from './pages/404';
import ContolledFormPage from './pages/controlled-form';
import UncontolledFormPage from './pages/uncontrolled-form';

function App() {
  return <Content />;
}

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/controlled-form" element={<ContolledFormPage />} />
      <Route path="/uncontrolled-form" element={<UncontolledFormPage />} />
    </Routes>
  );
};

export default App;
