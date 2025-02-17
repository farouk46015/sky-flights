import "./assets/style/style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AllIcons from "./assets/icons/AllIcons";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AllIcons />
    <App />
  </StrictMode>
);
