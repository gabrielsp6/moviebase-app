import { Container, Heading, Wrap } from "@chakra-ui/react";
import FavouritesList from "../components/FavouritesList";

const Favourites = () => {
  return (
    <Container>
      <Container>
        <Heading as="h2" marginBottom="50px">
          Favourites
        </Heading>
      </Container>
      <Container>
        <Wrap>
          <FavouritesList />
        </Wrap>
      </Container>
    </Container>
  );
};

export default Favourites;
