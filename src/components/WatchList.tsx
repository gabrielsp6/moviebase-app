import MovieCard from "../components/MovieCard";
import { Container, Stack} from "@chakra-ui/react";
import { useState, useEffect } from "react";

type MovieType = {
  id: string | number;
  title?: string;
  poster_path?: string;
};

const WatchList = () => {
  const [watchlist, setWatchlist] = useState<MovieType[]>();

  const getFavoritesFromLocalStorage = () => {
    const watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
      setWatchlist(JSON.parse(watchlist));
    }
  };

  useEffect(() => {
    getFavoritesFromLocalStorage();
  }, []);

  const onDelete = (movieId: string | number) => {
    const updatedWatchlist = watchlist?.filter(
      (movie) => movie.id !== movieId
    );
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setWatchlist((prevData: any) => ({
      ...prevData,
      watchlist: prevData.watchlist.filter(
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
        {watchlist
          ? watchlist?.map((movie: MovieType, index: string | number) => (
              <MovieCard
                key={index}
                onDelete={() => onDelete(movie.id)}
                id={movie.id}
              />
            ))
          : "Loading watchlist"}
      </Stack>
    </Container>
  );
};

export default WatchList;
