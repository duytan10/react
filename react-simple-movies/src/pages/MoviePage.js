import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../config";
import MovieCard from "../components/movie/MovieCard";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [keyWord, setKeyWord] = useState("");
  const [url, setUrl] = useState(tmdbAPI.getMovieList("popular"));
  const [page, setPage] = useState(1);
  const keyWordDebounce = useDebounce(keyWord, 500);
  const { data, isLoading } = useSWR(url, fetcher);
  const movies = data?.results || [];

  // Pagination
  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

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
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <ReactPaginate
        className="mt-10 pagination"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={data?.total_pages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default MoviePage;
