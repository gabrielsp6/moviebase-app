import { Container } from "@chakra-ui/react";
import MovieCollection from "../components/MovieCollection";
import moviesCollection from "../utils/moviesCollection.json";

export default function Collections() {
  return (
    <Container>
      <Container
        display={"flex"}
        flexDirection={"row"}
        alignItems="center"
        marginBottom={"50px"}
      >
        {moviesCollection?.slice(6, 9).map((listItem, index) => (
          <MovieCollection
            list={listItem.movies}
            title={listItem.title}
            posterUrl={listItem.posterUrl}
            totalRuntime={listItem.totalRuntime}
            comment = {listItem.comment}
            key={index}
          />
        ))}
      </Container>
      <Container
        display={"flex"}
        flexDirection={"row"}
        alignItems="center"
        marginBottom={"50px"}
      >
        {moviesCollection?.slice(0, 3).map((listItem, index) => (
          <MovieCollection
            list={listItem.movies}
            title={listItem.title}
            posterUrl={listItem.posterUrl}
            totalRuntime={listItem.totalRuntime}
            key={index}
            comment = {listItem.comment}
          />
        ))}
      </Container>

      <Container
        display={"flex"}
        flexDirection={"row"}
        alignItems="center"
        marginBottom={"50px"}
      >
        {moviesCollection?.slice(3, 6).map((listItem, index) => (
          <MovieCollection
            list={listItem.movies}
            title={listItem.title}
            posterUrl={listItem.posterUrl}
            totalRuntime={listItem.totalRuntime}
            key={index}
            comment = {listItem.comment}
          />
        ))}
      </Container>
    </Container>
  );
}
