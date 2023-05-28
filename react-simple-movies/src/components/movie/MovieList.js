import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import MovieCard from "./MovieCard";
import useSWR from "swr";
import { fetcher } from "../../config";

const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=88166d730835a312ecede71f7a883378`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      <Swiper spaceBetween={40} grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard item={movie}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
