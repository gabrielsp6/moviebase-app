import { Tooltip, Button } from "@chakra-ui/react";
import React, { useState } from "react";

const FavouriteToggleButton = () => {
  const [data, setData] = useState<any>(null);

  return (
    <Tooltip
      label={data?.found ? "Remove from Favourites" : "Add to Favourites"}
    >
      <Button>
        {data?.found ? "Remove from Favourites" : "Add to Favourites"}
      </Button>
    </Tooltip>
  );
};

export default FavouriteToggleButton;
