import React, { useEffect, useState } from "react";
import {
  Input,
  IconButton,
  VStack,
  Button,
  Badge,
  Text,
  InputGroup,
  InputRightElement,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";


interface ISearchResultsItem {
  id: number;
  title: string;
  release_date: string;
}

interface ISearchResultsProps {
  terms: string;
}

function SearchBar({ onSubmit }: { onSubmit: (terms: string) => void }) {
  const [text, setText] = useState("");
  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(text);
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch}>
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}

function SearchResults({ terms } : ISearchResultsProps) {
  const [data, setData] = useState<{ results: ISearchResultsItem[] } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  

  useEffect(() => {
    if (!terms) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${terms}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [terms]);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }

  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error.message)}
      </Text>
    );
  }

  if (!data) {
    return <Text>Loading...</Text>;
  }

  if (!data.results.length) {
    return <Text>No results</Text>;
  }

  return (
    <UnorderedList stylePosition="inside">
      {data.results.map(({ id, title, release_date } : ISearchResultsItem) => (
        <ListItem key={id}>
          <Link to={`/movie/${id}`}>
            <Button
              as="a"
              variant="link"
              rightIcon={<Badge>{release_date}</Badge>}
            >
              <Text as="span"> {title} </Text>
            </Button>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };
  

  return (
    <div>
      <VStack spacing={4} align="stretch">
        <SearchBar onSubmit={handleSearch} />
        <SearchResults terms={searchTerm} />
      </VStack>
    </div>
  );
}
