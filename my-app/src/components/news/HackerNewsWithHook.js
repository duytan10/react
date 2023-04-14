import React from "react";
import useHackerNewsAPI from "../hooks/useHackerNewsAPI";
//https://hn.algolia.com/api/v1/search?query=react

const HackerNews = () => {
  const {hits, query, loading, errorMessage, setUrl, setQuery} = useHackerNewsAPI()
  return (
    <div className="bg-white mx-auto mt-5 p-5 rounded-lg shadow-md w-1/2">
      <div className="flex mb-5 gap-x-5 ">
        <input type="text" className="border border-gray-200 p-5 block w-full rounded-md transition-all focus:border-blue-400" placeholder="Typr your keywords" defaultValue={query} onChange={(e) => setQuery(e.target.value)} />
        <button onClick={() => setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`)} className="bg-blue-500 text-white font-semibold p-5 rounded-md flex-shrink-0">
          Fetching
        </button>
      </div>
      {loading && <div className="loading w-8 h-8 rounded-full mx-auto my-10 border-blue-500 border-4 border-r-4 border-r-transparent transition-all animate-spin"></div>}
      {!loading && errorMessage && <p className="text-red-400 my-5">{errorMessage}</p>}
      <div className="flex flex-wrap gap-5">
        {!loading &&
          hits.length > 0 &&
          hits.map((item, index) => {
            if (!item.title || item.title.length <= 0) return null;
            return (
              <h3 className="p-3 bg-gray-100 rounded-md" key={item.title}>
                {item.title}
              </h3>
            );
          })}
      </div>
    </div>
  );
};

export default HackerNews;
