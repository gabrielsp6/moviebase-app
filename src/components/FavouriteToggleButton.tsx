import { Tooltip, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const FavouriteToggleButton = () => {
  const [data, setData] = useState<string>();

  return (
    <Tooltip
      label={data? "Remove from Favourites" : "Add to Favourites"}
    >
      <Button>
        {data? "Remove from Favourites" : "Add to Favourites"}
      </Button>
    </Tooltip>
  );
};

export default FavouriteToggleButton;
