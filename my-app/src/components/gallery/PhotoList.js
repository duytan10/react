import React from "react";
import { useGallery } from "../../contexts/galleryContext";
import PropTypes from "prop-types";

const PhotoList = () => {
  const { photos } = useGallery();
  return (
    <div className="px-5 py-10">
      <div className="grid grid-cols-4 gap-10">
        {photos.length > 0 &&
          photos.map((item) => (
            <PhotoItem key={item.id} info={item}></PhotoItem>
          ))}
      </div>
    </div>
  );
};

const PhotoItem = ({ info: { url, id, isFavorite } }) => {
  const { toggleFavorite, addToCart } = useGallery();
  const item = { url, id, isFavorite };
  return (
    <div className="relative w-[300px] cursor-pointer group">
      <img src={url} alt="" className="object-cover w-full h-full" />
      <span
        className="absolute z-10 invisible w-8 opacity-0 cursor-pointer right-5 top-5 group-hover:opacity-100 group-hover:visible"
        onClick={() => toggleFavorite(id)}
      >
        {isFavorite ? (
          <svg
            width="42"
            height="38"
            viewBox="0 0 42 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-full"
          >
            <path
              d="M0.166626 11.5C0.166108 8.47984 1.37993 5.58633 3.53499 3.47045C5.69005 1.35458 8.60534 0.19405 11.625 0.249979C15.2027 0.230979 18.6166 1.74826 21 4.41665C23.3833 1.74826 26.7972 0.230979 30.375 0.249979C33.3946 0.19405 36.3099 1.35458 38.4649 3.47045C40.62 5.58633 41.8338 8.47984 41.8333 11.5C41.8333 22.6583 28.5437 31.0833 21 37.75C13.4729 31.0271 0.166626 22.6666 0.166626 11.5Z"
              fill="#FC2872"
            />
          </svg>
        ) : (
          <svg
            width="42"
            height="38"
            viewBox="0 0 42 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-full"
          >
            <path
              d="M21 37.7499C19.6563 36.5582 18.1375 35.3186 16.5313 33.9999H16.5104C10.8542 29.3749 4.44376 24.1416 1.61251 17.8707C0.682335 15.8743 0.18939 13.7022 0.16665 11.4999C0.160438 8.47799 1.37245 5.58112 3.52877 3.464C5.6851 1.34688 8.60372 0.188223 11.625 0.249901C14.0847 0.253786 16.4913 0.964653 18.5583 2.29782C19.4666 2.88734 20.2884 3.60043 21 4.41657C21.7156 3.60364 22.5376 2.89096 23.4438 2.29782C25.5099 0.96439 27.916 0.253481 30.375 0.249901C33.3963 0.188223 36.3149 1.34688 38.4712 3.464C40.6276 5.58112 41.8396 8.47799 41.8334 11.4999C41.8121 13.7058 41.3191 15.8816 40.3875 17.8812C37.5563 24.152 31.1479 29.3832 25.4917 33.9999L25.4708 34.0166C23.8625 35.327 22.3458 36.5666 21.0021 37.7666L21 37.7499ZM11.625 4.41657C9.68441 4.39228 7.81266 5.13499 6.41667 6.48323C5.07164 7.80441 4.31991 9.61458 4.33316 11.4999C4.35694 13.1051 4.72048 14.6871 5.40001 16.1416C6.73649 18.8472 8.53982 21.2958 10.7271 23.3749C12.7917 25.4582 15.1667 27.4749 17.2208 29.1707C17.7896 29.6395 18.3688 30.1124 18.9479 30.5853L19.3125 30.8832C19.8688 31.3374 20.4438 31.8082 21 32.2707L21.0271 32.2457L21.0396 32.2353H21.0521L21.0708 32.2207H21.0813H21.0917L21.1292 32.1895L21.2146 32.1207L21.2292 32.1082L21.2521 32.0916H21.2646L21.2833 32.0749L22.6667 30.9395L23.0292 30.6416C23.6146 30.1645 24.1938 29.6916 24.7625 29.2228C26.8167 27.527 29.1938 25.5124 31.2583 23.4187C33.4459 21.3407 35.2493 18.8926 36.5854 16.1874C37.2772 14.7203 37.646 13.1218 37.6668 11.4999C37.6754 9.6204 36.924 7.81718 35.5833 6.4999C34.19 5.14557 32.318 4.39674 30.375 4.41657C28.004 4.39642 25.7374 5.39025 24.1458 7.14782L21 10.7728L17.8542 7.14782C16.2626 5.39025 13.996 4.39642 11.625 4.41657Z"
              fill="white"
            />
          </svg>
        )}
      </span>
      <button
        onClick={() => addToCart(item)}
        className="absolute invisible px-6 py-3 text-sm font-semibold text-black transition-all -translate-x-1/2 bg-white rounded-lg opacity-0 bottom-5 left-1/2 group-hover:opacity-100 group-hover:visible"
      >
        Add to cart
      </button>
    </div>
  );
};

PhotoItem.propTypes = {
  url: PropTypes.string,
};

export default PhotoList;
