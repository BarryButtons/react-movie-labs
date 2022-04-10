import React from "react";
import { getSimilarMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PageTemplate from '../components/templateMovieListPage';
import PlaylistAddIcon from '../components/cardIcons/addToPlaylist';

const SimilarMoviesPage = (props) => {

  const {  data, error, isLoading, isError }  = useQuery('similar', getSimilarMovies)

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  return (
    <PageTemplate
      title='Similar Movies'
      movies={movies}
      action={(movie) => {
        return <PlaylistAddIcon movie={movie} />
      }}
    />
  );
};

export default SimilarMoviesPage;