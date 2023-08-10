import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import FavouriteToggleButton from "../components/FavouriteToggleButton";
import WatchListToggleButton from "../components/WatchListToggleButton";
import config from "../utils/config.json";
import MovieActors from "../components/MovieActors";

interface MovieGenre {
  id: number;
  name: string;
}

interface MovieDetailsData {
  title: string;
  poster_path: string;
  release_date: string;
  tagline: string;
  genres: MovieGenre[];
  overview: string;
  runtime: number;
}

const buildImageUrl = (path: string, size = "original") =>
  `${config.THE_MOVIE_DB_IMAGE_URL}/${size}${path}`;

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<MovieDetailsData | null>(null);

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
        console.error("Error fetching movie details:", error);
      }
    }
    fetchMovieDetails();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Stack direction={["column", "row"]} spacing={4}>
        <Box minW="300px" pos="relative">
          <HStack pos="absolute" zIndex={1} top={2} right={2}>
          </HStack>
          <Image
            src={buildImageUrl(data.poster_path, "w300")}
            alt="Movie poster"
       
            width="300"
            height="450"
            objectFit="contain"
            
          />
        </Box>

        <Stack>
          <HStack justify="space-between">
            <Heading as="h2">{data.title}</Heading>
            <Box>
              <Tag colorScheme="purple" variant="solid">
                {data.release_date}
              </Tag>
            </Box>
          </HStack>
          <Box>{data.tagline}</Box>

          <Stack direction="row">
            {data.genres?.map((genre) => (
              <Badge key={genre.id} colorScheme="purple" variant="outline">
                {genre.name}
              </Badge>
            ))}
          </Stack>

          <Box>
            <Badge colorScheme="purple" variant="outline"></Badge>
          </Box>

          <FavouriteToggleButton />
          <WatchListToggleButton />

          <Box>{data.overview}</Box>
          <Box>
            <Heading as={"h5"} fontSize="20px">
              {Math.floor(data.runtime / 60)} hr {data.runtime % 60} minutes
            </Heading>
          </Box>
        </Stack>
      </Stack>

      <Container mt={"20px"}>
        <MovieActors id={id} />
      </Container>
      <Stack mt={"30px"}>
        <Heading as={"h3"} fontSize="24px">
          More movies like {data.title}:
        </Heading>
      </Stack>
    </Container>
  );
}

export default MovieDetails;
