import React from "react";
import { Routes, Route, Navigate  } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import Search from "./pages/Search";
import WatchListPage from "./pages/WatchListPage";
import History from "./pages/History";
import Favourites from "./pages/Favourites";
import MovieRecommendations from "./pages/MovieRecommendations";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/collections" />}  />

      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/watchlist" element={<WatchListPage />} />
      <Route path="/historypage" element={<History />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/movierecommendations" element={<MovieRecommendations />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
