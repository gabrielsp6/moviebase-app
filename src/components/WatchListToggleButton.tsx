import React, { useState } from "react";
import { Tooltip, Button } from "@chakra-ui/react";

const WatchListToggleButton = () => {
  const [data, setData] = useState<any>(null);
  return (
    <Tooltip label={data?.found ? "Remove from Watchlist" : "Add to Watchlist"}>
      <Button>
        {data?.found ? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>
    </Tooltip>
  );
};

export default WatchListToggleButton;
