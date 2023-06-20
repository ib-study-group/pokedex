import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes.tsx";
import { PokemonProvider } from "./view/components/PokemonProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PokemonProvider>
      <RouterProvider router={router} />
    </PokemonProvider>
  </React.StrictMode>
);
