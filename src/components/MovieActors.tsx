import {
  Center,
  CircularProgress,
  Container,
  Heading,
} from "@chakra-ui/react";
import ActorsList from "./ActorsList";
import React, { useEffect, useState } from "react";
import config from "../utils/config.json";

interface IMovieActorsProps {
  id?: string
}

type ActorType = {
  id: string;
  original_name: string;
  profile_path: string;
};

interface IActorsListProps {
  cast: ActorType[],
  status_message: string
}

const MovieActors = ({ id }: IMovieActorsProps) => {
  const [data, setData] = useState<IActorsListProps>();

  useEffect(() => {
    async function fetchMovieActors() {
      try {
        const response = await fetch(
          `${config.THE_MOVIE_DB_API}/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie cast");
        }
        const movieData = await response.json();
        setData(movieData);
      } catch (error) {
        console.error("Error fetching movie cast:", error);
      }
    }
    fetchMovieActors();
  }, [id]);

  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <Container>
      <Heading as={"h5"} fontSize="24px" mb={"40px"}>
        Top cast for this movie:
      </Heading>
      <ActorsList cast={data.cast} />
    </Container>
  );
};

export default MovieActors;
