'use client';
export default function ErrorPage() {
  const refreshPage = () => {
    window.location.replace('/');
  };

  return (
    <div
      className="min-h-screen justify-center flex flex-col items-center
       bg-[#bab2b5]
       bg-cover"
    >
      <div style={{ color: 'red' }}>
        <span className="text-4xl">Error: character not found!</span>
      </div>
      <button
        className="bg-[#f96e4d] cursor-pointer border-0 px-6 py-3 rounded-full text-white font-bold mt-4 hover:bg-[#e65c3f] focus:outline-none"
        onClick={refreshPage}
      >
        GET ME HOME
      </button>
    </div>
  );
}
