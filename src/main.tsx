// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client"; // or "react-dom"
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
