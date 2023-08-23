import { Tooltip, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface IWatchListToggleButtonProps {
  movieId?: number | string;
}

const WatchListToggleButton = ({ movieId }: IWatchListToggleButtonProps) => {
  const [isInWatchList, setIsInWatchList] = useState<boolean>(false);

  useEffect(() => {
    const watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
      const watchlistArray = JSON.parse(watchlist);
      setIsInWatchList(
        watchlistArray.some(
          (item: { id: number | string }) => item.id === movieId
        )
      );
    }
  }, [movieId]);

  const toggleWatchList = () => {
    if (movieId) {
      const watchlist = localStorage.getItem("watchlist") || "[]";
      const watchlistArray = JSON.parse(watchlist);

      const isAlreadyInWatchList = watchlistArray.some(
        (item: { id: number | string }) => item.id === movieId
      );

      const updatedWatchlist = isAlreadyInWatchList
        ? watchlistArray.filter(
            (item: { id: number | string }) => item.id !== movieId
          )
        : [...watchlistArray, { id: movieId }];

      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      setIsInWatchList(!isAlreadyInWatchList);
    }
  };

  return (
    <Tooltip
      label={isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
    >
      <Button onClick={toggleWatchList} data-testid="toggle-watchlist-button">
        {isInWatchList ? "Remove from Watchlist" : "Add to Watchlist"}
      </Button>
    </Tooltip>
  );
};

export default WatchListToggleButton;
