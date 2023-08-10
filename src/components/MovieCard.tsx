import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  CircularProgress,
  Container,
  Image,
  Link,
} from "@chakra-ui/react";
import config from "../utils/config.json";

interface IMovieData {
  id: number;
  title?: string;
  poster_path?: string;
}

const buildImageUrl = (path: string, size = "original") =>
  `${config.THE_MOVIE_DB_IMAGE_URL}/${size}${path}`;

const Movie = ({ id }: { id: number }) => {
  const [data, setData] = useState<IMovieData>();

  useEffect(() => {
    async function fetchMovieDetails() {
      const response = await fetch(
        `${config.THE_MOVIE_DB_API}/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      );
      const movieData = await response.json();
      setData(movieData);
    }
    fetchMovieDetails();
  }, [id]);

  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  const imageUrl: string = data.poster_path
    ? buildImageUrl(data.poster_path, "w300")
    : "";
  return (
    <div key={id}>
      <Box
        minW="150px"
        pos="relative"
        width="150px"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.3)",
          transition: "0.5s ease",
        }}
      >
        <Link href={`/movie/${id}`}>
          <Container>
            <Image src={imageUrl} alt="Movie poster" width="200" height="200" />
          </Container>
        </Link>
      </Box>
    </div>
  );
};

export default Movie;
