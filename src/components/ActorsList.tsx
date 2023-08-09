import { Container, Box, Button } from "@chakra-ui/react";
import ActorCard from "./ActorCard";
import React, { useRef } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons";

type ActorType = {
  id: string,
  original_name: string,
  profile_path: string
}

interface IActorsListProps{
  cast: ActorType[]
  }

const ActorsList = ({ cast } : IActorsListProps) => {
  const scrollableContent = useRef<HTMLDivElement>(null);

  return (
    <Container display={"flex"} alignItems="center" flexDirection={"column"}>
      <Box
        overflowX="hidden"
        overflowY="hidden"
        height="250px"
        width={"1000px"}
        display={"flex"}
        flexDirection={"row"}
        alignItems="center"
        alignSelf={"flex-start"}
        ref={scrollableContent}
        boxShadow="2px 4px 8px rgba(5, 5, 5, 0.5)"
        rounded={"20px"}
      >
        {cast
          ? cast?.map((actor : ActorType , index: number) => (
              <ActorCard id={actor.id} key={index} actor={actor} />
            ))
          : "Loading Actor"}
      </Box>

      <Box display={"flex"} alignItems="center">
        <Button
          onClick={() => scrollableContent.current?.scrollBy(-500, 0)}
          margin={"20px"}
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          onClick={() => scrollableContent.current?.scrollBy(500, 0)}
          alignSelf={"center"}
        >
          <ArrowRightIcon />
        </Button>
      </Box>
    </Container>
  );
};

export default ActorsList;
