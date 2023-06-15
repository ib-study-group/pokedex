import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { PokemonProvider } from "./view/components/PokemonProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PokemonProvider>
      <App />
    </PokemonProvider>
  </React.StrictMode>
);
