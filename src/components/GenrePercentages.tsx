import React, { useState, useEffect } from "react";
import {
    Center,
    Container,
    Stack,
    WrapItem,
    Progress,
    Heading,
    List,
    ListItem,
    Text,
    Flex
  } from '@chakra-ui/react';

import config from "../utils/config.json";

import { BsFillSquareFill } from 'react-icons/bs';

import { PieChart } from 'react-minimal-pie-chart';


type MovieType = {
  id: string | number;
  title?: string;
  poster_path?: string;
};

const GenrePercentages = () => {
  const [watchlist, setWatchlist] = useState<MovieType[]>();
  const [genresArray, setGenresArray] = useState<any>(); 
  const [occurencesWithPercentages, setOccurencesWithPercentages] = useState<any>()

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

  const getArrayOfGenres = async (idList: MovieType[]) => {
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
    let maxOccurenceValue = 0;
    let maxOccurenceKey = "";

    let secondMaxOccurenceValue = 0;
    let secondMaxOccurenceKey = "";

    let thirdMaxOccurenceValue = 0;
    let thirdMaxOccurenceKey = "";

    let fourthMaxOccurenceValue = 0;
    let fourthMaxOccurenceKey = "";

    let totalGenres = 0;

    for (const [key, value] of Object.entries(occurrences)) {
      if (value > maxOccurenceValue) {
        maxOccurenceValue = value;
        maxOccurenceKey = key.toString();
      }
      totalGenres = totalGenres + value;
    }

    for (const [key, value] of Object.entries(occurrences)) {
      if (value > secondMaxOccurenceValue && maxOccurenceKey !== key) {
        secondMaxOccurenceValue = value;
        secondMaxOccurenceKey = key.toString();
      }
    }

    for (const [key, value] of Object.entries(occurrences)) {
      if (
        value > thirdMaxOccurenceValue &&
        maxOccurenceKey !== key &&
        secondMaxOccurenceKey !== key
      ) {
        thirdMaxOccurenceValue = value;
        thirdMaxOccurenceKey = key.toString();
      }
    }

    for (const [key, value] of Object.entries(occurrences)) {
      if (
        value > fourthMaxOccurenceValue &&
        maxOccurenceKey !== key &&
        secondMaxOccurenceKey !== key &&
        thirdMaxOccurenceKey !== key
      ) {
        fourthMaxOccurenceValue = value;
        fourthMaxOccurenceKey = key.toString();
      }
    }

    function percentage(partialValue: number, totalValue: number): number {
      return (100 * partialValue) / totalValue;
    }
    const occurencePercentages: any = {
        [maxOccurenceKey]: String(Math.round(percentage(maxOccurenceValue, totalGenres))),
        [secondMaxOccurenceKey]: String(Math.round(percentage(secondMaxOccurenceValue, totalGenres))),
        [thirdMaxOccurenceKey]: String(Math.round(percentage(thirdMaxOccurenceValue, totalGenres))),
        [fourthMaxOccurenceKey]: String(Math.round(percentage(fourthMaxOccurenceValue, totalGenres))),
      };

    setOccurencesWithPercentages(occurencePercentages)
  };

  useEffect(() => {
    getWatchListFromLocalStorage();
  }, []);

  useEffect(() => {
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


<Container width={200}>
    <PieChart radius={50}
  data={[
    { title: 'One', value: parseInt((occurencesWithPercentages[Object.keys(occurencesWithPercentages)[0]])), color: '#9E86D5' },
    { title: 'Two', value: parseInt((occurencesWithPercentages[Object.keys(occurencesWithPercentages)[1]])), color:"#805AD5"},
    { title: 'Three', value: parseInt((occurencesWithPercentages[Object.keys(occurencesWithPercentages)[2]])), color: 'white' },
    { title: 'Three', value: parseInt((occurencesWithPercentages[Object.keys(occurencesWithPercentages)[3]])), color: '#B171C3' }
  ]}
/>
</Container>
<Container>


        <Heading as="h2" size={'md'} color='#9E86D5' >
                    {'This list contains '}
        </Heading>
        <List spacing={0} fontSize="lg" color="teal.500">
            <ListItem  color='#9E86D5' fontWeight={'700'} margin='0' display={'flex'} alignItems='center'>
            <BsFillSquareFill style={{ marginRight: '10px' }}/>
            {occurencesWithPercentages && JSON.stringify(occurencesWithPercentages[Object.keys(occurencesWithPercentages)[0]]).slice(1,3) }
            {' % '}
            {occurencesWithPercentages && JSON.stringify(Object.keys(occurencesWithPercentages)[0]).replace(/['"]+/g, '') }
            {' '}
            </ListItem>

            <ListItem  color='#805AD5' fontWeight={'700' } display={'flex'} alignItems='center'>
            <BsFillSquareFill style={{ marginRight: '10px' }}/>
            {occurencesWithPercentages && JSON.stringify(occurencesWithPercentages[Object.keys(occurencesWithPercentages)[1]]).slice(1,3) }
            {' % '}
            {occurencesWithPercentages && JSON.stringify(Object.keys(occurencesWithPercentages)[1]).replace(/['"]+/g, '') }
            {' '}
            </ListItem>

            <ListItem color='white' fontWeight={'700'} display={'flex'} alignItems='center'>
            <BsFillSquareFill style={{ marginRight: '10px' }}/>
            {occurencesWithPercentages && JSON.stringify(occurencesWithPercentages[Object.keys(occurencesWithPercentages)[2]]).slice(1,3) }
            {' % '}
            {occurencesWithPercentages && JSON.stringify(Object.keys(occurencesWithPercentages)[2]).replace(/['"]+/g, '') }
            {' '}
            </ListItem>
            <ListItem  color='#B171C3' fontWeight={'700'} display={'flex'} alignItems='center'>
            <BsFillSquareFill style={{ marginRight: '10px' }}/>
            {occurencesWithPercentages && JSON.stringify(occurencesWithPercentages[Object.keys(occurencesWithPercentages)[3]]).slice(1,3) }
            {' % '}
            {occurencesWithPercentages && JSON.stringify(Object.keys(occurencesWithPercentages)[3]).replace(/['"]+/g, '') }
            {' '}
            
            </ListItem>

        </List>
    </Container>
    </Flex>
    </Container>;
};

export default GenrePercentages;
