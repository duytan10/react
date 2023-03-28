import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
// https://picsum.photos/v2/list
const getPhotos = async (page) => {
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${page}&limit=8`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const Photos = () => {
  const [listPhotos, setListPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const handleLoadMorePhotos = useRef({});
  handleLoadMorePhotos.current = async () => {
    const photos = await getPhotos(nextPage);
    const newsPhotos = [...listPhotos, ...photos];
    setListPhotos(newsPhotos);
    setNextPage(nextPage + 1);
  };

  useEffect(() => {
    handleLoadMorePhotos.current();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-5 p-5">
        {listPhotos.length > 0 &&
          listPhotos.map((item) => (
            <div key={item.id} className="p-3 bg-white shadow-md rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={item.download_url}
                alt={item.author}
              />
            </div>
          ))}
      </div>
      <div className="text-center mb-8">
        <button
          onClick={handleLoadMorePhotos.current}
          className="inline-block px-8 py-4 bg-purple-600 text-white"
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Photos;
