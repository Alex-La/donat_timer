import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/startup";

import ThemeProvider from "~theme/ThemeProvider";

import ErrorBoundary from "~components/loaders/ErrorBoundary";
import Preloader from "~components/loaders/Preloader";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <ErrorBoundary>
          <Suspense fallback={<Preloader />}>
            <App />
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
