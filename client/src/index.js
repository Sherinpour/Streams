import React from "react";
import { createRoot } from "react-dom/client";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";
import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
