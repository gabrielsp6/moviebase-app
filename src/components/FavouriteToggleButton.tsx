import { Tooltip, Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface IFavouriteToggleButtonProps {
  movieId?: number | string;
}

const FavouriteToggleButton = ({ movieId }: IFavouriteToggleButtonProps) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  useEffect(() => {
    const favourites = localStorage.getItem("favourites");
    if (favourites) {
      const favoritesArray = JSON.parse(favourites);
      setIsFavourite(favoritesArray.some((item: { id: number | string }) => item.id === movieId));
    }
  }, [movieId]);

  const toggleFavourites = () => {
    if (movieId) {
      const favourites = localStorage.getItem("favourites") || "[]";
      const favoritesArray = JSON.parse(favourites);

      const isAlreadyFavourite = favoritesArray.some((item: { id: number | string }) => item.id === movieId);

      let updatedFavourites;
      if (isAlreadyFavourite) {
        updatedFavourites = favoritesArray.filter((item: { id: number | string }) => item.id !== movieId);
      } else {
        const newItem = { id: movieId };
        updatedFavourites = [...favoritesArray, newItem];
      }

      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      setIsFavourite(!isAlreadyFavourite);
    }
  };

  return (
    <Tooltip label={isFavourite ? "Remove from Favourites" : "Add to Favourites"}>
      <Button onClick={toggleFavourites}>
        {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
      </Button>
    </Tooltip>
  );
};

export default FavouriteToggleButton;
