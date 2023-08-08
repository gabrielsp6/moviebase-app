import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  CircularProgress,
  Container,
  Text,
  Image,
  Link,
} from "@chakra-ui/react";
import config from "../utils/config.json";
const buildImageUrl = (path: any, size = "original") =>
  `${config.THE_MOVIE_DB_IMAGE_URL}/${size}${path}`;

const Movie = ({ id }: { id: any }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `${config.THE_MOVIE_DB_API}/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const movieData = await response.json();
        setData(movieData);
      } catch (error) {
        setError(error);
      }
    }
    fetchMovieDetails();
  }, [id]);
  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }

  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (data.success === false) {
    return (
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
        <Container>
          <Box backgroundColor={"gray"} width="200" height="180">
            <Text color="red">
              Error loading movie with ID {id}: {JSON.stringify(error)}
              '(database) error'
            </Text>
          </Box>
        </Container>
      </Box>
    );
  }

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
            <Image
              src={buildImageUrl(data.poster_path, "w300")}
              alt="Movie poster"
              width="200"
              height="200"
            />
          </Container>
        </Link>
      </Box>
    </div>
  );
};

export default Movie;
