import { useState, useRef, useEffect } from "react";
import {
  Container,
  Button,
  Text,
  Image,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";
import config from "../utils/config.json";
import MovieCard from "./MovieCard";

interface IMovieData {
  id: number | string;
  title?: string;
  poster_path?: string;
}

interface IMovieCollectionProps {
  list?: IMovieData[];
  title: string;
  posterUrl: string;
  totalRuntime: string;
  comment: string;
}

const buildImageUrl = (path: string, size = "original") =>
  `${config.THE_MOVIE_DB_IMAGE_URL}/${size}${path}`;

const MovieCollection = ({
  list,
  title,
  posterUrl,
  totalRuntime,
  comment,
}: IMovieCollectionProps) => {
  const scrollableContent = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [movies, setMovies] = useState<IMovieData[]>([]);

  useEffect(() => {
    async function fetchMoviesData() {
      const moviePromises = list?.map(async (movie) => {
        const response = await fetch(
          `${config.THE_MOVIE_DB_API}/3/movie/${movie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        );
        if (response.ok) {
          const movieData = await response.json();
          return {
            id: movie.id,
            title: movieData.title,
            poster_path: movieData.poster_path,
          };
        }
        return null;
      });

      const moviesData = await Promise.all(moviePromises || []);
      setMovies(moviesData.filter((movie) => movie !== null) as IMovieData[]);
    }
    fetchMoviesData();
  }, [list]);


  return (
    <Container width={300}>
      <Button
        onClick={() => setIsOpen(true)}
        width={350}
        height={400}
        display="flex"
        flexDirection="column"
      >
        <Text mb="10px" fontSize="m">
          {title}
        </Text>
        <Image
          src={buildImageUrl(posterUrl, "w300")}
          alt="Movie poster"
          width={200}
          height={300}
          rounded="5%"
        />
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent maxW={900} width={650} bg="#9E86D5" rounded="5px">
          <ModalHeader fontSize="2xl">{title}</ModalHeader>
          <Container marginLeft={40}>
            <Text>This collection takes {totalRuntime} to watch</Text>
          </Container>
          <ModalCloseButton />
          <ModalBody>
            <Box
              overflowX="hidden"
              overflowY="hidden"
              height="250px"
              display="flex"
              flexDirection="row"
              alignItems="center"
              ref={scrollableContent}
              boxShadow="2px 4px 8px rgba(5, 5, 5, 0.5)"
              rounded="20px"
            >
              {movies
                ? movies?.map((movie: IMovieData, index: number) => (
                    <MovieCard id={movie.id} key={index} />
                  ))
                : "Loading movie"}
            </Box>
          </ModalBody>
          <Container display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => scrollableContent.current?.scrollBy(-500, 0)}
              margin="20px"
            >
              <ArrowLeftIcon />
            </Button>
            <Button onClick={() => scrollableContent.current?.scrollBy(500, 0)}>
              <ArrowRightIcon />
            </Button>
          </Container>
          <ModalFooter>
            <Button marginLeft="10px">
              Add to Favourites
            </Button>
            <Button marginLeft="10px">
              Delete from Favourites
            </Button>
            <Button onClick={() => setIsOpen(false)} marginLeft="10px">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MovieCollection;
