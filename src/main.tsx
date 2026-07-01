import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import { AuthProvider } from "./contexts/AuthContext"

import "./styles/fonts.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import "./styles/theme.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

