import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/ContextProvider";
import AnalyticsTracker from "./lib/analyticsTracker";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AnalyticsTracker />
    <App />
  </BrowserRouter>,
);
