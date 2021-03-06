import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [myReviews, setMyReviews] = useState( {} ) 
  const [favorites, setFavorites] = useState( [] )
  const [playlist, setPlaylist] = useState( [] )

  const addToFavorites = (movie) => {
    let newFavorites = [...favorites];
    if (!favorites.includes(movie.id)){
      newFavorites.push(movie.id);
    }
    setFavorites(newFavorites)
  };
  
  const addToPlaylist = (movie) => {
    let newPlaylist = [...playlist];
    if (!playlist.includes(movie.id)){
      newPlaylist.push(movie.id);
    }
    setPlaylist(newPlaylist);
  };
 

  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const removeFromPlaylist = (movie) => {
    setFavorites( playlist.filter(
      (mId) => mId !== movie.id
    ) )
  };

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        playlist,
        addToFavorites,
        addToPlaylist,
        removeFromFavorites,
        removeFromPlaylist,
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;