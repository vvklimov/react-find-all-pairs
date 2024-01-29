import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
