import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "App";
import { store } from "./app/store";
import { Provider } from "react-redux";

const API_URL = "http://0.0.0.0:8080/";

console.log(getData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

async function getData(): Promise<unknown> {
  try {
    const response = await fetch(API_URL);
    const json = response.json();
    return json;
  } catch (e) {
    return e;
  }
}
