// this is the entry point of the React application. It imports the necessary dependencies, including React, ReactDOM, and the main App component. It then renders the App component inside a StrictMode wrapper to enable additional checks and warnings for potential issues in the application. The App component is rendered into the root element of the HTML document.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);