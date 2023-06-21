import { createBrowserRouter } from "react-router-dom";

import PokeReels from "./pages/PokeReels/PokeReels.tsx";
import { HomePage } from "./pages/HomePage/HomePage.tsx";

export const router = createBrowserRouter([
  {
    path: "/pokedex/",
    element: <HomePage />,
  },
  {
    path: "/pokedex/poke-reels",
    element: <PokeReels />,
  },
]);
