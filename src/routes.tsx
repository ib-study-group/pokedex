import { createBrowserRouter } from "react-router-dom";

import PokeReels from "./pages/PokeReels/PokeReels.tsx";
import { HomePage } from "./pages/HomePage/HomePage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/poke-reels",
    element: <PokeReels />,
  },
]);
