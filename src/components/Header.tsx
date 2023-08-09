import {
  Box,
  Heading,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

interface IMenuItemProps {
  href: string;
  children: React.ReactNode;
}

const MenuItem = ({ href, children, ...props }: IMenuItemProps) => (
  <Link to={href}>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="purple.500">
      <Container>
        <Stack
          as="nav"
          direction={["column", null, "row"]}
          justify="space-between"
          wrap="wrap"
          py="1.5rem"
        >
          <HStack justify="space-between">
            <Heading size="lg">Moviebase</Heading>

            <Box display={["block", null, "none"]} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={["column", null, "row"]}
            justify="start"
            align={["start", null, "center"]}
            display={[isOpen ? "flex" : "none", null, "flex"]}
            spacing={4}
          >
            <MenuItem href="/search">Search</MenuItem>
            <MenuItem href="/watchlist">Watchlist</MenuItem>
            <MenuItem href="/historypage">History</MenuItem>
            <MenuItem href="/favourites">Favourites</MenuItem>
            <MenuItem href="/collections">Collections</MenuItem>
          </Stack>

          <Spacer />

          <Box display={[isOpen ? "block" : "none", null, "block"]}>
            <MenuItem href="/movierecommendations">
              Movie Recommendations
            </MenuItem>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
