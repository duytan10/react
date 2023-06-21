import React, { useEffect, useState } from "react";
import useSWRInfinite from "swr/infinite";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "components/movie/MovieCard";
import useDebounce from "hooks/useDebounce";
import Button from "components/button/Button";
import { v4 } from "uuid";

const MoviePage = () => {
  const [keyWord, setKeyWord] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular"));
  const [page, setPage] = useState(1);
  const [isReachingEnd, setIsReachingEnd] = useState(false);
  const keyWordDebounce = useDebounce(keyWord, 500);
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.total_pages === pageIndex) {
      setIsReachingEnd(true); // reached the end
      return null;
    }
    return url.replace("page=1", `page=${pageIndex + 1}`); // SWR key
  };
  const { data, size, setSize, isLoading } = useSWRInfinite(getKey, fetcher);
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];

  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
  };

  useEffect(() => {
    if (keyWordDebounce) {
      setUrl(tmdbAPI.getMovieSearch(keyWordDebounce, page));
    } else {
      setUrl(tmdbAPI.getMovieList("popular", page));
    }
  }, [keyWordDebounce, page]);

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 text-white outline-none bg-slate-800"
            placeholder="Type here to search ..."
            onChange={handleKeyWordChange}
          />
        </div>
        <button className="p-4 text-white bg-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {isLoading && (
        <div className="w-10 h-10 mx-auto border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!isLoading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={v4(item.id)} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10 text-center">
        <Button onClick={() => setSize(size + 1)} disabled={isReachingEnd}>
          Load more
        </Button>
      </div>
    </div>
  );
};

export default MoviePage;
