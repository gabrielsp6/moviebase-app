import React, { useState } from "react";
import { Tooltip, Button } from "@chakra-ui/react";

const WatchListToggleButton = () => {
  const [data, setData] = useState<string>(null);
  return (
    <Tooltip label={data? "Remove from Watchlist" : "Add to Watchlist"}>
      <Button>
        {data? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>
    </Tooltip>
  );
};

export default WatchListToggleButton;
