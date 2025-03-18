import CoutriesList from './components/countries-list/list';
import Header from './components/header/header';

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col w-[100vw] bg-[#565656]">
        <Header />
        <CoutriesList />
      </div>
    </>
  );
}

export default App;
