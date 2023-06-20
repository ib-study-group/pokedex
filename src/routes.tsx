import { createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import PokeReels from "./PokeReels.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/poke-reels",
    element: <PokeReels />,
  },
]);
