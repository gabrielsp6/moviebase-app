import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import config from "../utils/config.json";
const buildImageUrl = (path: any, size = "original") =>
  `${config.THE_MOVIE_DB_IMAGE_URL}/${size}${path}`;

const ActorCard = ({ id, actor } : { id: any, actor: any}) => {
  return (
    <Box key={id} margin={"20px"}>
      <Box minW="100px" pos="relative" width="100px" marginLeft={"10px"}>
        <Image
          src={buildImageUrl(actor.profile_path, "w300")}
          alt="Actor Image"
          width="150"
          height="150"
  
        />
      </Box>
      <Text>{actor.original_name}</Text>
    </Box>
  );
};

export default ActorCard;
