import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import Error from "./services/Error";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <Error>
    <Provider store={store}>
      <App />
    </Provider>
  </Error>
);
