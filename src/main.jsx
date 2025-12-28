import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

// Load test utilities in development mode (available in browser console)
if (import.meta.env.DEV) {
  import("./utils/testImageConverter.js").catch(() => {
    // Silently fail if test utilities don't exist
  });
  import("./services/testFormatService.js").catch(() => {
    // Silently fail if test utilities don't exist
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
