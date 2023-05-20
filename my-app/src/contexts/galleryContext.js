import { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const fakeData = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1684069158042-de27cd720172?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1449247613801-ab06418e2861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvcmtpbmclMjByb29tJTIwZGVjb3JhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdvcmtpbmclMjByb29tJTIwZGVjb3JhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
  },
  {
    id: 4,
    url: "https://media.istockphoto.com/id/1319988760/photo/modern-home-office.jpg?b=1&s=170667a&w=0&k=20&c=b-7U_AfyEsTi7S_sKBXuoS0iXoCnyjq7d9b9qhluWeM=",
    isFavorite: false,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1588534510807-86dfb5ed5d5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdvcmtpbmclMjByb29tJTIwZGVjb3JhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1505330622279-bf7d7fc918f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHdvcmtpbmclMjByb29tJTIwZGVjb3JhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    isFavorite: false,
  },
];

const GalleryContext = createContext();

function GalleryProvider(props) {
  const { storedValue, setValue } = useLocalStorage("photos", fakeData);
  const { storedValue: storedCart, setValue: setStoredCart } = useLocalStorage(
    "cartItems",
    []
  );
  const [photos, setPhotos] = useState(storedValue);
  const [cartItems, setCartItems] = useState(storedCart);
  const [favoriteList, setFavoriteList] = useState([]);

  function toggleFavorite(photoId) {
    const updatedArray = photos.map((photo) => {
      if (photo.id === photoId) photo.isFavorite = !photo.isFavorite;
      return photo;
    });
    setPhotos(updatedArray);
    setValue(updatedArray);
  }

  function addToCart(newItem) {
    setCartItems((prevItems) => {
      const isExisted = prevItems.some((item) => item.id === newItem.id);
      if (isExisted) {
        setStoredCart([...prevItems]);
        return [...prevItems];
      } else {
        setStoredCart([...prevItems, newItem]);
        return [...prevItems, newItem];
      }
    });
  }

  function removeFromCart(photoId) {
    setCartItems((prevItems) => {
      const cartUpdate = prevItems.filter((item) => item.id !== photoId);
      setStoredCart(cartUpdate);
      return cartUpdate;
    });
  }

  const value = {
    photos,
    cartItems,
    favoriteList,
    setPhotos,
    setCartItems,
    setFavoriteList,
    toggleFavorite,
    addToCart,
    removeFromCart,
  };
  return (
    <GalleryContext.Provider value={value} {...props}></GalleryContext.Provider>
  );
}

function useGallery() {
  const context = useContext(GalleryContext);
  if (typeof context === "undefined") {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
}

export { GalleryProvider, useGallery };
