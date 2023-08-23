import  { useState, useEffect } from "react";
import {
    Container,
    Heading,
    List,
    ListItem,
    Flex
  } from '@chakra-ui/react';

import config from "../utils/config.json";
import { BsFillSquareFill } from 'react-icons/bs';
import { PieChart } from 'react-minimal-pie-chart';
import WatchListLegend from "./WatchListLegend";
type MovieType = {
  id: string | number;
  title?: string;
  poster_path?: string;
};

type Genre = {
  id: number;
  name: string;
};

type GenresArray = Genre[][] | undefined;
type OccurencesWithPercentages = Record<string, string> | null;

const GenrePercentages = () => {
  const [watchlist, setWatchlist] = useState<MovieType[] | undefined>(undefined);
  const [genresArray, setGenresArray] = useState<GenresArray | undefined>(undefined); 
  const [occurencesWithPercentages, setOccurencesWithPercentages] = useState<OccurencesWithPercentages | null>(null)
  const getWatchListFromLocalStorage = async () => {
    const watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
      setWatchlist(JSON.parse(watchlist));
    }
  };

  const getMovieGenres = async (id: string | number) => {
    const movieUrl = `${config.THE_MOVIE_DB_API}/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
    const response = await fetch(movieUrl);
    const movieData = await response.json();

    return movieData.genres;
  };

  useEffect(() => {
    getWatchListFromLocalStorage();
  }, []);

  useEffect(() => {

    const getArrayOfGenres = async (idList: MovieType[] ) => {
      const promises = idList.map((movie) => getMovieGenres(movie.id));
      const fetchedGenresArray = await Promise.all(promises);
      setGenresArray(fetchedGenresArray);
      const arrayOfGenresNoId = fetchedGenresArray.map((genres) =>
        genres.map((genre: any) => genre.name)
      );
      const flattenedGenres = arrayOfGenresNoId.flat();
  
      const occurrences: Record<string, number> = {};
  
      flattenedGenres.forEach((genre) => {
        if (occurrences[genre]) {
          occurrences[genre]++;
        } else {
          occurrences[genre] = 1;
        }
      });

      const sortedOccurrences = Object.entries(occurrences).sort((a, b) => b[1] - a[1]);
      const maxOccurences = sortedOccurrences.slice(0, 4);
      const totalGenres = Object.values(occurrences).reduce(
        (total, value) => total + value,
        0
      );
      function percentage(partialValue: number, totalValue: number): number {
        return (100 * partialValue) / totalValue;
      }

      const occurencePercentages: OccurencesWithPercentages = {
        [maxOccurences[0][0]]: String(Math.round(percentage(maxOccurences[0][1], totalGenres))),
        [maxOccurences[1][0]]: String(Math.round(percentage(maxOccurences[1][1], totalGenres))),
        [maxOccurences[2][0]]: String(Math.round(percentage(maxOccurences[2][1], totalGenres))),
        [maxOccurences[3][0]]: String(Math.round(percentage(maxOccurences[3][1], totalGenres))),
      };
        setOccurencesWithPercentages(occurencePercentages)
    };
    if (watchlist) {
      getArrayOfGenres(watchlist);
    }
  }, [watchlist]);
  

  if (!genresArray || genresArray.length < 3) {
    return (
      <Heading as="h2" size={"md"} color={"#805AD5"}>
        {"Add more movies, for a proper calculation of genres..."}
      </Heading>
    );
  }

  return <Container>
<Flex alignItems={"center"}>


<Container width={200}  data-testid={'pie-chart'}>
    <PieChart radius={50}
         
          data={[
            { title: 'One', value: parseInt(occurencesWithPercentages?.[Object.keys(occurencesWithPercentages)[0]] || "0"), color: '#9E86D5' },
            { title: 'Two', value: parseInt(occurencesWithPercentages?.[Object.keys(occurencesWithPercentages)[1]] || "0"), color: "#805AD5" },
            { title: 'Three', value: parseInt(occurencesWithPercentages?.[Object.keys(occurencesWithPercentages)[2]] || "0"), color: 'white' },
            { title: 'Three', value: parseInt(occurencesWithPercentages?.[Object.keys(occurencesWithPercentages)[3]] || "0"), color: '#B171C3' }
          ]}
/>
</Container>
<Container>
        <Heading as="h2" size={'md'} color='#9E86D5' >
                    {'This list contains '}
        </Heading>
        <WatchListLegend occurencesWithPercentages={occurencesWithPercentages}/>
    </Container>
    </Flex>
    </Container>;
};

export default GenrePercentages;
