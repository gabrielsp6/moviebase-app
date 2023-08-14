import MovieCard from "../components/MovieCard";
import { Container, Stack} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface IMovieData {
  id: number | string;
  title?: string;
  poster_path?: string;
}
const FavouritesList = () => {
  const [favourites, setFavourites] = useState<any>();

  const getFavoritesFromLocalStorage = () => {
    const favourites = localStorage.getItem("favourites");
    if (favourites) {
      setFavourites(JSON.parse(favourites));
      console.log(favourites);
    }
  };

  useEffect(() => {
    getFavoritesFromLocalStorage();
  }, []);

  const onDelete = (movieId: string | number) => {
    const updatedFavorites = favourites?.filter(
      (id: string | number) => id !== movieId
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavourites((prevData: any) => ({
      ...prevData,
      favourites: prevData.favourites.filter(
        (movie: IMovieData) => movie.id !== movieId
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
          ? favourites?.map((movie: IMovieData, index: string | number) => (
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
