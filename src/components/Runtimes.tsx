
import { useState, useEffect } from "react";
import {
  Heading
} from '@chakra-ui/react';
import config from "../utils/config.json";

type MovieType = {
  id: string | number;
  title?: string;
  poster_path?: string;
};

const Runtimes = () => {
  
  const [favourites, setFavourites] = useState<MovieType[]>([]);
  const [totalRuntime, setTotalRuntime] = useState<number>(0);
  const getMovieRuntime = async (id: string | number) => {
    const movieUrl = `${config.THE_MOVIE_DB_API}/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    const response = await fetch(movieUrl);
    const movieData = await response.json();
    return movieData.runtime;
  };


  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;

    return `${days} days, ${remainingHours} hours, ${remainingMinutes} minutes`;
  };


  const getFavoritesFromLocalStorage = () => {
    const favourites = localStorage.getItem("favourites");
    if (favourites) {
      setFavourites(JSON.parse(favourites));
      console.log(favourites)
    }
  };

  useEffect(() => {
    const fetchRuntimes = async () => {
      if (favourites.length > 0) {
        const promises = favourites.map((movie) => getMovieRuntime(movie.id));
        const runtimeResults = await Promise.all(promises);
        const sumOfRuntimes = runtimeResults.reduce((sum, runtime) => sum + runtime, 0);
        setTotalRuntime(sumOfRuntimes);
      }
    };

    fetchRuntimes();
  }, [favourites]);

  useEffect(() => {
    getFavoritesFromLocalStorage();
  }, []);

  if(!totalRuntime) {
    return (
    <Heading as="h2" size={'md'} color={"#805AD5"}>
        {'Add movies to this list, to calculate how long it would take you to watch...'}
    </Heading>
    )
}

  return  (
<Heading as="h2" size={'md'}>
Total Runtime of all movies from Favourites List: {formatRuntime(totalRuntime)}
</Heading>
  )
};

export default Runtimes;
