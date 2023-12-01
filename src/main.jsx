import React from "react";
import ReactDOM from "react-dom/client";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={`${import.meta.env.VITE_DOMAIN}`}
      clientId={`${import.meta.env.VITE_CLIENT_ID}`}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>
);
