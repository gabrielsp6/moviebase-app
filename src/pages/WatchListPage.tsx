import { Container, Heading, Wrap } from "@chakra-ui/react";
import WatchList from "../components/WatchList";

const WatchListPage = () => {
  return (
    <Container>
      <Container>
        <Heading as="h2" marginBottom="50px">
          Watchlist
        </Heading>
      </Container>
      <Container>
        <Wrap>
          <WatchList />
        </Wrap>
      </Container>
    </Container>
  );
};

export default WatchListPage;
