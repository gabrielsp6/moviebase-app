import MovieCard from "../components/MovieCard";
import { Container, Stack} from "@chakra-ui/react";
import { useState, useEffect } from "react";

type MovieType = {
  id: string | number;
  title?: string;
  poster_path?: string;
};

const FavouritesList = () => {
  const [favourites, setFavourites] = useState<MovieType[]>();

  const getFavoritesFromLocalStorage = () => {
    const favourites = localStorage.getItem("favourites");
    if (favourites) {
      setFavourites(JSON.parse(favourites));
    }
  };

  useEffect(() => {
    getFavoritesFromLocalStorage();
  }, []);

  const onDelete = (movieId: string | number) => {
    const updatedFavorites = favourites?.filter(
      (movie) => movie.id !== movieId
    );
    localStorage.setItem("favourites", JSON.stringify(updatedFavorites));
    setFavourites((prevData: any) => ({
      ...prevData,
      favourites: prevData.favourites.filter(
        (movie: MovieType) => movie.id !== movieId
      ),
    }));
  };

  return (
    <Container>
      <Stack
        margin="30px"
        flexWrap="wrap"
        marginBottom="100px"
        direction={"row"}
      >
        {favourites
          ? favourites?.map((movie: MovieType, index: string | number) => (
              <MovieCard
                key={index}
                onDelete={() => onDelete(movie.id)}
                id={movie.id}
              />
            ))
          : "Loading favourites"}
      </Stack>
    </Container>
  );
};

export default FavouritesList;
