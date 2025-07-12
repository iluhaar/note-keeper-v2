import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppWrapper from "./AppWrapper.tsx";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "./constants";

const convex = new ConvexReactClient(CONVEX_URL);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConvexProvider client={convex}>
      <AppWrapper />
    </ConvexProvider>
  </React.StrictMode>
);
