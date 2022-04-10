import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
//import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/movie.jpg';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const formControl = 
  {
    
    margin:.1,
    minWidth: 1,
    background: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  return (
    <Card 
      sx={{
        maxWidth: 350,
        backgroundColor: "rgb(0, 0, 255)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography align="center" variant="h5" component="h1" color="white">
         
          Filter the movies.
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label" sx={{padding:1.5}}>Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        
      </CardContent>
      <CardMedia
        sx={{ height: 350 }}
        image={img}
        title="Filter"
      />
      <CardContent>
       {/* <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
          <br />
          </Typography>*/}
      </CardContent>
    </Card>
  );
}