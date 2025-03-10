import { Link } from 'react-router';

export default function HomePage() {
  return (
    <main className="bg-gray-200 flex flex-col min-h-[100vh]">
      <div className="flex flex-col mt-35 gap-20">
        <h1 className="text-8xl flex justify-center align-top">
          Make your choise
        </h1>
        <div className="flex items-center m-4 justify-around flex-">
          <Link to="/controlled-form">
            <button
              className="rounded-[100%] border-2 border-b-blue-800 w-50 h-50 bg-blue-50 flex items-center justify-center flex-col hover:bg-blue-100 cursor-pointer"
              type="button"
            >
              <img className="w-30 h-30 pb-2" src="/robot.png"></img>
              Control
            </button>
          </Link>
          <Link to="/uncontrolled-form">
            <button
              className="rounded-[100%] border-2 border-b-blue-800 w-50 h-50 bg-blue-50 flex items-center justify-center flex-col hover:bg-blue-100 cursor-pointer"
              type="button"
            >
              <img className="w-30 h-30 pb-2" src="/wind.png"></img>
              Uncontrol
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
