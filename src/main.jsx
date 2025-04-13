import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// inject the App into the DOM by searching for the root element and injecting inside it the App Component
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
