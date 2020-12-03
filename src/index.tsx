import React from "react";
import ReactDOM from "react-dom";
import {
  GlobalStyle,
  Root,
  RouterRepositoryContext,
  store,
} from "UserInterface";
import "./normalize.css";
import { RemoteRouterRepository } from "Infrastructure";
import { Provider } from "react-redux";
import { initRouters } from "UserInterface/slices";

const API_URL = "http://0.0.0.0:8080";

const routerRepository = new RemoteRouterRepository(API_URL);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterRepositoryContext.Provider value={routerRepository}>
        <GlobalStyle />
        <Root />
      </RouterRepositoryContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

store.dispatch(initRouters(routerRepository));
