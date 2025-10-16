// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import MemeVault from "./MemeVault";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MemeVault />
  </React.StrictMode>
);