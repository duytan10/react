import React from "react";
import useSWR from "swr";
import { Swiper, SwiperSlide } from "swiper/react";

import { fetcher } from "../../config";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=88166d730835a312ecede71f7a883378`,
    fetcher
  );
  const { data: genres } = useSWR(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=88166d730835a312ecede71f7a883378`,
    fetcher
  );

  const movies = data?.results || [];
  const genreList = genres?.genres || [];
  return (
    <div className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} genres={genreList}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

function BannerItem({ item, genres }) {
  const { title, poster_path, genre_ids } = item;
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg overlay"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-white bottom-5 left-5">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          {genre_ids.length > 0 &&
            genre_ids.map((genreId) => (
              <span
                className="px-4 py-2 border border-white rounded-md"
                key={genreId}
              >
                {genres.find((genre) => genre.id === genreId).name}
              </span>
            ))}
        </div>
        <button className="px-5 py-3 font-medium text-white rounded-lg bg-primary">
          Watch now
        </button>
      </div>
    </div>
  );
}

export default Banner;
