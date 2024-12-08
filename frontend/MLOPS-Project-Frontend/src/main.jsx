// External dependencies
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import toast, { Toaster } from "react-hot-toast";

// Internal dependencies
import "./index.css";
import App from "./App.jsx";

/**
 * Main entry point for the React application.
 * Renders the root component with StrictMode and Toast notifications enabled.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000
      }}
    />
    <App />
  </StrictMode>
);