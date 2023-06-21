import { createHashRouter } from "react-router-dom";

import PokeReels from "./pages/PokeReels/PokeReels.tsx";
import { HomePage } from "./pages/HomePage/HomePage.tsx";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/poke-reels",
    element: <PokeReels />,
  },
]);
