import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";

const MoviePage = () => {
  const [keyWord, setKeyWord] = useState("");
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/popular?api_key=88166d730835a312ecede71f7a883378&page=1"
  );
  const [page, setPage] = useState(1);
  const keyWordDebounce = useDebounce(keyWord, 500);
  const { data, isLoading } = useSWR(url, fetcher);
  const { results: movies, total_pages } = data || [];
  console.log("file: MoviePage.js:16 ~ data:", data);

  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
  };

  useEffect(() => {
    if (keyWordDebounce) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=88166d730835a312ecede71f7a883378&query=${keyWordDebounce}&page=${page}`
      );
    } else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=88166d730835a312ecede71f7a883378&page=${page}`
      );
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
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="flex items-center justify-center mt-10 gap-x-5">
        <span
          className="cursor-pointer hover:text-primary"
          onClick={() => setPage(page - 1)}
        >
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
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
        {new Array(total_pages).fill(0).map((item, index) => (
          <span
            className="cursor-pointer hover:text-primary"
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <span
          className="cursor-pointer hover:text-primary"
          onClick={() => setPage(page + 1)}
        >
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
