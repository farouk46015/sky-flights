import SearchBox from '@components/SearchBox';

function Home() {
  return (
    <div>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 bg-red-500">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2x1">
          <h1>Home</h1>
          <SearchBox />
        </div>
      </div>
    </div>
  );
}

export default Home;
