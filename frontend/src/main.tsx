import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import endPoint from "../endPoint.tsx";

const client = new ApolloClient({
  uri: endPoint,
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
        <ToastContainer />
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
);
