import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  GlobalStyle,
  Root,
  RouterRepositoryContext,
  store,
  initRouters,
} from "UserInterface";
import "./normalize.css";
import { RemoteRouterRepository } from "Infrastructure";

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
