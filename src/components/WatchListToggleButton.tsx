import { Tooltip, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface IWatchListToggleButtonProps {
  movieId?: number | string;
}

const WatchListToggleButton = ( {movieId} : IWatchListToggleButtonProps) => {
const [isInWatchList, setIsInWatchList] = useState<boolean>(false)

useEffect(() => {
  const watchlist = localStorage.getItem("watchlist")
  if(watchlist) {
    const watchlistArray = JSON.parse(watchlist)
    setIsInWatchList(watchlistArray.some((item: { id: number | string }) => item.id === movieId))
  }
}, [movieId])

const toggleWatchList = () => {

  if(movieId) {
    const watchlist = localStorage.getItem("watchlist") || "[]";
    const watchlistArray = JSON.parse(watchlist)

    const isAlreadyInWatchList = watchlistArray.some((item: { id: number | string }) => item.id === movieId)
    let updatedWatchlist
    if (isAlreadyInWatchList) {
      updatedWatchlist = watchlistArray.filter((item: { id: number | string }) => item.id !== movieId);
    } else {
      const newItem = { id: movieId };
      updatedWatchlist = [...watchlistArray, newItem];
    }

    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    setIsInWatchList(!isAlreadyInWatchList);
    console.log(watchlistArray)
  }
}

  return (
    <Tooltip label={isInWatchList? "Remove from Watchlist" : "Add to Watchlist"}>
      <Button onClick = { toggleWatchList}>
        {isInWatchList? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>
    </Tooltip>
  );
};

export default WatchListToggleButton;
